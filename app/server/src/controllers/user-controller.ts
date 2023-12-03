
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user-model";
import { OpenAI } from 'openai';
import userApiLimitModel from "../models/userApiLimit.model";
import Replicate from "replicate";


const bcrypt = require('bcrypt');
import Stripe from "stripe"
import userSubscriptionModel from "../models/userSubscription.model";
import { increaseLimit } from "../lib/util";


export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body
        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            if (userExist.googleId) {
                res.send({ loginWithGoogle: true })
            } else {
                res.send({ alreadySignUp: true })
            }
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new userModel({
                name: name,
                email: email,
                password: encryptedPassword
            })

            await newUser.save()

            res.send({ status: true })
        }
    } catch (error) {
        next(error)
    }


}

export const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            if (!user.password) {
                res.send({ incorrectPassword: true })
            } else {
                const hashPassword = await bcrypt.compare(password, user.password)
                if (hashPassword) {
                    const payload = { sub: user._id, email: email }
                    const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                        expiresIn: "2d",
                    })
                    res.send({ token: token, id: user._id })
                } else {
                    res.send({ incorrectPassword: true })
                }
            }
        }
        else {
            res.send({ userExistError: true })
        }
    } catch (error) {
        next(error)
    }
}

export const signUpWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, id, picture } = req.body
        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            return res.send({ alreadyRegistered: true })
        } else {
            const googleIdCheck = await userModel.findOne({ googleId: id })
            if (googleIdCheck) {
                const payload = { sub: googleIdCheck._id, email: email }
                const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                    expiresIn: "2d",
                })
                res.send({ token: token, id: googleIdCheck._id })
            } else {
                const newUser = new userModel({
                    name: name,
                    email: email,
                    googleId: id,
                    imageUrl: picture
                })
                const saveCheck = await newUser.save()
                if (saveCheck) {
                    const payload = { sub: saveCheck._id, email: email }
                    const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                        expiresIn: "2d",
                    })
                    res.send({ token: token, id: saveCheck._id })
                }

            }
        }
    } catch (error) {
        next(error)
    }
}


export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, id, picture, name } = req.body;
        let userData = null;
        userData = await userModel.findOne({ email: email });
        if (userData) {
            const googleIdCheck = await userModel.findOne({ googleId: id })
            if (googleIdCheck) {
                const payload = { sub: googleIdCheck._id, email: email }
                const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                    expiresIn: "2d",
                })
                res.send({ token: token, id: googleIdCheck._id })
            }else {
                return res.send({ alreadyRegistered: true })
            }
        } else {
            const newUser = new userModel({
                name,
                email,
                googleId: id,
                imageUrl: picture
            });
            const savedNewUser = await newUser.save();
            if (savedNewUser) {
                const payload = { sub: savedNewUser._id, email: email }
                const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                    expiresIn: "2d",
                })
                res.send({ token: token, id: savedNewUser._id })
            }
        }


    } catch (error) {
        next(error)
    }
}

export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        if (userId) {
            const userDetails = await userModel.findById(userId);
            return res.status(200).json(userDetails);
        }
        return res.status(400).json({ message: "userId not provided or not found" });
    } catch (error) {
        next(error)
    }
}


export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = req.body;
        const userId = req.params.userId

        const configuration = {
            apiKey: process.env.OPENAI_API_KEY,
        }

        if (!configuration.apiKey) {
            return res.status(500).json({ message: "OpenAI API Key not configured." });
        }

        const openai = new OpenAI(configuration);

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });

        if (completion.choices[0].message) {
            await increaseLimit(userId)
            return res.status(200).json(completion.choices[0].message)
        } else {
            return res.status(500).json({ message: "Open API credit limit reached" });
        }

    } catch (error) {
        next(error)
    }
}

export const getLimit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userLimit = await userApiLimitModel.findOne({ userId })
        if (userLimit) {
            return res.status(200).json(userLimit.count)
        } else {
            const createdLimit = await userApiLimitModel.create({
                userId,
                updatedAt: Date.now()
            });

            return res.status(200).json(createdLimit.count)
        }
    } catch (error) {
        next(error)
    }
}

export const getpaymentUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
            apiVersion: "2023-10-16",
            typescript: true,
        });
        const userId = req.params.userId;
        const settingsUrl = `${process.env.ORIGIN1}/app/settings`

        const userSubscription = await userSubscriptionModel.findOne({ userId: userId }).exec();

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })
            return res.status(200).json(stripeSession.url)
        }

        const user = await userModel.findById(userId);
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user?.email,
            line_items: [
                {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: "Envasion Pro",
                            description: "Unlimited AI Generations"
                        },
                        unit_amount: 39900,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId
            }
        })
        return res.status(200).json(stripeSession.url)
    } catch (error) {
        console.log(error)
    }
}
export const checkSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const userSubscription = await userSubscriptionModel.findOne({ userId: userId });

        if (!userSubscription) {
            return res.status(200).json(false)
        } else {
            const isValid =
                userSubscription.stripePriceId &&
                userSubscription.stripeCurrentPeriodEnd?.getTime()! + 86_400_000 > Date.now() &&
                !userSubscription.cancelled

            return res.status(200).json(!!isValid)
        }

    } catch (error) {
        console.log(error)
    }
}
export const stripWebhook = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const signature = req.headers['stripe-signature'] as string;

    let event: Stripe.Event
    const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
        apiVersion: "2023-10-16",
        typescript: true,
    });

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        const session = event.data.object as Stripe.Checkout.Session

        switch (event.type) {
            case "checkout.session.completed":
                let subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                )

                if (!session?.metadata?.userId) {
                    return res.status(400).json("User id is required")
                }

                await new userSubscriptionModel({
                    userId: session?.metadata?.userId,
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: subscription.customer as string,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        subscription.current_period_end * 1000
                    ),
                }).save()
                break;

            case "invoice.payment_succeeded":
                subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                )

                await userSubscriptionModel.updateOne({
                    stripeSubscriptionId: subscription.id,
                },
                    {
                        $set: {
                            stripePriceId: subscription.items.data[0].price.id,
                            stripeCurrentPeriodEnd: new Date(
                                subscription.current_period_end * 1000
                            ),
                        },
                    }
                )
                break;
            case "customer.subscription.updated":
                const updatedSession = event.data.object

                await userSubscriptionModel.updateOne(
                    { stripeCustomerId: updatedSession.customer },
                    {
                        stripePriceId: updatedSession?.items?.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(updatedSession.current_period_end * 1000),
                        cancelled: updatedSession.cancel_at_period_end
                    }
                );
                break;
            default:
                break;
        }

        return;

    } catch (error: any) {
        return res.status(400).json(`Webhook Error: ${error.message}`)
    }


}

export const videoGenarator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prompt = req.body.content
        const userId = req.params.userId

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });
        const output = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    fps: 30,
                    model: "xl",
                    width: 1024,
                    height: 576,
                    prompt: prompt,
                    batch_size: 1,
                    num_frames: 24,
                    init_weight: 0.5,
                    guidance_scale: 17.5,
                    remove_watermark: false,
                    num_inference_steps: 50
                }
            }
        );

        console.log(output);



    } catch (error) {
        next(error)
    }
}




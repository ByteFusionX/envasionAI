import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { AuthService } from 'src/app/service/auth.service';
import { userDetails } from 'src/app/shared/models/userDetails.interface';
=======
>>>>>>> 3bf647e0463531aa7e99ad3d89468a5aeb06e855

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent {
  imageUrl:string = ''
  userFirstChar!:string;
  randomColor!:string;
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.getUserDetails().subscribe((res:userDetails)=>{
      if(res.imageUrl){
        this.imageUrl = res.imageUrl;
      }else{
        this.getRandomColor()
        this.userFirstChar = res.name[0].toUpperCase()
      }
    })
  }

  getRandomColor() {
    const colors = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#a1887f', '#90a4ae'];
    this.randomColor = colors[Math.floor(Math.random() * colors.length)];
  }
}

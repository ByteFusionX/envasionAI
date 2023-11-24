import { animate, state, style, transition, trigger } from "@angular/animations";

export const navbarTrigger = trigger('dropDownAnimation', [
    state('open', style({ height: '150px' })),
    state('close', style({ height: '0px', display: 'none' })),
    transition('close <=> open', animate('200ms linear'))
  ])
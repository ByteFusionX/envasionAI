import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotAvatarComponent } from './bot-avatar.component';

describe('BotAvatarComponent', () => {
  let component: BotAvatarComponent;
  let fixture: ComponentFixture<BotAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BotAvatarComponent]
    });
    fixture = TestBed.createComponent(BotAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

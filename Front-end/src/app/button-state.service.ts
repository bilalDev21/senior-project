import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonStateService {
  private disabledButtons: { [key: number]: { [key: number]: boolean } } = {};

  setButtonDisabled(userId: number, eventId: number, disabled: boolean): void {
    if (!this.disabledButtons[userId]) {
      this.disabledButtons[userId] = {};
    }
    this.disabledButtons[userId][eventId] = disabled;
  }
  
  isButtonDisabled(userId: number, eventId: number): boolean {
    return this.disabledButtons[userId]?.[eventId] || false;
  }
}
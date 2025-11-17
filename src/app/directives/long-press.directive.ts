import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {


  @Output() longPress = new EventEmitter();
  private timeout: any;
  private isPressed = false;
  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])

  onMouseDown(event: TouchEvent | MouseEvent) {
    if (window.innerWidth <= 767.98) {
      this.isPressed = true;
      this.timeout = setTimeout(() => {
        if (this.isPressed) {
          this.longPress.emit(event);
        }
      }, 500); // 500ms for long press
    }
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp() {
    this.isPressed = false;
    clearTimeout(this.timeout);
  }

}

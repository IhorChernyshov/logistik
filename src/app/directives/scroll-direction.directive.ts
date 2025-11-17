import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollDirection]',
  standalone: true
})
export class ScrollDirectionDirective {

  private lastScrollTop = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      // Прокручиваем вниз, скрыть шапку
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-110%)');
    } else {
      // Прокручиваем вверх, показать шапку
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative scroll values
  }
}

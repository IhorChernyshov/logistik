import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() animationClass = 'animate';
  @Input() animationDelay = 100;
  @Input() threshold = 0.5;

  private observer: IntersectionObserver | null = null;
  private timeoutId: number | null = null;
  private hasAnimated = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Add initial classes
    this.renderer.addClass(this.el.nativeElement, 'animated-element');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.threshold
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateElement();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }



  private animateElement() {
    if (this.timeoutId !== null) return;
    this.timeoutId = window.setTimeout(() => {
      this.renderer.addClass(this.el.nativeElement, this.animationClass);
      this.hasAnimated = true;

      if (this.observer) {
        this.observer.unobserve(this.el.nativeElement);
      }

      this.clearTimeout();
    }, this.animationDelay);
  }

  private clearTimeout() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.clearTimeout();
  }
}

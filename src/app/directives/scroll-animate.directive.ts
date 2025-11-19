import {Directive, ElementRef, input, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  // Signal-based inputs for Angular 20+
  animationClass = input<string>('animate');
  animationDelay = input<number>(100);
  threshold = input<number>(0.5);

  private observer: IntersectionObserver | null = null;
  private timeoutId: number | null = null;
  private hasAnimated = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Add initial classes for animation setup
    this.renderer.addClass(this.el.nativeElement, 'animated-element');

    // Configure IntersectionObserver options with threshold from input signal
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.threshold()
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



  // Animate element when it enters viewport
  private animateElement() {
    if (this.timeoutId !== null) return;
    this.timeoutId = window.setTimeout(() => {
      // Apply animation class from input signal to trigger CSS animation
      this.renderer.addClass(this.el.nativeElement, this.animationClass());
      this.hasAnimated = true;

      // Disconnect observer after animation to prevent re-triggering
      if (this.observer) {
        this.observer.unobserve(this.el.nativeElement);
      }

      this.clearTimeout();
    }, this.animationDelay());
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

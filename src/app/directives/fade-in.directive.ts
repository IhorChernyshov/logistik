import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Directive({
  selector: '[appFadeIn]'
})
export class FadeInDirective implements AfterViewInit {
  private player!: AnimationPlayer;

  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder
  ) {}

  ngAfterViewInit() {
    const fadeInAnimation = this.builder.build([
      style({ opacity: 0 }),
      animate('0.3s 0.3s ease-in', style({ opacity: 1 }))
    ]);

    // Создаем плеер анимации
    this.player = fadeInAnimation.create(this.el.nativeElement);

    // Запускаем анимацию
    this.player.play();
  }
}

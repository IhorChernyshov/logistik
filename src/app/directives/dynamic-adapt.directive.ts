import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';

interface AdaptConfig {
  destination: HTMLElement;
  breakpoint: number;
  place: string;
}

@Directive({
  selector: '[appDynamicAdapt]',
  standalone: true
})
export class DynamicAdaptDirective  implements OnInit, OnDestroy{

  @Input('appDynamicAdapt') dataDa: string | any;

  private originalParent: HTMLElement | any;
  private originalIndex: number | any;
  private configs: AdaptConfig[] = [];
  private resizeObserver: ResizeObserver | any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.parseData();
    this.originalParent = this.el.nativeElement.parentElement;
    this.originalIndex = Array.prototype.indexOf.call(this.originalParent.children, this.el.nativeElement);

    this.resizeObserver = new ResizeObserver(() => {
      this.mediaHandler();
    });

    this.resizeObserver.observe(document.body);
    this.mediaHandler();  // Initial check
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(document.body);
  }

  private parseData(): void {
    const records: string[] = this.dataDa.split(';').map((record: string) => record.trim()).filter((record: string) => record.length > 0);
    for (const record of records) {
      const dataArray: string[] = record.split(',');
      const config: AdaptConfig = {
        destination: document.querySelector(dataArray[0].trim()) as HTMLElement,
        breakpoint: dataArray[1] ? parseInt(dataArray[1].trim(), 10) : 767,
        place: dataArray[2] ? dataArray[2].trim() : 'last'
      };
      this.configs.push(config);
    }
    // Sort configs from highest to lowest breakpoint to ensure the first matching config is the most specific one
    this.configs.sort((a, b) => b.breakpoint - a.breakpoint);
  }

  private mediaHandler(): void {
    const windowWidth = window.innerWidth;
    let appliedConfig: AdaptConfig | null = null;

    for (const config of this.configs) {
      if (windowWidth <= config.breakpoint) {
        appliedConfig = config;
      } else {
        // If window width exceeds the breakpoint, move back to the original position
        this.moveBack(this.originalParent, this.el.nativeElement, this.originalIndex);
      }
    }

    if (appliedConfig) {
      this.moveTo(appliedConfig.place, this.el.nativeElement, appliedConfig.destination);
    }
  }

  private moveTo(place: string, element: HTMLElement, destination: HTMLElement): void {
    this.renderer.addClass(element, 'dynamic_adapt');

    const placeIndex = place === 'first' ? 0 : (place === 'last' ? destination.children.length : parseInt(place, 10));

    if (placeIndex === destination.children.length) {
      this.renderer.appendChild(destination, element);
    } else if (placeIndex === 0) {
      this.renderer.insertBefore(destination, element, destination.firstChild);
    } else {
      this.renderer.insertBefore(destination, element, destination.children[placeIndex]);
    }
  }

  private moveBack(parent: HTMLElement, element: HTMLElement, index: number): void {
    this.renderer.removeClass(element, 'dynamic_adapt');
    if (parent.children[index] !== undefined) {
      this.renderer.insertBefore(parent, element, parent.children[index]);
    } else {
      this.renderer.appendChild(parent, element);
    }
  }
}

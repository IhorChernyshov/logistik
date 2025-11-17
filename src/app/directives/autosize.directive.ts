import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutosize]',
  standalone: true
})
export class AutosizeDirective implements OnInit{


  /*constructor(private element: ElementRef, private renderer: Renderer2) {}
  private maxHeight = 80;
  private overflowHeight = 200;

  @HostListener('input', ['$event.target'])
  onInput(): void {
    this.adjustHeight();
  }

  ngOnInit(): void {
    this.adjustHeight();
  }

  adjustHeight(): void {
    const textarea = this.element.nativeElement;
    this.renderer.setStyle(textarea, 'height', 80 + 'px');
    const newHeight = Math.min(textarea.scrollHeight);
    this.renderer.setStyle(textarea, 'height', `${newHeight}px`);
    // this.adjustBorderRadius(newHeight);
    this.adjustScroll(newHeight);
    this.heightChanged.emit(newHeight);
  }


 /!* adjustBorderRadius(height: number){
    const borderRadius = height < this.maxHeight ? '40px 50px 50px 40px' : '15px';
    this.renderer.setStyle(this.element.nativeElement, 'border-radius', borderRadius);
  }*!/
  adjustScroll(height: number){
    const heightScroll = height < this.overflowHeight ? 'hidden' : 'scroll';
    this.renderer.setStyle(this.element.nativeElement, 'overflow-y', heightScroll);
  }

  resetHeight(): void {
    this.renderer.setStyle(this.element.nativeElement, 'height', '60px');
    // this.adjustBorderRadius(62);
    this.adjustScroll(62);
  }*/
  // Configurable height parameters
  @Output() heightChanged = new EventEmitter<number>();
  @Input() minHeight = 80;  // Minimum textarea height
  @Input() maxHeight = 180; // Maximum textarea height before scrolling

  private textarea: HTMLTextAreaElement;


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.textarea = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    // Initialize with min height
    this.renderer.setStyle(this.textarea, 'height', `${this.minHeight}px`);
    this.renderer.setStyle(this.textarea, 'overflow-y', 'hidden');
  }

  // Listen to multiple events that might change textarea content
  @HostListener('input')
  @HostListener('change')
  @HostListener('paste')
  onInput(): void {
    this.adjustHeight();
  }

  /*---WORK---*/
  adjustHeight(): void {
    // Trim to check if there's actual content
    const trimmedContent = this.textarea.value.trim();

    // If no content, set to minimum height
    if (!trimmedContent) {
      this.renderer.setStyle(this.textarea, 'height', `${this.minHeight}px`);
      this.renderer.setStyle(this.textarea, 'overflow-y', 'hidden');
      this.heightChanged.emit(this.minHeight);
      return;
    }

    // Reset height to auto to correctly calculate scroll height
    this.renderer.setStyle(this.textarea, 'height', 'auto');

    // Calculate new height
    const scrollHeight = this.textarea.scrollHeight;
    const newHeight = Math.min(
      Math.max(scrollHeight, this.minHeight),
      this.maxHeight
    );

    // Set new height
    this.renderer.setStyle(this.textarea, 'height', `${newHeight}px`);

    // Adjust overflow
    const overflowStyle = newHeight >= this.maxHeight ? 'auto' : 'hidden';
    this.renderer.setStyle(this.textarea, 'overflow-y', overflowStyle);

    // Emit height change
    this.heightChanged.emit(newHeight);
  }






  // Method to reset height if needed
  resetHeight(): void {
    this.renderer.setStyle(this.textarea, 'height', `${this.minHeight}px`);
    this.renderer.setStyle(this.textarea, 'overflow-y', 'hidden');
    this.heightChanged.emit(this.minHeight);
  }
}

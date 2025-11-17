import { Directive, ElementRef, inject, input, OnDestroy, OnInit, output } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
    constructor() {}
    private elementRef = inject(ElementRef);

    // Input signals for configuration
    excludeSelectors = input<string[]>([]);

    // Output signal for click outside event
    clickOutside = output<void>();

    private documentClickListener: ((event: MouseEvent) => void) | null = null;

    ngOnInit() {
        this.documentClickListener = (event: MouseEvent) => {
            const clickedInside = this.elementRef.nativeElement.contains(event.target);

            // Check if clicked element matches any excluded selectors
            const clickedOnExcluded = this.excludeSelectors().some((selector) =>
                document.querySelector(selector)?.contains(event.target as Node),
            );

            if (!clickedInside && !clickedOnExcluded) {
                this.clickOutside.emit();
            }
        };

        // Use addEventListener with passive option for performance
        document.addEventListener('click', this.documentClickListener, { passive: true });
    }

    ngOnDestroy() {
        // Cleanup to prevent memory leaks
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
        }
    }
}

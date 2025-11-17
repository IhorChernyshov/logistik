/**
 * Mixin class to automatically unsubscribe in component classes.
 */

import { ReplaySubject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { AnyConstructor } from '../types/AnyConstructor';

export const subscribedContainerMixin = <TBase extends AnyConstructor>(
  Base: TBase = class {} as TBase,
) =>
  class extends Base implements OnDestroy {
    destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

    ngOnDestroy(): void {
      // @ts-ignore
      this.destroy$.next();
      this.destroy$.unsubscribe();
    }
  };

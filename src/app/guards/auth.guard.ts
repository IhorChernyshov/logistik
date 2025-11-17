import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route): Observable<boolean | UrlTree> => {
    const auth = inject(AuthenticationService);
    const router = inject(Router);
    if (!auth.isLoggedIn()) {
        // console.log('AuthGuard: user is not logged in');
        router.navigateByUrl('/');
        return of(false);
    } else {
        return auth.profile().pipe(
            map((user) => {
                auth.addUserValue(user);
                // console.log('login: ', auth.currentUser());
                const userRole = auth.getRole();
                // console.log('userRole: ', userRole);
                // console.log('AuthGuard: ', route.data['role']);
                if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
                    console.log('AuthGuard: user does not have the right role');
                    router.navigate(['/']);
                    return false;
                } else {
                    return true;
                }
            }),
        );
    }
};

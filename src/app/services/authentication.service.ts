import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
// import { TokenPayload } from '../../../../src/interfaces/TokenPayload';
// import { Token } from '../../../../src/interfaces/Token';
// import { UserInterface } from '../../../../src/interfaces/UserInterface';

// Временные интерфейсы - замените на ваши реальные интерфейсы
export interface TokenPayload {
    email?: string;
    password?: string;
    device?: string | null;
    [key: string]: any;
}

export interface Token {
    token?: string;
    [key: string]: any;
}

export interface UserInterface {
    _id?: string;
    email?: string;
    name?: string;
    role?: string;
    exp?: number;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private http = inject(HttpClient);
    private router = inject(Router);
    // private socketService = inject(SocketChatService);
    // private keyManager = inject(KeyManagementService);
    // private chatService = inject(ChatService);
    // private sanitizer = inject(DomSanitizer);

    public currentUser = signal<any | null>(null);
    private token = signal<string | null>(localStorage.getItem('aero-token'));
    public resetToken = signal<string>('');
    private pass = signal<string | null>(localStorage.getItem('aero-pass'));

    constructor() {}

    public addUserValue(user: any) {
        this.saveUser(user.data);
    }
    private saveUser(user: UserInterface) {
        this.fillUser(user);
    }
    private fillUser(user: any) {
        if (user.user) {
            this.changeCurrentUser(user.user);
        } else {
            this.changeCurrentUser(user);
        }
    }
    public changeCurrentUser(currentUser: any) {
        this.currentUser.set(currentUser);
        console.log('CURRENT: ', currentUser);
    }
    public savePass(pass: string) {
        localStorage.setItem('aero-pass', pass);
        this.pass.set(pass);
    }
    public getPass() {
        return this.pass();
    }
    hasValidPrivateKey(): boolean {
        const key = this.pass();
        return key !== null;
    }

    // Save token to localStorage and update state
    public saveToken(token: string): void {
        try {
            if (token && token.trim() && this.token() !== token) {
                localStorage.setItem('aero-token', token);
                this.token.set(token);
            } else {
                console.log('Token already set or invalid:', token);
            }
        } catch (e) {
            console.error('Failed to save token:', e);
        }
    }

    // Get token from state
    public getToken(): string | null {
        this.token.set(localStorage.getItem('aero-token'));
        return this.token();
    }

    // Decode user details from token
    private getUserDetails(): UserInterface | null {
        const tokenValue = this.token();
        if (tokenValue && tokenValue.split('.').length === 3) {
            const payload = window.atob(tokenValue.split('.')[1]);
            return JSON.parse(payload) as UserInterface;
        }
        return null;
    }

    // Check if user is logged in
    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        return user?.exp ? user.exp > Date.now() / 1000 : false;
    }

    // Update current user state
    public setCurrentUser(user: UserInterface): void {
        // console.log('user:', user);
        this.currentUser.set(user);
    }

    public getCurrentUser(): UserInterface | null {
        return this.currentUser();
    }

    public getRole(): string {
        // console.log('role:', this.currentUser().role);
        return this.currentUser()?.role || '';
    }

    // Clear authentication data
    private clearAuthentication(): void {
        this.token.set(null);
        localStorage.removeItem('aero-token');
        localStorage.removeItem('aero-pass');
        this.currentUser.set(null);
    }

    // General request handler
    private request<T>(
        method: 'post' | 'get' | 'patch' | 'delete',
        endpoint: string,
        body?: TokenPayload | FormData | undefined,
        responseType?: any,
        tokenPayload?: Token,
    ): Observable<T> {
        const headers = { Authorization: `Bearer ${this.token()}` };
        const url = `/api/v1/users/${endpoint}`;

        let request$: Observable<any>;

        switch (method) {
            case 'post':
                request$ = this.http.post(url, body, { headers });
                break;
            case 'get':
                request$ = this.http.get(url, { headers, responseType });
                break;
            case 'patch':
                request$ = this.http.patch(url, body, { headers });
                break;
            case 'delete':
                request$ = this.http.delete(url, { headers });
                break;
            default:
                throw new Error('Unsupported HTTP method');
        }

        return request$.pipe(
            map((response: any) => {
                if (response.token) {
                    this.saveToken(response.token);
                }
                if (response.user) {
                    console.log('response:', response.user);
                    this.setCurrentUser(response.user);
                }
                return response;
            }),
        );
    }

    // User actions
    public register(user: TokenPayload): Observable<any> {
        user.device = localStorage.getItem('deviceActivation') ? localStorage.getItem('deviceActivation') : '';
        return this.request('post', 'signup', user);
    }

    public login(user: TokenPayload): Observable<any> {
        user.device = localStorage.getItem('deviceActivation') ? localStorage.getItem('deviceActivation') : '';
        return this.request('post', 'login', user);
    }

    async logout(): Promise<void> {
        this.request('get', 'logout').subscribe({
            next: async () => {
              this.clearAuthentication();
              await this.router.navigate(['/']);
            },
            error: (err) => console.error('Logout failed', err),
        });
    }

    public forgotPassword(email: string): Observable<any> {
        const body = {
            email,
            device: localStorage.getItem('deviceActivation') ? localStorage.getItem('deviceActivation') : '',
        };

        return this.request('post', 'forgotPassword', body);
    }

    public resetMyPassword(body: TokenPayload, emailToken: string | undefined): Observable<any> {
        body.device = localStorage.getItem('deviceActivation') ? localStorage.getItem('deviceActivation') : '';
        return this.request('patch', `resetPassword/${emailToken}`, body);
    }

    public emailVerify(emailToken: string): Observable<any> {
        return this.request('patch', `emailVerify/${emailToken}`);
    }

    public deviceActivate(deviceToken: string) {
        return this.request('post', `deviceActivate/${deviceToken}`);
    }

    public updateProfile(data: any): Observable<any> {
        return this.request('patch', 'updateMe', data);
    }

    public profile(): Observable<UserInterface> {
        return this.request<UserInterface>('get', 'me');
    }

    //Get contacts of the logged-in user
    public getContacts(): Observable<any> {
        return this.request('get', 'getContacts');
    }

    public sendInvite(email: string): Observable<any> {
        return this.request('get', `sendInvite/${email}`);
    }

    public getMyStat(): Observable<any> {
        return this.request('get', 'getMyStat');
    }
    //Add a user to contacts by email
    public addContact(email: string): Observable<any> {
        return this.request('post', 'addContact', { email });
    }

    //Remove a user from contacts by contactId
    public removeContact(contactId: string): Observable<any> {
        return this.request('delete', `removeContact/?contactId=${contactId}`);
    }

    //Get the avatar of the logged-in user or another user
    public getAvatar(userId?: string): Observable<Blob> {
        const endpoint = userId ? `avatar/${userId}` : 'avatar';
        return this.request('get', endpoint, undefined, 'blob');
    }

    //Upload avatar for the logged-in user
    public uploadAvatar(formData: FormData): Observable<any> {
        return this.request('post', 'uploadAvatar', formData);
    }

    //Get all users (admin only)
    public getAllUsers(): Observable<any> {
        return this.request('get', '');
    }

    //Get a specific user by ID
    public getUserById(userId: string): Observable<any> {
        return this.request('get', userId);
    }

    //Delete the logged-in user (deactivate the account)
    public deleteMe(): Observable<any> {
        return this.request('delete', 'deleteMe');
    }

    //Delete a user by ID (admin only)
    public deleteUserById(userId: string): Observable<any> {
        return this.request('delete', userId);
    }

    // Unsubscribe from the mailing list
    public unsubscribe(token: string): Observable<any> {
        return this.request('patch', `unsubscribe/${token}`);
    }

}

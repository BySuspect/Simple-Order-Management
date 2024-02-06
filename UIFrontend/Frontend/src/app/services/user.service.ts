import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const USER_KEY = 'sessionData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  private setUserToLocalStorage(user: User) {
    const userJson = JSON.stringify(user);
    const base64User = btoa(userJson);
    this.cookieService.set(USER_KEY, base64User, {
      expires: 30,
      secure: true,
    });
    console.log(this.cookieService.get(USER_KEY));
  }

  private getUserFromLocalStorage(): User {
    const base64User = this.cookieService.get(USER_KEY);
    if (base64User) {
      const userJson = atob(base64User);
      return JSON.parse(userJson) as User;
    } else {
      return new User();
    }
  }

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome ${user.firstName}!`,
            'Login Successful'
          );
          this.setUserToLocalStorage(user);
        },
        error: (error) => {
          this.toastrService.error(error.error, 'Login Failed');
        },
      })
    );
  }

  register(userRegiser: IUserRegister): Observable<User> {
    console.log(userRegiser);
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          console.log(user);
          // this.setUserToLocalStorage(user);
          // this.userSubject.next(user);
          this.toastrService.success(
            `Welcome ${user.firstName}`,
            'Register Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    this.cookieService.delete(USER_KEY);
    window.location.reload();
  }

  getAll() {
    return [];
    // return this.http.get<User[]>(USERS_URL).pipe(
    //   tap({
    //     error: (errorResponse) => {
    //       if (errorResponse.status == 401) {
    //         this.logout();
    //         this.router.navigateByUrl('/login');
    //         this.toastrService.error('Unauthorized', 'Please login again');
    //       } else
    //         this.toastrService.error(errorResponse.status, errorResponse.error);
    //     },
    //   })
    // );
  }

  updateUser(user: User) {
    return null;
    // return this.http.post<User>(USERS_URL, user).pipe(
    //   tap({
    //     next: (user) => {
    //       if (user.id == this.userSubject.value.id) {
    //         const localUser = this.getUserFromLocalStorage();
    //         localUser.firstName = user.firstName;
    //         localUser.lastName = user.lastName;
    //         localUser.email = user.email;
    //         localUser.phone = user.phone;
    //         localUser.address = user.address;
    //         this.setUserToLocalStorage(localUser);
    //       }
    //     },
    //     error: (errorResponse) => {
    //       this.toastrService.error(errorResponse.status, errorResponse.message);
    //     },
    //   })
    // );
  }

  checkToken() {
    return null;
    // if (this.currentUser.token) {
    //   return this.http.get(USERS_VERIFY_URL).pipe(
    //     tap({
    //       error: (errorResponse) => {
    //         if (errorResponse.status == 402) {
    //           console.log('User Verifed');
    //           return;
    //         } else if (errorResponse.status == 401) {
    //           this.logout();
    //           this.router.navigateByUrl('/login');
    //           this.toastrService.error('Please login again', 'Unauthorized');
    //         } else
    //           this.toastrService.error(
    //             errorResponse.status,
    //             errorResponse.error
    //           );
    //       },
    //     })
    //   );
    // } else return null;
  }

  checkIsAdmin() {
    return true;
    //return this.http.get(USERS_CHECK_ISADMIN_URL);
  }
}

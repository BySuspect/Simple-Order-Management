import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Welcome!';

  constructor(private userService: UserService) {
    console.log('app component');
    //old verify method
    // userService.checkToken()?.subscribe((res) => {
    //   //console.log(res);
    // });
  }
}

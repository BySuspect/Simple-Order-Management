import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'panel-users-list',
  templateUrl: './panel-users-list.component.html',
  styleUrls: ['./panel-users-list.component.css'],
})
export class PanelUsersListComponent {
  users!: User[];

  constructor(private userService: UserService) {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }
}

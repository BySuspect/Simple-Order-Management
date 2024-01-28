import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'panel-users-list-item',
  templateUrl: './panel-users-list-item.component.html',
  styleUrls: ['./panel-users-list-item.component.css'],
})
export class PanelUsersListItemComponent {
  @Input()
  user!: User;

  constructor(private userService: UserService) {}

  updateUser() {
    let firstNameInput = document.querySelector(
      `[name="${this.user.id}-firstname"]`,
    ) as HTMLInputElement;

    let lastNameInput = document.querySelector(
      `[name="${this.user.id}-lastname"]`,
    ) as HTMLInputElement;

    let emailInput = document.querySelector(
      `[name="${this.user.id}-email"]`,
    ) as HTMLInputElement;

    let phoneInput = document.querySelector(
      `[name="${this.user.id}-phone"]`,
    ) as HTMLInputElement;

    this.user.firstName = firstNameInput.value;
    this.user.lastName = lastNameInput.value;
    this.user.email = emailInput.value;
    this.user.phone = phoneInput.value;

    this.userService.updateUser(this.user).subscribe((user) => {
      console.log(user);
      this.user = user;
    });
  }

  activeUser() {}

  deactiveUser() {}
}

import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'panel-users-list-item',
  templateUrl: './panel-users-list-item.component.html',
  styleUrls: ['./panel-users-list-item.component.css'],
})
export class PanelUsersListItemComponent {
  @Input()
  user!: User;

  constructor() {}

  updateUser() {}

  activeUser() {}

  deactiveUser() {}
}

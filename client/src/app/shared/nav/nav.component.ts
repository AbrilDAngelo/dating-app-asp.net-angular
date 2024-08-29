import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '@services';
import { MenuItem, UserLoginData } from '@interfaces';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);

  userLoginData: UserLoginData = {
    username: '',
    password: '',
  };

  menuItems: MenuItem[] = [
    {
      name: 'Matches',
      link: '',
    },
    {
      name: 'Lists',
      link: '',
    },
    {
      name: 'Messages',
      link: '',
    },
    // {
    //   name: 'Logout',
    //   link: '',
    //   clickAction: this.logout.bind(this),
    // },
  ];

  login() {
    this.accountService.login(this.userLoginData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
    });
  }

  logout() {
    this.accountService.logout();
  }
}

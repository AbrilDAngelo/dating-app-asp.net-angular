import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem, UserLoginData } from '@interfaces';
import { AccountService } from '@services';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDropdownModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  private _router = inject(Router);
  private _toastrService = inject(ToastrService);

  userLoginData: UserLoginData = {
    username: '',
    password: '',
  };

  menuItems: MenuItem[] = [
    {
      name: 'Matches',
      link: '/members',
    },
    {
      name: 'Lists',
      link: '/lists',
    },
    {
      name: 'Messages',
      link: '/messages',
    },
    // {
    //   name: 'Logout',
    //   link: '',
    //   clickAction: this.logout.bind(this),
    // },
  ];

  login() {
    this.accountService.login(this.userLoginData).subscribe({
      next: () => this._router.navigateByUrl('/members'),
      error: (error) => this._toastrService.error(error.error),
    });
  }

  logout() {
    this.accountService.logout();
  }
}

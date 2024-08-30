import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterFormComponent } from '@components';
import { UserResponse } from '../../_interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);

  users: UserResponse[] = [];
  registerMode = false;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers(): void {
    this.http.get<UserResponse[]>('https://localhost:5001/api/users').subscribe({
      next: (response: UserResponse[]) => {
        this.users = response;
        console.log('USERS', this.users);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Request completed'),
    });
  }
}

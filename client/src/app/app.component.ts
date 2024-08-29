import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

interface User {
  id: number,
  userName: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'DatingApp';
  users: User[] = [];

  ngOnInit(): void {
    this.http.get<User[]>('https://localhost:5001/api/users').subscribe({
      next: (response: User[]) => {this.users = response},
      error: error => console.error(error),
      complete: () => console.log('Request completed')
    })
  }
}

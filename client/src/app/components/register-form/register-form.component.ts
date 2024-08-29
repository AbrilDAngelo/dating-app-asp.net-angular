import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserRegisterData } from '@interfaces';
import { AccountService } from '@services';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private _accountService = inject(AccountService);

  users = input.required<User[]>();
  cancelRegister = output<boolean>();

  userRegisterData: UserRegisterData = {
    username: '',
    password: '',
  };

  register() {
    this._accountService.register(this.userRegisterData).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

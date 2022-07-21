import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Input } from 'src/app/shared/models/input.model';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  message: Message = {
    text: '',
    type: '',
  };
  inputs: Input[] = [
    {
      field: 'email',
      type: 'email',
      placeholder: 'Email',
      messageError: () => {
        if (this.form?.get?.('email')?.['errors']?.['required']) {
          return 'Email не может быть пустым.';
        }
        if (this.form?.get?.('email')?.['errors']?.['email']) {
          return 'Введите корректный email.';
        }
        return '';
      },
    },
    {
      field: 'password',
      type: 'password',
      placeholder: 'Введите пароль',
      messageError: () => {
        if (this.form?.get?.('password')?.['errors']?.['required']) {
          return 'Пароль не может быть пустым.';
        }
        if (
          this.form?.get?.('password')?.['errors']?.['minlength'] &&
          this.form?.get?.('password')?.['errors']?.['minlength'][
            'requiredLength'
          ]
        )
          return `Пароль должен быть больше ${
            this.form.get('password')?.['errors']?.['minlength']?.[
              'requiredLength'
            ]
          } символов. Сейчас ${
            this.form.get('password')?.['errors']?.['minlength']?.[
              'actualLength'
            ]
          }.`;
        return '';
      },
    },
  ];
  constructor(
    private usersService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['canLogin']) {
        this.showMessage({
          text: 'Теперь вы можете зайти в систему',
          type: 'success',
        });
      } else if (params['deleteUser']) {
        this.showMessage({
          text: 'Ваш аккаунт успешно удалён',
          type: 'success',
        });
      } else if (params['accessDenied']) {
        this.showMessage({
          text: 'Авторизуйтесь чтобы попасть в систему',
          type: 'warning',
        });
      }
    });
  }
  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          this.authService.Login(user);
          this.router.navigate(['system/account']);
        } else {
          this.showMessage({
            text: 'Пароль не верный',
            type: 'danger',
          });
        }
      } else {
        this.showMessage({
          text: 'Такого пользователя не существует',
          type: 'danger',
        });
      }
    });
  }
}

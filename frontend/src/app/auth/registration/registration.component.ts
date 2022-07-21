import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Input } from 'src/app/shared/models/input.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../auth.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(
      null,
      [Validators.required, Validators.email],
      this.forbiddenEmails.bind(this)
    ),
    lastname: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    post: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  inputs: Input[] = [
    {
      field: 'lastname',
      type: 'name',
      placeholder: 'Фамилия',
      messageError: () => {
        // console.log('lastname');
        return 'Поле фамилия должно быть заполнено.';
      },
    },
    {
      field: 'firstname',
      type: 'name',
      placeholder: 'Имя',
      messageError: () => {
        return 'Имя должно быть заполнено.';
      },
    },
    {
      field: 'post',
      type: 'text',
      placeholder: 'Должность',
      messageError: () => {
        return 'Поле должность должно быть заполнено.';
      },
    },
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
        if (this.form?.get?.('email')?.['errors']?.['forbiddenEmail']) {
          return 'Email уже занят.';
        }
        return '';
      },
    },
    {
      field: 'password',
      type: 'password',
      placeholder: 'Придумайте пароль',
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
  // checkBox: Input = {
  //   field: 'agree',
  //   type: 'checkbox',
  //   placeholder: 'Согласие',
  //   messageError: () => {
  //     return 'Подтвердите согласие.';
  //   },
  //   label: 'Согласен с обработкой персональных данных',
  // };

  constructor(
    title: Title,
    meta: Meta,
    private userService: UserService,
    private router: Router
  ) {
    title.setTitle('Регистрация в системе');
    meta.addTags([
      {
        name: 'keywords',
        content: 'регистрация,создание,аккаунт,система,личный,кабинет',
      },
      {
        name: 'description',
        content: 'Страница для регистрации пользователя в системе',
      },
    ]);
    // console.log(this.form.get('email'));
  }

  ngOnInit(): void {}

  forbiddenEmails(control: AbstractControl): Promise<any> {
    return new Promise((resolve) => {
      this.userService.getUserByEmail(control.value).subscribe((user: User) => {
        if (user) {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      });
    });
  }

  onSubmit() {
    const { email, lastname, firstname, post, password } = this.form.value;
    const user = new User(email, password, lastname, firstname, post);

    this.userService.createUser(user).subscribe(() => {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          canLogin: true,
        },
      });
    });
  }
}

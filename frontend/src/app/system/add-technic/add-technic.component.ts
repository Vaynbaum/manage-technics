import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Input } from 'src/app/shared/models/input.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Technic } from '../shared/models/technic.model';
import { IotService } from '../shared/services/iot.service';
import { TechnicService } from '../shared/services/technic.service';

@Component({
  selector: 'app-add-technic',
  templateUrl: './add-technic.component.html',
  styleUrls: ['./add-technic.component.scss'],
})
export class AddTechnicComponent implements OnInit {
  types: string[] = ['1.png', '2.png'];
  form: FormGroup = new FormGroup({
    number: new FormControl(
      null,
      [Validators.required, Validators.minLength(6)],
      this.forbiddenTechnics.bind(this)
    ),
  });
  typeTech = '1.png';
  constructor(
    private technicService: TechnicService,
    private authService: AuthService,
    private iotService: IotService,
    private router: Router
  ) {}
  forbiddenTechnics(control: AbstractControl): Promise<any> {
    return new Promise((resolve) => {
      this.technicService
        .getTechnicsByNumber(control.value)
        .subscribe((technic: Technic) => {
          if (technic) {
            resolve({ forbiddenTechnic: true });
          } else {
            resolve(null);
          }
        });
    });
  }
  joinerURL(type: string) {
    return `../../../assets/images/technics/${type}`;
  }
  selectType(type: string) {
    this.typeTech = type;
  }
  onSubmit() {
    const { number } = this.form.value;
    const STR_FREE = 'Свободна';
    const longitude = 109.14423378540994;
    const latitude = 59.642699922802464;
    const technic = new Technic(
      this.typeTech,
      number,
      this.authService.user?.id as number
    );

    this.technicService.createTechnic(technic).subscribe((createTechnic) => {
      this.iotService.addTechnic(
        new Technic(
          this.typeTech,
          number,
          this.authService.user?.id as number,
          STR_FREE,
          latitude,
          longitude,
          //@ts-ignore
          createTechnic.id
        )
      );
      this.router.navigate(['system/technics']);
    });
  }
  isSelect(type: string) {
    return this.typeTech == type;
  }
  ngOnInit(): void {}
  inputs: Input[] = [
    {
      field: 'number',
      type: 'text',
      placeholder: 'Номер техники',
      messageError: () => {
        if (this.form?.get?.('number')?.['errors']?.['required']) {
          return 'Номер не может быть пустым.';
        }
        if (this.form?.get?.('number')?.['errors']?.['forbiddenTechnic']) {
          return 'Номер уже занят.';
        }
        if (
          this.form?.get?.('number')?.['errors']?.['minlength'] &&
          this.form?.get?.('number')?.['errors']?.['minlength'][
            'requiredLength'
          ]
        )
          return `Номер должен быть больше ${
            this.form.get('number')?.['errors']?.['minlength']?.[
              'requiredLength'
            ]
          } символов. Сейчас ${
            this.form.get('number')?.['errors']?.['minlength']?.['actualLength']
          }.`;
        return '';
      },
    },
  ];
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { ControlsOf, IProfile } from '@shared';

@Component({
  selector: 'app-forms-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss'],
})
export class FormsElementsComponent implements OnInit, OnDestroy {
  q = {
    username: '',
    email: '',
    gender: '',
  };

  reactiveForm1 = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    city: [''],
    address: [''],
    company: [''],
    tele: [''],
    website: [''],
    date: [''],
  });

  reactiveForm2 = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    city: [''],
    address: [''],
    company: [''],
    tele: [''],
    website: [''],
    date: [''],
  });

  translateSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  getErrorMessage(form: FormGroup<ControlsOf<IProfile>>) {
    return form.get('email')?.hasError('required')
      ? 'validations.required'
      : form.get('email')?.hasError('email')
      ? 'validations.invalid_email'
      : '';
  }
}

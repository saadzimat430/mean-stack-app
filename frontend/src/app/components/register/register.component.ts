import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    login: '',
    password: '',
    age: 0,
    famille: '',
    race: '',
    nourriture: '',
    dateCreation: new Date()
  };

  submitted = false;
  marsuForm: FormGroup;
  MarsuFamille: any = ['platyrhiniens', 'catarhiniens', 'autre']
  MarsuRace: any = ['langur', 'colobe', 'chimpanzé', 'marsupilami', 'autre']
  nourriture: any = ['fruits', 'graines', 'noix', 'légumes', 'omnivore']

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.marsuForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.minLength(6)]],
      age: [''],
      famille: [''],
      race: [''],
      nourriture: ['']
    })
  }

  updateF(e) {
    this.marsuForm.get('famille').setValue(e, {
      onlySelf: true
    })
  }

  updateR(e) {
    this.marsuForm.get('race').setValue(e, {
      onlySelf: true
    })
  }

  updateN(e) {
    this.marsuForm.get('nourriture').setValue(e, {
      onlySelf: true
    })
  }

  get myForm() {
    return this.marsuForm.controls;
  }

  onSubmit() {
    this.auth.register(this.marsuForm.value).subscribe(() => {
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }

}

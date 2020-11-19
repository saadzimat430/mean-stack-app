import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService, TokenPayload } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-createfriend',
  templateUrl: './createfriend.component.html',
  styleUrls: ['./createfriend.component.css']
})
export class CreatefriendComponent implements OnInit {

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

  constructor(public fb: FormBuilder, private router: Router, public apiService: ApiService,
    public auth: AuthenticationService) {
    this.mainForm();
  }

  mainForm() {
    this.marsuForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.minLength(6)]],
      age: [0],
      famille: [''],
      race: [''],
      nourriture: ['']
    })
  }

  ngOnInit(): void {
  }

  details = this.auth.getMarsuDetails();

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

  createFriend(): void {
    console.log(this.marsuForm.value);

    this.apiService.createFriend(this.marsuForm.value).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.router.navigateByUrl('/friends');
    }, error => {
      console.log(error);
    })
  }

  get myForm() {
    return this.marsuForm.controls;
  }

}

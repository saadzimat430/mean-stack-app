import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  marsuForm: FormGroup;

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
      password: ['', [Validators.minLength(6)]]
    })
  }

  get myForm() {
    return this.marsuForm.controls;
  }

  onSubmit() {
    this.auth.login(this.marsuForm.value).subscribe(() => {
      this.router.navigateByUrl('/me');
    }, (err) => {
      console.error(err);
    });
  }

}

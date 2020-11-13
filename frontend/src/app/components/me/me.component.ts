import { Component, OnInit } from '@angular/core';
import { AuthenticationService, MarsuDetails } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  details: MarsuDetails;

  constructor(public auth: AuthenticationService) { };

  details = this.auth.getMarsuDetails();

  ngOnInit(): void {
    console.log(this.details);
  }

}

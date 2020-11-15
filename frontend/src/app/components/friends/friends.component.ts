import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  Marsupilamis: any = [];
  Friends: any = [];
  submitted: boolean = false;

  constructor(public apiService: ApiService,
    public auth: AuthenticationService,
    public router: Router) {
    this.readMarsupilamis();
    this.getFriends();
  }

  ngOnInit() { }

  details = this.auth.getMarsuDetails();

  readMarsupilamis() {
    this.apiService.getMarsupilamis().subscribe((data) => {
      this.Marsupilamis = data;
    })
  }

  getFriends() {
    this.apiService.getFriendsList(this.details.marsupilami.id).subscribe((data) => {
      this.Friends = data;
    })
  }

  addFriend(id): void {
    const data = {
      id: id
    }

    this.apiService.addFriend(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      window.location.reload();
    }, error => {
      console.log(error);
    })
  }

  removeFriend(id): void {
    const data = {
      id: id
    }

    this.apiService.removeFriend(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
    }, error => {
      console.log(error);
    })

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}

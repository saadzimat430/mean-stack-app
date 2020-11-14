import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  Friends: any = [];
  submitted: boolean = false;

  constructor(public apiService: ApiService,
    public auth: AuthenticationService) {
    this.readFriends();
  }

  ngOnInit() { }

  details = this.auth.getMarsuDetails();

  readFriends() {
    this.apiService.getMarsupilamis().subscribe((data) => {
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
    }, error => {
      console.log(error);

    })
  }

  removeFriend(friend, index) {
    // ...
  }

}

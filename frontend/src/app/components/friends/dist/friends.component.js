"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FriendsComponent = void 0;
var core_1 = require("@angular/core");
var FriendsComponent = /** @class */ (function () {
    function FriendsComponent(apiService, auth, router) {
        this.apiService = apiService;
        this.auth = auth;
        this.router = router;
        this.Marsupilamis = [];
        this.Friends = [];
        this.submitted = false;
        this.details = this.auth.getMarsuDetails();
        this.readMarsupilamis();
        this.getFriends();
    }
    FriendsComponent.prototype.ngOnInit = function () { };
    FriendsComponent.prototype.readMarsupilamis = function () {
        var _this = this;
        this.apiService.getMarsupilamis().subscribe(function (data) {
            _this.Marsupilamis = data;
        });
    };
    FriendsComponent.prototype.getFriends = function () {
        var _this = this;
        this.apiService.getFriendsList(this.details.marsupilami.id).subscribe(function (data) {
            _this.Friends = data;
        });
    };
    FriendsComponent.prototype.addFriend = function (id) {
        var _this = this;
        var data = {
            id: id
        };
        this.apiService.addFriend(data).subscribe(function (response) {
            console.log(response);
            _this.submitted = true;
            window.location.reload();
        }, function (error) {
            console.log(error);
        });
    };
    FriendsComponent.prototype.removeFriend = function (id) {
        var _this = this;
        var data = {
            id: id
        };
        this.apiService.removeFriend(data).subscribe(function (response) {
            console.log(response);
            _this.submitted = true;
        }, function (error) {
            console.log(error);
        });
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    };
    FriendsComponent = __decorate([
        core_1.Component({
            selector: 'app-friends',
            templateUrl: './friends.component.html',
            styleUrls: ['./friends.component.css']
        })
    ], FriendsComponent);
    return FriendsComponent;
}());
exports.FriendsComponent = FriendsComponent;

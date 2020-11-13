"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthenticationService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        this.authUri = 'http://localhost:4000/auth';
    }
    AuthenticationService.prototype.saveToken = function (token) {
        localStorage.setItem('token', token);
        this.token = token;
    };
    AuthenticationService.prototype.getToken = function () {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    };
    AuthenticationService.prototype.logout = function () {
        this.token = '';
        window.localStorage.removeItem('token');
        this.router.navigateByUrl('/');
    };
    AuthenticationService.prototype.getMarsuDetails = function () {
        var token = this.getToken();
        var payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else {
            return null;
        }
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        var marsu = this.getMarsuDetails();
        if (marsu) {
            return marsu.exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.request = function (method, type, marsu) {
        var _this = this;
        var base;
        if (method === 'post') {
            base = this.http.post(this.authUri + "/" + type, marsu);
        }
        else {
            base = this.http.get(this.authUri + "/" + type, { headers: { 'token': "" + this.getToken() } });
        }
        var request = base.pipe(operators_1.map(function (data) {
            if (data.token) {
                _this.saveToken(data.token);
            }
            return data;
        }));
        return request;
    };
    AuthenticationService.prototype.register = function (marsu) {
        return this.request('post', 'signup', marsu);
    };
    AuthenticationService.prototype.login = function (marsu) {
        return this.request('post', 'login', marsu);
    };
    AuthenticationService.prototype.profile = function () {
        return this.request('get', 'me');
    };
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;

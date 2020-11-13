"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, router, auth) {
        this.fb = fb;
        this.router = router;
        this.auth = auth;
        this.credentials = {
            login: '',
            password: '',
            age: 0,
            famille: '',
            race: '',
            nourriture: '',
            dateCreation: new Date()
        };
        this.submitted = false;
        this.MarsuFamille = ['platyrhiniens', 'catarhiniens', 'autre'];
        this.MarsuRace = ['langur', 'colobe', 'chimpanzé', 'marsupilami', 'autre'];
        this.nourriture = ['fruits', 'graines', 'noix', 'légumes', 'omnivore'];
        this.mainForm();
    }
    RegisterComponent.prototype.ngOnInit = function () { };
    RegisterComponent.prototype.mainForm = function () {
        this.marsuForm = this.fb.group({
            login: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.minLength(6)]],
            age: [''],
            famille: [''],
            race: [''],
            nourriture: ['']
        });
    };
    RegisterComponent.prototype.updateF = function (e) {
        this.marsuForm.get('famille').setValue(e, {
            onlySelf: true
        });
    };
    RegisterComponent.prototype.updateR = function (e) {
        this.marsuForm.get('race').setValue(e, {
            onlySelf: true
        });
    };
    RegisterComponent.prototype.updateN = function (e) {
        this.marsuForm.get('nourriture').setValue(e, {
            onlySelf: true
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "myForm", {
        get: function () {
            return this.marsuForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.auth.register(this.credentials).subscribe(function () {
            _this.router.navigateByUrl('/me');
        }, function (err) {
            console.error(err);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;

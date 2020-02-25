import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  ingresar(){
    this._router.navigateByUrl("/dashboard");
  }

}

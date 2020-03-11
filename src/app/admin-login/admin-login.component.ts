import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email = 'manoj@ass.com';
  pass = 'manoj';
  constructor(private router: Router, private toaster: ToastrManager) { }

  ngOnInit() {
  }
  Submit(email: any, pass: any) {
    if (email.trim() != '' || pass.trim() != '') {
      if (email == this.email && pass == this.pass) {
        this.router.navigate([('/register')]);
      } else {
        this.toaster.errorToastr('not valid email and password', 'error', {
          toastTimeout: 5000
        })
      }
    }
    else {
      this.toaster.errorToastr('email and password should not empty', 'error', {
        toastTimeout: 5000
      })
    }
  }
}

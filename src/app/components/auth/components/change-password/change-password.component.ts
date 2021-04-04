import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  token: string;
  error: any;
  message: string;

  password = new FormControl('', [Validators.required]);
  repeatPassword = new FormControl('', [Validators.required]);
  form = new FormGroup({
    password: this.password,
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.token = window.location.search.split('=')[1];
    console.log(this.token);
  }

  changePassword(): void {
    console.log(this.token);
    if (this.repeatPassword.value === this.password.value) {
      this.userService.forgotPassword(this.form.getRawValue(), this.token).subscribe(value => {
        this.router.navigate(['auth/login']);
        console.log(value);
      }, error1 => {
        this.router.navigate(['error']);
      });
    }
  }
}

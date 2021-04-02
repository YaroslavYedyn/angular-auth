import {Component, OnInit} from '@angular/core';
import {ILogin, IToken} from '../../../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  message: string;
  auth: ILogin;
  token: IToken;

  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  form = new FormGroup({
    password: this.password,
    email: this.email,
  });

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.form.getRawValue()).subscribe(value => {
      this.token = value;
      this.userService.setUserId(value.user_id);
      this.router.navigate(['']);
    }, error1 => {
      this.error = error1.error;
      alert('Wrong email and password');
    });
  }

  forgot(): void {
    this.router.navigate(['auth/forgot']);
  }
}

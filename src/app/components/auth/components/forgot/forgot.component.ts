import {Component, OnInit} from '@angular/core';
import {ILogin, IToken} from '../../../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  error: any;
  message: string;

  email = new FormControl('', [Validators.required]);
  form = new FormGroup({
    email: this.email,
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  forgot(): void {
    if (this.form.valid) {
      this.userService.forgotPasswordSendEmail(this.form.getRawValue()).subscribe(value => {
        this.router.navigate(['auth/check']);
      });
    }
    if (this.form.invalid) {
      alert(`this form is ${this.form.status}`);
    }
  }
}

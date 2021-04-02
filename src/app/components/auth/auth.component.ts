import {Component, OnInit} from '@angular/core';

// @ts-ignore
import authBack from '../../image/auth-back.jpg';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services';
import {IRegister} from '../../models/IRegister';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authBack = authBack;
  user: IRegister;

  username = new FormControl('', [Validators.required, Validators.minLength(4)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  repeatPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  avatar: FormData = new FormData();
  authForm = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password,
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.password.value !== '' && this.password.value === this.repeatPassword.value) {
      this.user = {...this.authForm.getRawValue()};
      if (this.avatar[0]) {
        this.user = {...this.user, avatar: this.avatar[0]};
      }
      this.userService.createAccount(this.user).subscribe(value => {
        this.router.navigate(['auth/check']);
      }, error => {
        console.log(error);
        alert(error.message);
      });
    } else {
      alert('Passwords do not match');
    }
  }

  // handleAvatar(target: EventTarget): void {
  //   // @ts-ignore
  //   const selectedFile = target.files[0];
  //   const uploadData = new FormData();
  //   this.avatar = selectedFile;
  //   console.log(this.avatar);
  // }
}

import {Component, OnInit} from '@angular/core';

// @ts-ignore
import accountBack from '../../image/account-back.jpg';
import {UserService} from '../../services';
import {IUser} from '../../models/IUser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import defineProperty = Reflect.defineProperty;
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountBack = accountBack;
  user: IUser;
  URL = 'http://localhost:5050/';
  avatar;
  editStatus = false;

  username = new FormControl('', [Validators.minLength(4)]);
  name = new FormControl('');
  age = new FormControl('', [Validators.min(12), Validators.max(100)]);
  editForm = new FormGroup({
    username: this.username,
    name: this.name,
    age: this.age
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getSingleUser(this.userService.getUserId()).subscribe(value => {
      this.user = value;
      this.avatar = this.URL + value.avatar;
      console.log(this.avatar);
    });
  }

  handleUpdateAvatar(target: EventTarget): void {
    // @ts-ignore
    const selectedFile = target.files[0];
    const uploadData = new FormData();
    uploadData.append('upload_file', selectedFile, selectedFile.name);
    this.userService.updateUser(this.userService.getUserId(), uploadData).subscribe(value => {
      this.user = value;
      this.avatar = this.URL + value.avatar;
      console.log(this.avatar);
    });
  }

  edit(): void {
    this.userService.updateUser(this.userService.getUserId(), this.editForm.getRawValue()).subscribe(value => {
      this.user = value;
      this.avatar = this.URL + value.avatar;
      this.editStatus = !this.editStatus;
    });
  }

  remove(): void {
    this.userService.removeAccount(this.userService.getUserId()).subscribe(value => {
      this.router.navigate(['']);
    });
  }
}

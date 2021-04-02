import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  token: string;
  status: string;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.token = window.location.search.split('=')[1];
    console.log(this.token);
    this.userService.activateAccount(this.token).subscribe(value => {
      this.router.navigate(['auth/login']);
    }, error => {
      this.router.navigate(['error']);
    });
  }

}

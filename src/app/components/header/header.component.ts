import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

// @ts-ignore
import accountImg from '../../image/account.svg';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accountImg = accountImg;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigate(['auth']);
  }

  logout(): void {
    this.authService.removeTokens();
    this.router.navigate(['']);
  }
}

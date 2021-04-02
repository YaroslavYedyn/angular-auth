import {Component, OnInit} from '@angular/core';

// @ts-ignore
import homeBack from '../../image/home-back.jpg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeBack = homeBack;

  constructor() {
  }

  ngOnInit(): void {
  }

}

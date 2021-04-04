import {Component, OnInit} from '@angular/core';

// @ts-ignore
import errorBack from '../../image/error-back.jpg';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorBack = errorBack;

  constructor() {
  }

  ngOnInit(): void {
  }

}

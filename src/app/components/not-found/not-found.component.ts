import {Component, OnInit} from '@angular/core';

// @ts-ignore
import notFoundBack from '../../image/not-found-back.jpg';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  notFoundBack = notFoundBack;

  constructor() {
  }

  ngOnInit(): void {
  }

}

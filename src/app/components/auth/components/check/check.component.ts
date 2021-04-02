import {Component, OnInit} from '@angular/core';

// @ts-ignore
import checkBack from '../../../../image/check-back.jpg';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  checkBack = checkBack;

  constructor() {
  }

  ngOnInit(): void {
  }

}

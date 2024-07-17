import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ad-table',
  templateUrl: './ad-table.component.html',
  styles: [
  ]
})
export class AdTableComponent implements OnInit {

  @Input() items:Array<any> = []
  @Input() headers:Array<any> = []

  constructor() { }

  ngOnInit(): void {
  }

}

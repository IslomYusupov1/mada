import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-btn-eye',
  templateUrl: './ad-btn-eye.component.html',
  styles: [
  ]
})
export class AdBtnEyeComponent implements OnInit {

  @Input() isShow: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}

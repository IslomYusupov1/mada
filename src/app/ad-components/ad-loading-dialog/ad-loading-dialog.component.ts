import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-loading-dialog',
  templateUrl: './ad-loading-dialog.component.html',
  styles: [
  ]
})
export class AdLoadingDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get loadingCnt() {
    let col = window.localStorage.getItem('loadingCol')
    return Number(col)
  }

}

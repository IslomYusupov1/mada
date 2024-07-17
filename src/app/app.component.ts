import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MAT_DATE_FORMATS } from "@angular/material/core";

export const MY_DATE_FORMATS = {
    parse: {dateInput: 'DD.MM.YYYY',},
    display: {
      dateInput: 'DD.MM.YYYY',
      monthYearLabel: 'MM.YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MM.YYYY'
    },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AppComponent {

  title = 'physicaladmin';
  message: any = ''

  constructor(public dialog: MatDialog) {
    window.localStorage.setItem('loadingCol', '0')
  }

  ngOnInit() { }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token || ''
  }

}

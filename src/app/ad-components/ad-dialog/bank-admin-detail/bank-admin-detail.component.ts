import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-bank-admin-detail',
  templateUrl: './bank-admin-detail.component.html',
  styles: [
  ]
})
export class BankAdminDetailComponent implements OnInit {
  role:any
  @Output() detailBankAdmin = new EventEmitter<string>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      userAdminList: any
    }
  ) { }
  ngOnInit(): void {
  this.role = this.data.userAdminList.role
  }

}

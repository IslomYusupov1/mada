import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-transaction-operation-json',
  templateUrl: './transaction-operation-json.component.html',
  styles: [
  ]
})
export class TransactionOperationJsonComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{request:string , response:string , type:string}
  ) { }

  ngOnInit(): void {
  }

}

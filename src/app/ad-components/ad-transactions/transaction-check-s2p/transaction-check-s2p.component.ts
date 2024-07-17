import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transaction-check-s2p',
  templateUrl: './transaction-check-s2p.component.html',
  styleUrls: ['./transaction-check-s2p.component.scss']
})
export class TransactionCheckS2pComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TransactionCheckS2pComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any
    }
  ) { }

  ngOnInit(): void {
    console.log(this.data.info)
  }

  close() {
    this.dialogRef.close()
  }
}

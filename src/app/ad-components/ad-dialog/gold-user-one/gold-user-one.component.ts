import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-gold-user-one',
  templateUrl: './gold-user-one.component.html',
  styles: []
})
export class GoldUserOneComponent implements OnInit {
  @Output() detailGoldUser = new EventEmitter<string>()

  constructor(
    private _dialogRef: MatDialogRef<GoldUserOneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      goldUsers: any
    }
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this._dialogRef.close()
  }
}

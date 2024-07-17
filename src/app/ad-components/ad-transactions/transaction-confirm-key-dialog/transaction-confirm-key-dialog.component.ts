import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HrService} from "../../../ad-services/helper/hr.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transaction-confirm-key-dialog',
  templateUrl: './transaction-confirm-key-dialog.component.html',
  styles: [
  ]
})
export class TransactionConfirmKeyDialogComponent implements OnInit {
  @Output() onConfirm = new EventEmitter<any>()
  key: string = 'aniq'
  keyInput: string = ''

  constructor(
    private dialogRef: MatDialogRef<TransactionConfirmKeyDialogComponent>,
    private hrService: HrService
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    if (this.keyInput === this.key) {
      this.onConfirm.emit()
    }
    else {
      this.hrService.showMessage(false, 'Неправильный ключ!')
    }
  }

  close() {
    this.dialogRef.close()
  }
}

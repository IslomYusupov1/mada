import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {HrService} from "../../../ad-services/helper/hr.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";

@Component({
  selector: 'app-deposit-open-check-dialog',
  templateUrl: './deposit-open-check-dialog.component.html',
  styleUrls: ['./deposit-open-check-dialog.component.scss']
})
export class DepositOpenCheckDialogComponent implements OnInit {
  @Output() onTry: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private hrService: HrService,
    private dialogRef: MatDialogRef<DepositOpenCheckDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any,
      id: number
    }
  ) {
  }

  ngOnInit(): void {

  }

  openTry(): void {
    this.userService.depositOpenTry(this.data.id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message)
        this.onTry.emit()
      }
    })
  }

  setDepositStatus(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'Активный';
      case 'BLOCKED':
        return 'Заблокирован';
      default:
        return '???'
    }
  }



  close(): void {
    this.dialogRef.close()
  }
}

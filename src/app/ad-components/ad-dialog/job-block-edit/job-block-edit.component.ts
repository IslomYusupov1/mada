import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {UserService} from "../../../ad-services/user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-job-block-edit',
  templateUrl: './job-block-edit.component.html',
  styleUrls: ['./job-block-edit.component.scss']
})
export class JobBlockEditComponent implements OnInit {
  @Output() editJobBlock = new EventEmitter<string>()
  editFormJob: FormGroup = new FormGroup({
    startTime: new FormControl(this.data.items.startTime),
    endTime: new FormControl(this.data.items.endTime),
    type: new FormControl(this.data.items.type),
    description: new FormControl(this.data.items.description),
    alwaysOn: new FormControl(this.data.items.alwaysOn),
  })

  constructor(
    private dialog: MatDialog,
    private hr: HrService,
    private user: UserService,
    private dialogRef: MatDialogRef<JobBlockEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      items: {
        alwaysOn: boolean,
        startTime: string,
        endTime: string,
        description: string,
        type: string,
      }
    }
  ) {
  }

  ngOnInit(): void {
    console.log(this.data.items)
  }

  closeDialog() {
    this.dialogRef.close()

  }

  formSubmit() {
    if (this.editFormJob.valid) {
      this.user.jobBlockEdit(this.editFormJob.value).then((res: any) => {
        if (res) {
          this.hr.showMessage(true, 'Успешно')
          this.editJobBlock.emit()
        }
      })
    }
  }
}

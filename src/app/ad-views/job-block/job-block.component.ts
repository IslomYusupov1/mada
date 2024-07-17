import {Component, OnInit} from '@angular/core';
import {UserService} from "../../ad-services/user.service";
import {unwatchFile} from "fs";
import {PensionEditComponent} from "../marketing/pension-edit/pension-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {JobBlockEditComponent} from "../../ad-components/ad-dialog/job-block-edit/job-block-edit.component";

@Component({
  selector: 'app-job-block',
  templateUrl: './job-block.component.html',
  styleUrls: ['./job-block.component.scss']
})
export class JobBlockComponent implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false

  constructor(
    private user: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.user.getJobBlockList().then((res: any) => {
      this.dataList = res
    })
  }

  openDialogEdit(type: string) {
    this.user.getOneJobBlock(type).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(JobBlockEditComponent, {
          maxWidth: '600px',
          width: '600px',
          data: {
            items:res
          }
        });
        dialogRef.componentInstance.editJobBlock.subscribe(() => {
          dialogRef.close()
          this.getList()
        })

      }
    })
  }
}

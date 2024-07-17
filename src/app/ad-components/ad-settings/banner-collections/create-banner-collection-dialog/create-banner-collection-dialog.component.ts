import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-create-banner-collection-dialog',
  templateUrl: './create-banner-collection-dialog.component.html',
  styleUrls: ['./create-banner-collection-dialog.component.scss']
})
export class CreateBannerCollectionDialogComponent implements OnInit {
  @Output() onCreate = new EventEmitter<string>()

  createForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    collectionType:new FormControl('',Validators.required)
  })

  constructor(
    private dialogRef: MatDialogRef<CreateBannerCollectionDialogComponent>,
    private dialog: MatDialog,
    private bannerService: BannerService,
    @Inject(MAT_DIALOG_DATA) public data: {type: Array<any>}
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  create() {
    if (this.createForm.valid) {
      this.bannerService.bannerCollectionAdd(this.createForm.value).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Коллекция баннеров успешно добавлена!')
          this.onCreate.emit()
        }
      })
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}

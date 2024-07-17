import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-edit-banner-collection-dialog',
  templateUrl: './edit-banner-collection-dialog.component.html',
  styleUrls: ['./edit-banner-collection-dialog.component.scss']
})
export class EditBannerCollectionDialogComponent implements OnInit {
  @Output() onEdit = new EventEmitter<string>()

  editForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private bannerService: BannerService,
    private dialogRef: MatDialogRef<EditBannerCollectionDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: string,
      title: string,
      typeList: Array<any>,
      description: string
    }
  ) { }

  ngOnInit(): void {
    this.editForm.patchValue({
      title: this.data.title,
      description: this.data.description,
    })
  }

  edit() {
    if (this.editForm.valid) {
      this.bannerService.bannerCollectionUpdate({
        id: this.data.id,
        title: this.editForm.value.title,
        description: this.editForm.value.description
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Коллекция баннеров успешно изменена!')
          this.onEdit.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}

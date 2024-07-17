import { Component, OnInit } from '@angular/core';
import {BannerService} from "../../../ad-services/settings/banner.service";
import {MatDialog} from "@angular/material/dialog";
import {LogSettingsEditComponent} from "./log-settings-edit/log-settings-edit.component";

@Component({
  selector: 'app-log-settings',
  templateUrl: './log-settings.component.html',
  styles: [
  ]
})
export class LogSettingsComponent implements OnInit {
  dataList: Array<any> = [];
  loadingList: boolean = false

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.bannerService.logSettingsGet().then((res: any) => {
      if (res) {
        this.dataList = res
        this.loadingList = false
      } else {
        this.loadingList = false
      }
    })
  }

  openEditDialog(item: any): void {
    let dialogRef = this.dialog.open(LogSettingsEditComponent, {
      width: '400px',
      maxWidth: '400px',
      maxHeight: '700px',
      data: {
        info: item
      }
    })
    dialogRef.componentInstance.onEdit.subscribe(()=>{
      dialogRef.close()
      this.getData()
    })
  }
}

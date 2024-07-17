import { Component, OnInit } from '@angular/core';
import {BannerService} from "../../../ad-services/settings/banner.service";
import {MatDialog} from "@angular/material/dialog";
import {MarketSettingsEditComponent} from "./market-settings-edit/market-settings-edit.component";

@Component({
  selector: 'app-market-settings',
  templateUrl: './market-settings.component.html',
  styleUrls: ['./market-settings.component.scss']
})
export class MarketSettingsComponent implements OnInit {
  dataList: any;
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
    this.bannerService.marketplaceOnGet().then((res: any) => {
      if (res) {
        this.dataList = res
        this.loadingList = false
      } else {
        this.loadingList = false
      }
    })
  }

  openEditDialog(): void {
    let dialogRef = this.dialog.open(MarketSettingsEditComponent, {
      width: '500px',
      maxWidth: '500px',
      maxHeight: '700px',
      data: {
        info: this.dataList
      }
    })
    dialogRef.componentInstance.onEdit.subscribe(()=>{
      dialogRef.close()
      this.getData()
    })
  }
}

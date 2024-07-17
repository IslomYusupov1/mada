import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../ad-services/search.service";
import {AdAgreeDialogComponent} from "../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../ad-services/helper/hr.service";
import {CreateAdminComponent} from "../../ad-components/ad-dialog/create-admin/create-admin.component";
import {SearchAddComponent} from "../../ad-components/ad-settings/search-add/search-add.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedElements: Array<any> = []
  noImage: string = './assets/images/no-image-icon-0.png'

  constructor(
    private search: SearchService,
    private dialog: MatDialog,
    private hrService: HrService
  ) {
  }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.search.searchGetList().then((res: any) => {
      this.searchedElements = res.list
    })
  }

  createDialogSearch(type: string) {
    if (type === 'add') {
      this.search.searchTypeList().then((res: any) => {
        let dialogRef = this.dialog.open(SearchAddComponent, {
          maxWidth: '600px',
          width: '600px',
          data: {
            type: res.searchType,
            addOrId:'add'
          }
        });
        dialogRef.componentInstance.createSearch.subscribe(() => {
          dialogRef.close()
          this.getList()
        })
      })
    } else {
      this.search.searchGetOne(type).then((response: any) => {
          let dialogRef = this.dialog.open(SearchAddComponent, {
            maxWidth: '600px',
            width: '600px',
            data: {
              data: response,
              addOrId:'edit'
            }
          });
          dialogRef.componentInstance.createSearch.subscribe(() => {
            dialogRef.close()
            this.getList()
          })

      })
    }
  }

  searchDelete(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите удалить ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.delete(id)
    })
  }

  delete(id: string) {
    this.search.searchDelete(id).then(res => {
      if (res) {
        this.hrService.showMessage(true, 'успешно удален')
        this.getList()
      }
    })
  }
}

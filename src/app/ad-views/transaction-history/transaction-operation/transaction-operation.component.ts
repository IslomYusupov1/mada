import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateAdminComponent} from "../../../ad-components/ad-dialog/create-admin/create-admin.component";
import {
  TransactionOperationJsonComponent
} from "../../../ad-components/ad-dialog/transaction-operation-json/transaction-operation-json.component";

@Component({
  selector: 'app-transaction-operation',
  templateUrl: './transaction-operation.component.html',
  styles: [
  ]
})
export class TransactionOperationComponent implements OnInit {
  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  constructor(
    private route:ActivatedRoute,
    private _user:UserService,
    private _dialog:MatDialog
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((q) => {
      console.log(q)
      this.getList(q.id)
    })
  }
  getList(operationId:number){
    this._user.operationTransactionList(operationId).then((res)=>{
      if (res){
        this.dataList = res.operationTransactionInfoList
      }
    })
  }
  openJsonDialog(request:string,response:string,type:string){
    this._dialog.open(TransactionOperationJsonComponent, {
      height:'800px',
        data: {
          request: request,
          response:response,
          type:type
        }
      })
  }
}

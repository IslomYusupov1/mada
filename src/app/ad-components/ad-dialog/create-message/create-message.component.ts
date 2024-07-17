import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {PointService} from "../../../ad-services/point.service";

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styles: []
})
export class CreateMessageComponent implements OnInit {
  @Output() createIssueMessage = new EventEmitter<string>();
  createMessageForm: FormGroup = new FormGroup({
    key: new FormControl('', []),
    lang: new FormControl('', []),
    message: new FormControl('', []),
  })
  constructor(
    public dialogCreateMessage: MatDialogRef<CreateMessageComponent>,
    public dialog: MatDialog,
    private pointService:PointService
  ) {
  }
  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  lang: Array<any> = [
    {name: "UZ" , value:"UZB"}, {name: "RU", value:"RUS"}, {name: "EN", value:"ENG"}, {name: "KAA", value:"KAA"}
  ]

  ngOnInit(): void {
  }
  createMessage() {
    if (this.createMessageForm.valid) {
      this.pointService.messageAdd(this.createMessageForm.value).then((res:any)=>{
     if (res){
       this.createIssueMessage.emit();
       this.showMessage(true, 'Успешно добавлен')
     }
      }).catch(error=>{
        console.log(error)
      })
    }
  }



  cancel() {
    this.dialogCreateMessage.close()
  }

}

import {Component, OnInit, EventEmitter, Output, Inject, ViewChild, ElementRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styles: []
})
export class SendSmsComponent implements OnInit {
  userValue: any
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @Output() sendSMS = new EventEmitter<string>();
  sendForm: FormGroup = new FormGroup({
    userIdList: new FormControl(''),
    smsId: new FormControl(this.data.id)
  })
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  filteredUsers!: Observable<any>;
  users: Array<any> = [];
  userList: Array<any> = []

  constructor(
    public dialogSend: MatDialogRef<SendSmsComponent>,
    private userService: UserService,
    protected dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: string
      userList: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
  }

  formSubmit() {
    let userIds = this.users.map((res: any) => res.userId)
    if (userIds && userIds.length > 0) {
      this.userService.sentSmsToOneUser({
        userIdList: userIds,
        smsId: this.data.id
      }).then((res: any) => {
        if (res) {
          this.sendSMS.emit()
          this.showMessage(true, 'Успешно отправлено')
        }
      })
    } else {
      this.showMessage(false, 'Выберите пользователя для отправки сообщения')
    }
  }

  closeDialog() {
    this.dialogSend.close()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.users.push(value);
    }
    event.chipInput!.clear();
    this.userCtrl.setValue(null);
  }

  logger(event: any) {
    if (event.target.value.length >= 4) {
      setTimeout(() => {
        this.userService.getUserListForNotification(event.target.value).then((res: any) => {
          if (res) {
            this.userList.concat(res)
            this.filteredUsers = this.userCtrl.valueChanges.pipe(
              startWith(null),
              map((phone: string | null) => (phone ? this._filter(phone) : res.slice()))
            )
          }
        })
      }, 500)
    }
  }

  remove(user: any): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.value);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value

    return this.userList.filter((res: any) => res.phone.includes(filterValue));
  }

  idsList(event: any) {
    this.userValue = event.value
  }
}

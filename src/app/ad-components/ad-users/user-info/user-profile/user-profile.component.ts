import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input('id') userID!: string;
  @Input('passport') passport!: any;
  isPassport: boolean = false

  constructor() {
  }

  ngOnInit(): void {
    this.isPassport = !!this.passport.docData;
  }


}

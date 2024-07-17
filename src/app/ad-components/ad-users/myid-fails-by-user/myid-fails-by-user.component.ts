import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-myid-fails-by-user',
  templateUrl: './myid-fails-by-user.component.html',
  styleUrls: ['./myid-fails-by-user.component.scss']
})
export class MyidFailsByUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {list: Array<any>}
  ) { }

  ngOnInit(): void {
    console.log(this.data.list)
  }

}

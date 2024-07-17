import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ad-status-dialog',
  templateUrl: './ad-status-dialog.component.html',
  styles: [
  ]
})
export class AdStatusDialogComponent implements OnInit {

  @Output() onSaveTemplate = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<AdStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: '', description: '', status: true, list: Array<any> },
    public dialog: MatDialog,
    protected router: Router
  ) { }

  ngOnInit(): void {}

  handleClick(item: any) {
    if (item.type === 'close') {
      this.dialogRef.close()
    } else if (item.type === 'onSaveTemplate') {
      this.onSaveTemplate.emit();
    } else if (item.type === 'link') {
      this.router.navigate([item.link]).then(() => {
        this.dialogRef.close()
      });
    }
  }

}

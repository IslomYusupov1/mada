import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-detail-virtual-card-dialog',
  templateUrl: './detail-virtual-card-dialog.component.html',
  styles: [`
    .ordered-card {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px;
        border-bottom: 1px solid #ababab;

        span:first-child {
          font-size: 14px;
          color: #191C1A;
          font-weight: 400;
        }

        span:last-child {
          font-size: 16px;
          color: #3F6D5B;
          font-weight: 500;
        }
      }
    }
  `]
})
export class DetailVirtualCardDialogComponent implements OnInit {
  @Output() detail = new EventEmitter<void>()

  constructor(
    private dialogRef: MatDialogRef<DetailVirtualCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      description:string
      name:string
      nameEng:string
      nameKaa: string
      nameRu:string
      nameUz:string
      descriptionEng:string
      descriptionKaa: string
      descriptionRu:string
      descriptionUz:string
      order: number
      uuid: string
    }
  ) {
  }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close()
  }

}

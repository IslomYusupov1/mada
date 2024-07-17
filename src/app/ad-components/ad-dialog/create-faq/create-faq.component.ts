import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {FaqService} from "../../../ad-services/faq.service";

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styles: [
  ]
})
export class CreateFaqComponent implements OnInit {
  @Output() onCreateFaq = new EventEmitter<string>()
  parent: any;

  faqCreateForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private _faqService: FaqService,
    private dialogRef: MatDialogRef<CreateFaqComponent>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      console.log(q)
      if (q.id) {
        this.parent = q.id
      } else {
        this.parent = null
      }
    })
  }

  close() {
    this.dialogRef.close()
  }

  createFaq() {
    if (this.faqCreateForm.valid) {
      this._faqService.createFaq(this.parent, this.faqCreateForm.value.text).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Faq успешно создана')
          this.onCreateFaq.emit()
        }
      })
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}

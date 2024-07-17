import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../ad-services/auth.service";
import {Router} from "@angular/router";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
@Component({
  selector: 'app-create-offer2',
  templateUrl: './create-offer2.component.html',
  styles: [
  ]
})
export class CreateOffer2Component implements OnInit {
  types: Array<{Type:string}> = []
  public Editor = DecoupledEditor;
  htmlContent: string = ""
  offerForm: FormGroup = new FormGroup({
    name: new FormControl('', []),
    contentUz: new FormControl('', Validators.required),
    contentRu: new FormControl(''),
    contentEn: new FormControl(''),
    contentKa: new FormControl(''),
    contentKr: new FormControl(''),
    type: new FormControl('', []),
  })
  constructor(
    private authService: AuthService,
    public router: Router,
    private dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }


  ngOnInit(): void {
    this.getTypeList()
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  getTypeList() {
    this.authService.getTypeOfferList2().then((res: any) => {
      if (res) {
        this.types = res.data
      }
    })
  }

  formSubmit() {
    if (this.offerForm.valid) {
      this.authService.createOffer2({
        name: this.offerForm.value.name,
        contents: [
          {
            lang: 'UZB',
            content: this.offerForm.value.contentUz
          },
          {
            lang: 'RUS',
            content: this.offerForm.value.contentRu
          },
          {
            lang: 'ENG',
            content: this.offerForm.value.contentEn
          },
          {
            lang: 'KAA',
            content: this.offerForm.value.contentKa
          },
          {
            lang: 'KRL',
            content: this.offerForm.value.contentKr
          }
        ],
        type: this.offerForm.value.type
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Успешно создан')
          this.router.navigate(['settings/offer2']).then()
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

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

}

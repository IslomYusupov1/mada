import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../ad-services/auth.service";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {forEach} from "@angular-devkit/schematics";

@Component({
  selector: 'app-edit-offer2',
  templateUrl: './edit-offer2.component.html',
  styles: []
})
export class EditOffer2Component implements OnInit {
  id: string = ''
  public Editor = DecoupledEditor;
  types: Array<{ Type: string }> = []
  editOfferForm: FormGroup = new FormGroup({
    uuid: new FormControl(''),
    state: new FormControl('ACTIVE'),
    name: new FormControl('', []),
    contentUz: new FormControl('', Validators.required),
    contentRu: new FormControl(''),
    contentEn: new FormControl(''),
    contentKa: new FormControl(''),
    contentKr: new FormControl(''),
    type: new FormControl('', []),
  })

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getOne()
    this.getTypeList()

  }

  getOne() {
    this.authService.getOneOffer(this.id).then((res: any) => {
      if (res.body.data) {
        res.body.data.contents.forEach((key: any) => {
          if (key.lang) {
            if (key.lang === 'UZB') {
              this.editOfferForm.patchValue({
                contentUz: key.content
              })
            } else if (key.lang === 'RUS') {
              this.editOfferForm.patchValue({
                contentRu: key.content
              })
            } else if (key.lang === 'ENG') {
              this.editOfferForm.patchValue({
                contentEn: key.content
              })
            } else if (key.lang === 'KAA') {
              this.editOfferForm.patchValue({
                contentKa: key.content
              })
            } else if (key.lang === 'KRL') {
              this.editOfferForm.patchValue({
                contentKr: key.content
              })
            }
          } else return
        })
        this.editOfferForm.patchValue({
          type: res.body.data.type,
          name: res.body.data.name
        })
      }
    })
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
    if (this.editOfferForm.valid) {
      this.authService.editOffer2({
        uuid: this.id,
        name: this.editOfferForm.value.name,
        type: this.editOfferForm.value.type,
        state: this.editOfferForm.value.state,
        contents: [
          {
            lang: 'UZB',
            content: this.editOfferForm.value.contentUz
          },
          {
            lang: 'RUS',
            content: this.editOfferForm.value.contentRu
          },
          {
            lang: 'ENG',
            content: this.editOfferForm.value.contentEn
          },
          {
            lang: 'KAA',
            content: this.editOfferForm.value.contentKa
          },
          {
            lang: 'KRL',
            content: this.editOfferForm.value.contentKr
          }
        ],

      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Успешно редактирован')
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

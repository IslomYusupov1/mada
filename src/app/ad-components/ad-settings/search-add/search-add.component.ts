import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {SearchService} from "../../../ad-services/search.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-search-add',
  templateUrl: './search-add.component.html',
  styleUrls: ['./search-add.component.scss']
})
export class SearchAddComponent implements OnInit {
  @Output() createSearch = new EventEmitter<string>()
  disabled: boolean = true
  addForm: boolean = false
  editForm: boolean = false
  services: Array<any> = []
  searchCreateForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    serviceId: new FormControl(''),
    tags: new FormControl('')
  })
  searchEditForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    tags: new FormControl('')
  })

  constructor(
    private dialog: MatDialog,
    private search: SearchService,
    private hrService: HrService,
    private createDialog: MatDialogRef<SearchAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: Array<any>
      addOrId: string
      data: any
    }
  ) {
  }

  ngOnInit() {
    if (this.data.addOrId === 'add') {
      this.addForm = true
      this.editForm = false
    } else {
      this.editForm = true
      this.addForm = false
      this.searchEditForm.patchValue({
        id: this.data.data.id,
        tags: this.data.data.tags
      })
    }
  }

  service(event: any) {
    if (event.value) {
      this.services = []
      this.search.searchServiceList(event.value).then((res: any) => {
        if (res.list) {
          this.services = res.list
          this.disabled = false
        }
      })
    } else {
      this.disabled = true
    }
  }

  closeDialog() {
    this.createDialog.close()
  }

  formSubmit(type: string) {
    if (type === 'add') {
      if (this.searchCreateForm.valid) {
        this.search.searchAdd(this.searchCreateForm.value).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, 'Успешно добавлена')
            this.createSearch.emit()
          }
        })
      }
    } else {
      if (this.searchEditForm.valid) {
        this.search.searchEdit(this.searchEditForm.value).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, 'Успешно изменено')
            this.createSearch.emit()
          }
        })
      }
    }
  }
}

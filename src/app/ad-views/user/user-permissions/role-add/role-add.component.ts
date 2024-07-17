import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styles: [
  ]
})
export class RoleAddComponent implements OnInit {
  @ViewChild('search') searchTextBox!: ElementRef;
  @Output() onCreateRole = new EventEmitter<string>();
  permissions = new FormControl('');
  searchTextBoxControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  selectedValues: Array<any> = [];
  createRoleForm: FormGroup = new FormGroup({
    displayName: new FormControl(''),
    name: new FormControl(''),
    defaultUrl: new FormControl('')
  })
  constructor(
    private dialogRole: MatDialogRef<RoleAddComponent>,
    private userService:UserService,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      roles: Array<any>
    },
  ) {

  }

  ngOnInit(): void {
    this.filteredOptions = this.searchTextBoxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  closeDialog() {
    this.dialogRole.close()
  }

  formSubmit(){
    if (this.createRoleForm.valid){
      this.userService.createRole({
        displayName: this.createRoleForm.value.displayName,
        name: this.createRoleForm.value.name,
        defaultUrl: this.createRoleForm.value.defaultUrl,
        permissions: this.permissions.value,
      }).then((res:any)=>{
        if (res){
          this.showMessage(true,'Успешно')
          this.onCreateRole.emit()
        }
      })
    }
  }

  private _filter(search: string): String[] {
    const filterValue = search.toLowerCase();
    // Set selected values to retain the selected checkbox state
    this.setSelectedValues();
    this.permissions.patchValue(this.selectedValues);
    return this.data.roles.filter((item) => {
      const name = item.name.toLowerCase();
      const displayName = item.displayName.toLowerCase()
      return name.includes(filterValue) || displayName.includes(filterValue);
    });
  }

  selectionChange(event: any) {
    if (event.isUserInput && event.source.selected == false) {
      // @ts-ignore
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }

  setSelectedValues() {
    if (this.permissions.value && this.permissions.value.length > 0) {
      this.permissions.value.forEach((item: any) => {
        // @ts-ignore
        if (this.selectedValues.indexOf(item) === -1) {
          // @ts-ignore
          this.selectedValues.push(item);
        }
      });
    }
  }

  onOpenChange(searchInput: any) {
    this.searchTextBoxControl.patchValue('');

    if (searchInput == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  clearSearch(event: any) {
    event.stopPropagation();
    this.searchTextBoxControl.patchValue('');
  }
}

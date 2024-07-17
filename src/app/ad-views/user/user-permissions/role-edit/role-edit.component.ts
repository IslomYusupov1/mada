import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styles: []
})
export class RoleEditComponent implements OnInit {
  @ViewChild('search') searchTextBox!: ElementRef;
  @Output() onEditPermission = new EventEmitter<string>();

  permissionArray: Array<any> = []
  permissions = new FormControl('');
  searchTextBoxControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  selectedValues: Array<any> = [];
  editRolePermission: FormGroup = new FormGroup({
    displayName: new FormControl(this.data.displayName),
    name: new FormControl(this.data.name),
    defaultUrl: new FormControl(this.data.defaultUrl),
  })

  constructor(
    private fb: FormBuilder,
    private dialogPermission: MatDialogRef<RoleEditComponent>,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string,
      displayName: string,
      defaultUrl: string,
      permissions: Array<any>
      id: number,
      permissionTypes: Array<any>
    },
  ) {
  }

  ngOnInit(): void {
    this.data.permissions.forEach((el) => {
      this.permissionArray.push(el.id)
    })
    this.permissions.setValue(this.permissionArray)
    this.filteredOptions = this.searchTextBoxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }

  private _filter(search: string): String[] {
    const filterValue = search.toLowerCase();
    // Set selected values to retain the selected checkbox state
    this.setSelectedValues();
    this.permissions.patchValue(this.selectedValues);
    return this.data.permissionTypes.filter((item) => {
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

  closeDialog() {
    this.dialogPermission.close()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  formSubmit() {
    if (this.editRolePermission.valid && this.permissions) {
      this.userService.editRole({
        displayName: this.editRolePermission.value.displayName,
        name: this.editRolePermission.value.name,
        defaultUrl: this.editRolePermission.value.defaultUrl,
        permissions: this.permissions.value,
        id: this.data.id
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Успешно')
          this.onEditPermission.emit()
        }
      })
    }
  }

}

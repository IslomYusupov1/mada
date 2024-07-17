import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-loans',
  templateUrl: './products-loans.component.html',
  styles: []
})
export class ProductsLoansComponent implements OnInit {
  @ViewChild('microloan') microloan?: ElementRef
  loanList: Array<any> = [
    {id: 'microloan', text: 'Mikroqarz', value: 'MICROLOAN'},
    {id: 'ipoteka', text: 'Ipoteka krediti', value: 'IPOTEKA'},
    {id: 'consumption', text: 'Iste\'mol krediti', value: 'CONSUMPTION'},
    {id: 'overdraft', text: 'Overdraft krediti', value: 'OVERDRAFT'},
  ]

  constructor(
    private router: Router,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
    setTimeout(() => {
      document.getElementById('microloan')?.click()
    }, 0)

  }

  ngOnInit(): void {

  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}

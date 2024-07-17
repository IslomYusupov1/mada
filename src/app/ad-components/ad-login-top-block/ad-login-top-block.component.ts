import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../ad-services/auth.service";

@Component({
  selector: 'app-ad-login-top-block',
  templateUrl: './ad-login-top-block.component.html',
  styles: []
})
export class AdLoginTopBlockComponent implements OnInit {
  firstname: string = ''
  lastname: string = ''

  constructor(
    protected authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getLastFirstName()
  }

  getLastFirstName() {
    const userInfo: any = localStorage.getItem('userdata')
    const parse = JSON.parse(userInfo)
    this.firstname = parse.firstName ? parse.firstName : ''
    this.lastname = parse.lastName ? parse.lastName : ''
    console.log(this.firstname , this.lastname)
  }

  logout() {
    this.authService.logout()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token || ''
  }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../ad-services/user.service";

@Component({
  selector: 'app-user-client-info',
  templateUrl: './user-client-info.component.html',
  styleUrls: ['./user-client-info.component.scss']
})
export class UserClientInfoComponent implements OnInit {
  userId: string = ''
  passportData: any = {}
  loading: boolean = true
  data: any = {}
  currentTab: string = ''
  tabs: Array<any> = [
    {value: 'profile', name: 'Профиль', active: true},
    {value: 'cards', name: 'Карты', active: false},
    {value: 'wallet', name: 'Кошелек', active: false},
    {value: 'deposits', name: 'Вклады', active: false},
    {value: 'loans', name: 'Кредиты', active: false}
  ]

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      if (q.id) {
        this.userId = q.id
        this.getData()
      }
    })
  }

  getData() {
    this.loading = true
    this.userService.userClientGetOne(this.userId).then((res: any) => {
      if (res) {
        this.data = res
        if (!this.data.avatarPath || this.data.avatarPath === '') {
          this.data['avatarPath'] = res.gender === 'FEMALE' ? './assets/images/female.png' : './assets/images/male.png'
        }
        this.passportData = res.passport
        this.currentTab = 'profile'
        this.loading = false
      }
    })
  }

  openTabContent(item: string) {
    if (this.currentTab !== item) {
      this.currentTab = item
      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].active = this.tabs[i].value === item;
      }
    }
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}

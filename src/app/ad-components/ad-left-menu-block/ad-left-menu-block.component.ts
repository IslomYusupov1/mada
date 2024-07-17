import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-ad-left-menu-block',
  templateUrl: './ad-left-menu-block.component.html',
  styles: []
})
export class AdLeftMenuBlockComponent implements OnInit {

  miniVariant: Boolean = true
  menuList: Array<any> = [
    {
      title: 'Главный экран',
      icon: 'home.svg',
      icon2: 'home-active.svg',
      link: '/dashboard',
      permission: 'PAGE_HOME',
    },
    {
      title: 'Оплата',
      icon: 'wallet.svg',
      icon2: 'wallet-active.svg',
      permission: 'PAGE_PAYMENT',
      list: [
        {
          title: 'Настройки пайнет',
          icon: 'paynet.svg',
          icon2: 'paynet-active.svg',
          link: '/paynet/categories',
          permission: 'CATEGORY_LIST_PAYMENT'
        },
      ]
    },
    {
      title: 'Гос. услуги',
      icon: 'government.svg',
      icon2: 'government-active.svg',
      link: '/state',
      permission: 'SERVICE_HISTORY_STATE',
      list: [
        // {
        //   title: 'Мониторинг',
        //   icon: 'checklist.svg',
        //   icon2: 'checklist-active.svg',
        //   link: '/state/monitoring',
        //   permission: 'SERVICE_HISTORY_STATE'
        // },
        {
          title: 'Настройки гос.услуги',
          icon: 'settings.svg',
          icon2: 'settings-active.svg',
          link: '/government-settings/categories',
          permission: 'CATEGORY_LIST_STATE'
        },
      ]
    },
    {
      title: 'Переводы',
      icon: 'arrows-left-right.svg',
      icon2: 'arrows-left-right-active.svg',
      link: '/transfers',
      permission: 'PAGE_TRANSACTION',
      list: [
        {
          title: 'Список переводов',
          icon: 'checklist.svg',
          icon2: 'checklist-active.svg',
          link: '/transaction/history',
          permission: 'HISTORY_TRANSACTION'
        },
        {
          title: 'Международные переводы',
          icon: 'checklist.svg',
          icon2: 'checklist-active.svg',
          link: '/international/transfers',
          permission: 'IMT_GET_HISTORY'
        },
        {
          title: 'Реестр погашения кредита',
          icon: 'checklist.svg',
          icon2: 'checklist-active.svg',
          link: '/loan/repayment/history',
          permission: 'LOAN_REDEMPTION_REGISTER'
        },
        {
          title: 'История кэшбэков',
          icon: 'report.svg',
          icon2: 'report-active.svg',
          link: '/cashback/history',
          permission: 'CASHBACK_HISTORY_PAGING'
        },
        {
          title: 'История ставок кэшбэка',
          icon: 'report.svg',
          icon2: 'report-active.svg',
          link: '/cashback/rate/history',
          permission: 'CASHBACK_RATE_HISTORY_PAGING'
        },
        {
          title: 'Переводы для подтверждения',
          icon: 'report.svg',
          icon2: 'report-active.svg',
          link: '/transaction-confirm',
          permission: 'TRANSACTION_PREPARE_LIST'
        },
        {
          title: 'Отчеты по переводам',
          icon: 'report-analytics.svg',
          icon2: 'report-analytics-active.svg',
          link: '/transfers/reports',
          permission: 'HISTORY_TRANSACTION'
        },
      ]
    },
    {
      title: 'Пользователи',
      icon: 'users.svg',
      icon2: 'users-active.svg',
      link: '/user/list',
      permission: 'PAGE_USERS',
      list: [
        {
          title: 'Клиенты банка',
          icon: 'user.svg',
          icon2: 'user-active.svg',
          link: '/user/clients',
          permission: 'FILTER_USER_INFO'
        },
        {
          title: 'Клиенты через промокод',
          icon: 'user.svg',
          icon2: 'user-active.svg',
          link: '/user/promo-code-clients',
          permission: 'ACTIVATED_PROMO_CODE_FILTER'
        },
        {
          title: 'Сотрудники банка',
          icon: 'tie.svg',
          icon2: 'tie-active.svg',
          link: '/user/employees',
          permission: 'LIST_ADMIN_USER'
        },
        {
          title: 'Список сбоев MyID пользователей',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/user/myid/fail',
          permission: 'MY_ID_FAIL_LIST_USER_INFO'
        },
        {
          title: 'Список VIP клиентов',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/user/vip-clients',
          permission: 'VIP_USER_GET_LIST'
        },
        {
          title: 'Права и доступы',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/user/access',
          permission: 'GET_ROLE_PAGINATION'
        },
        {
          title: 'Банковские лимиты',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/user/bank/limits',
          permission: 'BANK_TRANSACTION_LIMIT_GET'
        },
        {
          title: 'Черный список iABS',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/user/blacklist',
          permission: 'CHECK_AML_APPLICATION_LIST'
        },
        {
          title: 'GOLD пользователи',
          icon: 'gold-coin.svg',
          icon2: 'gold-coin.svg',
          link: '/user/gold-users',
          permission: 'CHECK_AML_APPLICATION_LIST'
        },
      ]
    },
    {
      title: 'Продукты',
      icon: 'shopping-cart.svg',
      icon2: 'shopping-cart-active.svg',
      link: '/products/list',
      permission: 'PAGE_PRODUCTS',
      list: [
        {
          title: 'Депозиты',
          icon: 'moneybag.svg',
          icon2: 'moneybag-active.svg',
          link: '/products/deposits',
          permission: 'FILTER_BY_PAGINATION_PRODUCT_DEPOSIT'
        },
        {
          title: 'Пластиковые карты',
          icon: 'creditcard.svg',
          icon2: 'creditcard-active.svg',
          link: '/products/cards',
          permission: 'FILTER_BY_PAGINATION_PRODUCT_CARD'
        },
        {
          title: 'Виртуальные карты',
          icon: 'creditcard.svg',
          icon2: 'creditcard-active.svg',
          link: '/products/virtual-cards',
          permission: 'GET_ORDER_VIRTUAL_CARD_LIST'
        },
        {
          title: 'Заказанные карты',
          icon: 'card-import.svg',
          icon2: 'card-import-active.svg',
          link: '/marketing/ordered-cards',
          permission: 'GET_ORDER_CARD_LIST'
        },
        {
          title: 'Заказанные виртуальные карты',
          icon: 'card-import.svg',
          icon2: 'card-import-active.svg',
          link: '/marketing/ordered-virtual-cards',
          permission: 'GET_ORDER_VIRTUAL_CARD_LIST'
        },
        {
          title: 'Счета',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/product/accounts',
          permission: 'GET_PRODUCT_ACCOUNT'
        },
      ]
    },
    {
      title: 'Кредиты',
      icon: 'wallet-credit-card.svg',
      icon2: 'wallet-credit-card-active.svg',
      link: '/products/list',
      permission: 'PAGE_CREDIT',
      list: [
        {
          title: 'Кредиты',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/products/loans',
          permission: 'TYPE_GET_PRODUCT_LOAN'
        },
        {
          title: 'Заявка на кредит',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/products/loans/app',
          permission: 'LOAN_APPLICATION_LIST'
        },
        {
          title: 'Заявки на обработку',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/products/loan-app/process',
          permission: 'FOLDER_PROCESSING_LIST'
        },
        {
          title: 'Кредитный портфель',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/loan/portfolio',
          permission: 'FOLDER_LOAN_LIST'
        },

        {
          title: 'Заявки (call-center)',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/application/review',
          permission: 'APPLICATION_REVIEW_GET'
        },
        {
          title: 'Заявки на кредит (call-center)',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/application/loan',
          permission: 'LOAN_APPLICATION_PROCESS_LIST'
        },
        {
          title: 'Список страховых полисов',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/insurance-list',
          permission: 'TYPE_GET_PRODUCT_LOAN'
        },
        {
          title: 'Черный список (кредит)',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/loan/blacklist',
          permission: 'BLACK_LIST_FILTER'
        },
      ]
    },
    {
      title: 'Настройки',
      icon: 'settings.svg',
      icon2: 'settings-active.svg',
      link: '/settings',
      permission: 'PAGE_SETTINGS',
      list: [
        {
          title: 'Комиссия за транзакцию',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/offer',
          permission: 'DOCUMENT_LIST_FILTER'
        },
        {
          title: 'Оферта',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/offer2',
          permission: 'DOCUMENT_LIST_FILTER'
        },
        {
          title: 'Баннеры',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/banner-collections',
          permission: 'GET_BANNER_COLLECTION_LIST'
        },
        {
          title: 'Все сообщения',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/message/v2',
          permission: 'GET_LIST_MESSAGE'
        },
        {
          title: 'Сервис контроллер',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/control-service',
          permission: 'SERVICE_READ'
        },
        {
          title: 'Поиск',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/search',
          permission: 'SEARCH_CONFIG_GET'
        },
        {
          title: 'Настройки маркет',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/market',
          permission: 'PAGE_SETTINGS'
        },
        {
          title: 'Настройки логов',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/log',
          permission: 'GET_ON_OR_OFF_LOG'
        },
        {
          title: 'События',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/app-events',
          permission: 'APP_EVENTS_GET'
        },
        {
          title: 'Свойства',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/properties',
          permission: 'GET_PROPERTIES_DATA'
        },
        {
          title: 'ЭПОС РЕКОНСИЛИАЦИЯ',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/reconciliation',
          permission: 'EPOS_RECONCILIATION'
        },
        {
          title: 'FAQ',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/settings/faq',
          permission: 'CHAT_FAQ_GET'
        },
        // {
        //   title: 'Администрирования',
        //   icon: 'plus.svg',
        //   icon2: 'plus-active.svg',
        //   link: '/settings/admin',
        // },
      ]
    },
    {
      title: 'Маркетинг',
      icon: 'target.svg',
      icon2: 'target-active.svg',
      link: '/marketing',
      permission: 'PAGE_MARKETING',
      list: [
        {
          title: 'Пуш-уведомления',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/marketing/notifications',
          permission: 'GET_LIST_NOTIFICATION'
        },
        {
          title: 'Критическое уведомления',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/marketing/critical/notifications',
          permission: 'GET_LIST_NOTIFICATION'
        },
        // {
        //   title: 'Мини-объявления',
        //   icon: 'plus.svg',
        //   icon2: 'plus-active.svg',
        //   link: '/marketing/ads',
        // },
        // {
        //   title: 'Управление Stories',
        //   icon: 'plus.svg',
        //   icon2: 'plus-active.svg',
        //   link: '/marketing/stories',
        // },
        {
          title: 'SMS рассылки',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/marketing/sms',
          permission: 'GET_LIST_SMS'
        },
        // {
        //   title: 'Настройки',
        //   icon: 'plus.svg',
        //   icon2: 'plus-active.svg',
        //   link: '/marketing/settings',
        // },
        // {
        //   title: 'Отчеты по маркетингу',
        //   icon: 'report-analytics.svg',
        //   icon2: 'report-analytics-active.svg',
        //   link: '/marketing/reports',
        // }
      ]
    },
    {
      title: 'Мой автомобиль',
      icon: 'car.svg',
      icon2: 'car-active.svg',
      link: '/my-auto',
      permission: 'GET_LIST_MY_AUTO',
      list: [
        {
          title: 'Модели автомобилей',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/my-auto/models',
          permission: 'GET_LIST_MY_AUTO'
        },
        {
          title: 'Цвета автомобилей',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/my-auto/colors',
          permission: 'GET_MY_AUTO_COLOR_LIST'
        }
      ]
    },
    {
      title: 'Банк',
      icon: 'bank.svg',
      icon2: 'bank-active.svg',
      link: '/bank/epos',
      permission: 'PAGE_BANK',
      list: [
        {
          title: 'Филиалы',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/bank/branches',
          permission: 'GET_POINTS_BY_POINT'
        },
        {
          title: 'АТМ',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/bank/atms',
          permission: 'GET_POINTS_BY_POINT'
        },
        // {
        //   title: 'Счета',
        //   icon: 'plus.svg',
        //   icon2: 'plus-active.svg',
        //   link: '/bank/accounts',
        // },
      ]
    },
    {
      title: 'Проводки в АБС',
      icon: 'screen-share.svg',
      icon2: 'screen-share-active.svg',
      link: '/transaction/fail',
      permission: 'WALLET_TRANSACTION_FAIL_LIST',
      list: [
        {
          title: 'Неудачные транзакции',
          icon: 'screen-share-off.svg',
          icon2: 'screen-share-off-active.svg',
          link: '/transaction/fail',
          permission: 'WALLET_TRANSACTION_FAIL_CALL'
        },
      ]
    },
    {
      title: 'Call-center',
      icon: 'call-center.svg',
      icon2: 'call-center-active.svg',
      link: '/call-center',
      permission: 'PAGE_CALL_CENTRE',
      list: [
        {
          title: 'Онлайн чат',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/online/chat',
          permission: 'CHAT_OPERATOR'
        },
        {
          title: 'Супер оператор чат',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/online/chat/super',
          permission: 'CHAT_ADMIN'
        },
        {
          title: 'Заявки',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/application/review',
          permission: 'APPLICATION_REVIEW_GET'
        },
        {
          title: 'Заявки на обновление документа',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/application/document-update',
          permission: 'APPLICATION_REVIEW_GET'
        },
        {
          title: 'Заявки на кредит',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/application/loan',
          permission: 'LOAN_APPLICATION_PROCESS_LIST_CALL_CENTER'
        },
      ]
    },
    {
      title: 'Fraud-list',
      icon: 'clipboard-list.svg',
      icon2: 'clipboard-list-active.svg',
      link: '/frauds',
      permission: 'GET_FRAUD_ACCOUNT_LIST',
      list: [
        {
          title: 'Логи',
          icon: 'clipboard-list.svg',
          icon2: 'clipboard-list-active.svg',
          link: '/fraud/logs',
          permission: 'GET_FRAUD_LOGS'
        },
        {
          title: 'Frauds',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/frauds',
          permission: 'SUPER_ADMIN'
        },
        {
          title: 'Fraud-users',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/fraud/users',
          permission: 'GET_FRAUD_ACCOUNT_LIST'
        },
        {
          title: 'Fraud-devices',
          icon: 'plus.svg',
          icon2: 'plus-active.svg',
          link: '/fraud/devices',
          permission: 'GET_FRAUD_DEVICE_LIST'
        }
      ]
    },
/*    {
      title: 'ИНПС переводы',
      icon: 'arrows-left-right.svg',
      icon2: 'arrows-left-right-active.svg',
      link: '/inps',
      permission: 'INPS_TRANSACTION_HISTORY',
      list: [
        {
          title: 'Список переводов',
          icon: 'checklist.svg',
          icon2: 'checklist-active.svg',
          link: '/inps-transactions',
          permission: 'INPS_TRANSACTION_HISTORY'
        },
      ]
    },*/
  ]

  activeMenuList: Array<any> = []
  activeMenuData: any = {}
  activeMenuParent: string = ''
  step: number = -1

  constructor(
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService
  ) {
    const parse: any = localStorage.getItem('userdata');
    const userdata: any = JSON.parse(parse);
    const permissions: [] = userdata.role.permissions;
    if (permissions && permissions.length > 0) {
      this.ngxPermissionsService.loadPermissions(permissions);
    }
  }

  ngOnInit(): void {

  }

  setActiveChildMenu(menu: { name: string, parent: string, data: any, list: Array<any> }) {
    this.activeMenuParent = menu.parent
    this.activeMenuData = menu.data
    this.activeMenuList = menu.list
  }

  setStep(index: number) {
    this.step = index;
  }
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./ad-views/dashboard/dashboard/dashboard.component";
import {DashboardAnalyticsComponent} from "./ad-views/dashboard/dashboard-analytics/dashboard-analytics.component";
import {
  DashboardAdvertisementComponent
} from "./ad-views/dashboard/dashboard-advertisement/dashboard-advertisement.component";
import {DashboardBannersComponent} from "./ad-views/dashboard/dashboard-banners/dashboard-banners.component";
import {
  DashboardNotificationsComponent
} from "./ad-views/dashboard/dashboard-notifications/dashboard-notifications.component";
import {DashboardWorkflowComponent} from "./ad-views/dashboard/dashboard-workflow/dashboard-workflow.component";
import {
  DashboardTranslationComponent
} from "./ad-views/dashboard/dashboard-translation/dashboard-translation.component";
import {DboListComponent} from "./ad-views/dbo/dbo-list/dbo-list.component";
import {DboAdminsComponent} from "./ad-views/dbo/dbo-admins/dbo-admins.component";
import {CardsHistoryComponent} from "./ad-views/cards/cards-history/cards-history.component";
import {CardsInfoComponent} from "./ad-views/cards/cards-info/cards-info.component";
import {CardsTransactionsComponent} from "./ad-views/cards/cards-transactions/cards-transactions.component";
import {ProductsListComponent} from "./ad-views/products/products-list/products-list.component";
import {ProductsCardsComponent} from "./ad-views/products/products-cards/products-cards.component";
import {ProductsDepositsComponent} from "./ad-views/products/products-deposits/products-deposits.component";
import {ProductsLoansComponent} from "./ad-views/products/products-loans/products-loans.component";
import {BankEposComponent} from "./ad-views/bank/bank-epos/bank-epos.component";
import {BankParamComponent} from "./ad-views/bank/bank-param/bank-param.component";
import {BankBranchesComponent} from "./ad-views/bank/bank-branches/bank-branches.component";
import {BankAccountsComponent} from "./ad-views/bank/bank-accounts/bank-accounts.component";
import {BankAtmsComponent} from "./ad-views/bank/bank-atms/bank-atms.component";
import {PermissionsComponent} from "./ad-views/permissions/permissions/permissions.component";
import {PermissionsCodesComponent} from "./ad-views/permissions/permissions-codes/permissions-codes.component";
import {PermissionsHistoryComponent} from "./ad-views/permissions/permissions-history/permissions-history.component";
import {UserGroupsComponent} from "./ad-views/user/user-groups/user-groups.component";
import {UserPermissionsComponent} from "./ad-views/user/user-permissions/user-permissions.component";
import {LoginComponent} from "./ad-views/home/login/login.component";
import {PaynetCategoriesComponent} from "./ad-views/payments/paynet-categories/paynet-categories.component";
import {PaynetServicesComponent} from "./ad-views/payments/paynet-services/paynet-services.component";
import {MunisListComponent} from "./ad-views/payments/munis-list/munis-list.component";
import {DepositCreateComponent} from "./ad-views/products/products-deposits/deposit-create/deposit-create.component";
import {DepositEditComponent} from "./ad-views/products/products-deposits/deposit-edit/deposit-edit.component";
import {LoanTypeListComponent} from "./ad-views/products/products-loans/loan-type-list/loan-type-list.component";
import {LoanTypeCreateComponent} from "./ad-views/products/products-loans/loan-type-create/loan-type-create.component";
import {LoanTypeEditComponent} from "./ad-views/products/products-loans/loan-type-edit/loan-type-edit.component";
import {LoansListComponent} from "./ad-views/products/products-loans/loans-list/loans-list.component";
import {LoanCreateComponent} from "./ad-views/products/products-loans/loan-create/loan-create.component";
import {LoansEditComponent} from "./ad-views/products/products-loans/loans-edit/loans-edit.component";
import {CreateBankAtmComponent} from "./ad-views/bank/create-bank-atm/create-bank-atm.component";
import {CreateBankBranchComponent} from "./ad-views/bank/create-bank-branch/create-bank-branch.component";
import {BankAtmEditComponent} from "./ad-views/bank/bank-atms/bank-atm-edit/bank-atm-edit.component";
import {BankBranchEditComponent} from "./ad-views/bank/bank-branches/bank-branch-edit/bank-branch-edit.component";
import {UserClientsComponent} from "./ad-views/user/user-clients/user-clients.component";
import {OfferComponent} from "./ad-components/offer/offer.component";
import {CreateOfferComponent} from "./ad-components/offer/create-offer/create-offer.component";
import {OnlineChatComponent} from "./ad-views/call-center/online-chat/online-chat.component";
import {BankUsersComponent} from "./ad-views/bank/bank-users/bank-users.component";
import {PensionComponent} from "./ad-views/marketing/pension/pension.component";
import {SuperOperatorChatComponent} from "./ad-views/call-center/super-operator-chat/super-operator-chat.component";
import {
  PaynetCategoriesChildComponent
} from "./ad-views/payments/paynet-categories-child/paynet-categories-child.component";
import {
  PaynetRequestParamsCreateComponent
} from "./ad-views/payments/paynet-services/paynet-request-params-create/paynet-request-params-create.component";
import {TransactionHistoryComponent} from "./ad-views/transaction-history/transaction-history.component";
import {UserMyidFailComponent} from "./ad-views/user/user-myid-fail/user-myid-fail.component";
import {
  PaynetRequestParamEditComponent
} from "./ad-views/payments/paynet-services/paynet-request-param-edit/paynet-request-param-edit.component";
import {CashbackRateHistoryComponent} from "./ad-views/transfers/cashback-rate-history/cashback-rate-history.component";
import {CashbackHistoryComponent} from "./ad-views/transfers/cashback-history/cashback-history.component";
import {BannerCollectionsComponent} from "./ad-views/settings/banner-collections/banner-collections.component";
import {BannersListComponent} from "./ad-views/settings/banner-collections/banners-list/banners-list.component";
import {BannerContentComponent} from "./ad-views/settings/banner-collections/banner-content/banner-content.component";
import {UserClientInfoComponent} from "./ad-views/user/user-clients/user-client-info/user-client-info.component";
import {CardCreateComponent} from "./ad-views/products/products-cards/card-create/card-create.component";
import {CardEditComponent} from "./ad-views/products/products-cards/card-edit/card-edit.component";
import {MessageIssueV2Component} from "./ad-views/settings/message-issue-v2/message-issue-v2.component";
import {OrderedCardsComponent} from "./ad-views/marketing/ordered-cards/ordered-cards.component";
import {
  LoanRedemptionRegisterComponent
} from "./ad-views/transfers/loan-redemption-register/loan-redemption-register.component";
import {FraudLogsComponent} from "./ad-views/fraud/fraud-logs/fraud-logs.component";
import {FraudsComponent} from "./ad-views/fraud/frauds/frauds.component";
import {OrderedVirtualCardsComponent} from "./ad-views/marketing/ordered-virtual-cards/ordered-virtual-cards.component";
import {FraudUsersComponent} from "./ad-views/fraud/fraud-users/fraud-users.component";
import {FraudDevicesComponent} from "./ad-views/fraud/fraud-devices/fraud-devices.component";
import {UserClientsStatusComponent} from "./ad-views/user/user-vip-clients/user-clients-status.component";
import {UserVipLimitsComponent} from "./ad-views/user/user-vip-clients/user-vip-limits/user-vip-limits.component";
import {ProductLoanAppComponent} from "./ad-views/products/product-loan-app/product-loan-app.component";
import {TranfersReportsComponent} from "./ad-views/transfers/tranfers-reports/tranfers-reports.component";
import {
  GovernmentCategoriesComponent
} from "./ad-views/payments/government-services/government-categories/government-categories.component";
import {SearchComponent} from "./ad-views/search/search.component";
import {
  GovernmentCategoriesChildComponent
} from "./ad-views/payments/government-services/government-categories-child/government-categories-child.component";
import {
  GovernmentServiceComponent
} from "./ad-views/payments/government-services/government-service/government-service.component";
import {StateMonitoringComponent} from "./ad-views/state/state-monitoring/state-monitoring.component";
import {StateMonitoringOneComponent} from "./ad-views/state/state-monitoring-one/state-monitoring-one.component";
import {JobBlockComponent} from "./ad-views/job-block/job-block.component";
import {MarketSettingsComponent} from "./ad-views/settings/market-settings/market-settings.component";
import {ApplicationReviewComponent} from "./ad-views/call-center/application-review/application-review.component";
import {
  DocumentUpdateApplicationComponent
} from "./ad-views/call-center/document-update-application/document-update-application.component";
import {ModelsComponent} from "./ad-views/my-auto/models/models.component";
import {ModelInfoPageComponent} from "./ad-views/my-auto/model-info-page/model-info-page.component";
import {CarColorsComponent} from "./ad-views/my-auto/car-colors/car-colors.component";
import {CarColorInfoPageComponent} from "./ad-views/my-auto/car-color-info-page/car-color-info-page.component";
import {LoanApplicationComponent} from "./ad-views/call-center/loan-application/loan-application.component";
import {
  InternationalTransfersComponent
} from "./ad-views/transfers/international-transfers/international-transfers.component";
import {
  DashboardCriticalNotificationComponent
} from "./ad-views/dashboard/dashboard-critical-notification/dashboard-critical-notification.component";
import {LoanPortfelComponent} from "./ad-views/products/loan-portfel/loan-portfel.component";
import {LogSettingsComponent} from "./ad-views/settings/log-settings/log-settings.component";
import {PropertyComponent} from "./ad-views/settings/property/property.component";
import {FailTransactionsComponent} from "./ad-views/fail-transactions/fail-transactions.component";
import {UserBankLimitsComponent} from "./ad-views/user/user-bank-limits/user-bank-limits.component";
import {
  UserBankLimitOneComponent
} from "./ad-views/user/user-bank-limits/user-bank-limit-one/user-bank-limit-one.component";
import {MyProfileComponent} from "./ad-views/my-profile/my-profile.component";
import {ListConfirmationComponent} from "./ad-views/transfers/list-confirmation/list-confirmation.component";
import {InpsTransactionsComponent} from "./ad-views/inps/inps-transactions/inps-transactions.component";
import {Offer2Component} from "./ad-components/offer2/offer2.component";
import {CreateOffer2Component} from "./ad-components/offer2/create-offer2/create-offer2.component";
import {EditOffer2Component} from "./ad-components/offer2/edit-offer2/edit-offer2.component";
import {
  ProductLoanAppProcessComponent
} from "./ad-views/products/product-loan-app-process/product-loan-app-process.component";
import {UserBlacklistAbsComponent} from "./ad-views/user/user-blacklist-abs/user-blacklist-abs.component";
import {InsuranceListComponent} from "./ad-views/products/insurance-list/insurance-list.component";
import {ServiceControllerComponent} from "./ad-views/settings/service-controller/service-controller.component";
import {UserPromoCodeComponent} from "./ad-views/user/user-promo-code/user-promo-code.component";
import {LoanBlacklistComponent} from "./ad-views/products/loan-blacklist/loan-blacklist.component";
import {GoldUsersComponent} from "./ad-views/user/gold-users/gold-users.component";
import {EposReconciliationComponent} from "./ad-views/settings/epos-reconciliation/epos-reconciliation.component";
import {FaqComponent} from "./ad-views/settings/faq/faq.component";
import {AnswerFaqChildComponent} from "./ad-views/settings/faq/answer-faq-child/answer-faq-child.component";
import {AnswerForQuestionsComponent} from "./ad-views/settings/faq/answer-for-questions/answer-for-questions.component";
import {
  NotificationScheduleComponent
} from "./ad-views/marketing/notification-schedule/notification-schedule.component";
import {ProductAccountsComponent} from "./ad-views/products/product-accounts/product-accounts.component";
import {
  VirtualConditionCardsComponent
} from "./ad-views/products/virtual-condition-cards/virtual-condition-cards.component";
import {
  VirtualConditionCardsAddComponent
} from "./ad-views/products/virtual-condition-cards-add/virtual-condition-cards-add.component";
import {
  VirtualConditionCardsEditComponent
} from "./ad-views/products/virtual-condition-cards-edit/virtual-condition-cards-edit.component";
import {AppEventsComponent} from "./ad-views/settings/app-events/app-events.component";
import {
  TransactionOperationComponent
} from "./ad-views/transaction-history/transaction-operation/transaction-operation.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'transaction/history', component: TransactionHistoryComponent},
  {path: 'transaction-operations', component: TransactionOperationComponent},
  {path: 'loan/repayment/history', component: LoanRedemptionRegisterComponent},
  {path: 'cashback/rate/history', component: CashbackRateHistoryComponent},
  {path: 'cashback/history', component: CashbackHistoryComponent},
  {path: 'transfers/reports', component: TranfersReportsComponent},
  {path: 'international/transfers', component: InternationalTransfersComponent},
  {path: 'transaction-confirm', component: ListConfirmationComponent},

  // Paynet service settings
  {path: 'paynet/categories', component: PaynetCategoriesComponent},
  {path: 'paynet/categories/child', component: PaynetCategoriesChildComponent},
  {path: 'paynet/services', component: PaynetServicesComponent},
  {path: 'paynet/service/request/params/create', component: PaynetRequestParamsCreateComponent},
  {path: 'paynet/service/request/param/edit', component: PaynetRequestParamEditComponent},

  // Government service settings
  {path: 'government-settings/categories', component: GovernmentCategoriesComponent},
  {path: 'government-settings/categories/child', component: GovernmentCategoriesChildComponent},
  {path: 'government-settings/service', component: GovernmentServiceComponent},
  {path: 'state/monitoring', component: StateMonitoringComponent},
  {path: 'state/monitoring/one', component: StateMonitoringOneComponent},

  {path: 'munis/list', component: MunisListComponent},

  {path: 'dashboard/analytics', component: DashboardAnalyticsComponent},
  {path: 'marketing/sms', component: DashboardAdvertisementComponent},
  {path: 'marketing/pension', component: PensionComponent},
  {path: 'marketing/ordered-cards', component: OrderedCardsComponent},
  {path: 'marketing/ordered-virtual-cards', component: OrderedVirtualCardsComponent},
  {path: 'dashboard/banners', component: DashboardBannersComponent},
  {path: 'marketing/notifications', component: DashboardNotificationsComponent},
  {path: 'marketing/notifications/schedule', component: NotificationScheduleComponent},
  {path: 'marketing/critical/notifications', component: DashboardCriticalNotificationComponent},

  {path: 'dashboard/workflow', component: DashboardWorkflowComponent},
  {path: 'dashboard/translation', component: DashboardTranslationComponent},

  {path: 'dbo/list', component: DboListComponent},
  {path: 'dbo/admins', component: DboAdminsComponent},

  {path: 'cards/transactions', component: CardsTransactionsComponent},
  {path: 'cards/info', component: CardsInfoComponent},
  {path: 'cards/history', component: CardsHistoryComponent},

  {path: 'products/list', component: ProductsListComponent},
  {path: 'products/cards', component: ProductsCardsComponent},
  {path: 'products/card/create', component: CardCreateComponent},
  {path: 'products/deposits', component: ProductsDepositsComponent},
  {path: 'products/deposits/create', component: DepositCreateComponent},
  {path: 'products/deposits/edit', component: DepositEditComponent},
  {path: 'products/card/edit', component: CardEditComponent},
  {
    path: 'products/loans', component: ProductsLoansComponent,
    children: [
      {path: 'type', component: LoanTypeListComponent}
    ]
  },
  {path: 'products/loans/type/create', component: LoanTypeCreateComponent},
  {path: 'products/loans/type/edit', component: LoanTypeEditComponent},
  {path: 'products/loans/list', component: LoansListComponent},
  {path: 'products/loans/create', component: LoanCreateComponent},
  {path: 'products/loans/edit', component: LoansEditComponent},
  {path: 'products/loans/app', component: ProductLoanAppComponent},
  {path: 'products/loan-app/process', component: ProductLoanAppProcessComponent},
  {path: 'loan/portfolio', component: LoanPortfelComponent},
  {path: 'insurance-list', component: InsuranceListComponent},
  {path: 'loan/blacklist', component: LoanBlacklistComponent},
  {path: 'product/accounts', component: ProductAccountsComponent},
  {path: 'products/virtual-cards', component: VirtualConditionCardsComponent},
  {path: 'products/virtual-cards/add', component: VirtualConditionCardsAddComponent},
  {path: 'products/virtual-cards/edit', component: VirtualConditionCardsEditComponent},

  {path: 'bank/epos', component: BankEposComponent},
  {path: 'bank/param', component: BankParamComponent},
  {path: 'bank/branches', component: BankBranchesComponent},
  {path: 'bank/branches/create', component: CreateBankBranchComponent},
  {path: 'bank/branches/edit', component: BankBranchEditComponent},
  {path: 'bank/atms', component: BankAtmsComponent},
  {path: 'bank/atms/create', component: CreateBankAtmComponent},
  {path: 'bank/atms/edit', component: BankAtmEditComponent},
  {path: 'bank/accounts', component: BankAccountsComponent},


  //failed transactions
  {path: 'transaction/fail', component: FailTransactionsComponent},

  {path: 'permissions', component: PermissionsComponent},
  {path: 'permissions/codes', component: PermissionsCodesComponent},
  {path: 'permissions/history', component: PermissionsHistoryComponent},

  {path: 'user/clients', component: UserClientsComponent},
  {path: 'user/promo-code-clients', component: UserPromoCodeComponent},
  {path: 'user/client/info', component: UserClientInfoComponent},
  {path: 'user/vip-clients', component: UserClientsStatusComponent},
  {path: 'user/vip-client/limit', component: UserVipLimitsComponent},
  {path: 'user/groups', component: UserGroupsComponent},
  {path: 'user/employees', component: BankUsersComponent},
  {path: 'user/permissions', component: UserPermissionsComponent},
  {path: 'user/myid/fail', component: UserMyidFailComponent},
  {path: 'user/access', component: UserPermissionsComponent},
  {path: 'user/bank/limits', component: UserBankLimitsComponent},
  {path: 'user/bank/limit/:id', component: UserBankLimitOneComponent},
  {path: 'user/blacklist', component: UserBlacklistAbsComponent},
  {path: 'user/gold-users', component: GoldUsersComponent},

  // call center
  {path: 'online/chat', component: OnlineChatComponent},
  {path: 'online/chat/super', component: SuperOperatorChatComponent},
  {path: 'application/review', component: ApplicationReviewComponent},
  {path: 'application/document-update', component: DocumentUpdateApplicationComponent},
  {path: 'application/loan', component: LoanApplicationComponent},


  //offer - first version
  {path: 'settings/offer', component: OfferComponent},
  {path: 'settings/offer/detail', component: CreateOfferComponent},


  //offer - second version
  {path: 'settings/offer2', component: Offer2Component},
  {path: 'settings/offer2/edit/:id', component: EditOffer2Component},
  {path: 'settings/offer2/create', component: CreateOffer2Component},

  // {path: 'settings/message', component: MessageIssueComponent},
  {path: 'settings/message/v2', component: MessageIssueV2Component},
  {path: 'settings/banner-collections', component: BannerCollectionsComponent},
  {path: 'settings/banner/banners', component: BannersListComponent},
  {path: 'settings/banner/content', component: BannerContentComponent},
  {path: 'settings/search', component: SearchComponent},
  {path: 'settings/block-job', component: JobBlockComponent},
  {path: 'settings/market', component: MarketSettingsComponent},
  {path: 'settings/log', component: LogSettingsComponent},
  {path: 'settings/properties', component: PropertyComponent},
  {path: 'settings/control-service', component: ServiceControllerComponent},
  {path: 'settings/reconciliation', component: EposReconciliationComponent},
  {path: 'settings/faq', component:FaqComponent},
  {path: 'settings/faq/answer', component: AnswerFaqChildComponent},
  {path: 'settings/faq/answer-question', component: AnswerForQuestionsComponent},
  {path: 'settings/app-events', component: AppEventsComponent},

  // My Auto
  {path: 'my-auto/models', component: ModelsComponent},
  {path: 'my-auto/model/:id', component: ModelInfoPageComponent},
  {path: 'my-auto/colors', component: CarColorsComponent},
  {path: 'my-auto/color/:id', component: CarColorInfoPageComponent},

  //frauds
  {path: 'fraud/logs', component: FraudLogsComponent},
  {path: 'frauds', component: FraudsComponent},
  {path: 'fraud/users', component: FraudUsersComponent},
  {path: 'fraud/devices', component: FraudDevicesComponent},

  // INPS
  {path: 'inps-transactions', component: InpsTransactionsComponent},

  // My Profile
  {path: 'my/profile', component: MyProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

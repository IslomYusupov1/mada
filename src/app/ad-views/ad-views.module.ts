import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {DashboardAnalyticsComponent} from './dashboard/dashboard-analytics/dashboard-analytics.component';
import {DashboardAdvertisementComponent} from './dashboard/dashboard-advertisement/dashboard-advertisement.component';
import {DashboardBannersComponent} from './dashboard/dashboard-banners/dashboard-banners.component';
import {DashboardNotificationsComponent} from './dashboard/dashboard-notifications/dashboard-notifications.component';
import {DashboardWorkflowComponent} from './dashboard/dashboard-workflow/dashboard-workflow.component';
import {DashboardTranslationComponent} from './dashboard/dashboard-translation/dashboard-translation.component';
import {DboListComponent} from './dbo/dbo-list/dbo-list.component';
import {DboAdminsComponent} from './dbo/dbo-admins/dbo-admins.component';
import {CardsTransactionsComponent} from './cards/cards-transactions/cards-transactions.component';
import {CardsInfoComponent} from './cards/cards-info/cards-info.component';
import {CardsHistoryComponent} from './cards/cards-history/cards-history.component';
import {ProductsListComponent} from './products/products-list/products-list.component';
import {ProductsCardsComponent} from './products/products-cards/products-cards.component';
import {ProductsDepositsComponent} from './products/products-deposits/products-deposits.component';
import {ProductsLoansComponent} from './products/products-loans/products-loans.component';
import {BankEposComponent} from './bank/bank-epos/bank-epos.component';
import {BankParamComponent} from './bank/bank-param/bank-param.component';
import {BankBranchesComponent} from './bank/bank-branches/bank-branches.component';
import {BankAtmsComponent} from './bank/bank-atms/bank-atms.component';
import {BankAccountsComponent} from './bank/bank-accounts/bank-accounts.component';
import {PermissionsComponent} from './permissions/permissions/permissions.component';
import {PermissionsCodesComponent} from './permissions/permissions-codes/permissions-codes.component';
import {PermissionsHistoryComponent} from './permissions/permissions-history/permissions-history.component';
import {UserGroupsComponent} from './user/user-groups/user-groups.component';
import {UserPermissionsComponent} from './user/user-permissions/user-permissions.component';
import {MatCardModule} from "@angular/material/card";
import {LoginComponent} from './home/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {AdComponentsModule} from "../ad-components/ad-components.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDividerModule} from '@angular/material/divider';
import {PaynetCategoriesComponent} from './payments/paynet-categories/paynet-categories.component';
import {PaynetServicesComponent} from './payments/paynet-services/paynet-services.component'
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {DepositCreateComponent} from './products/products-deposits/deposit-create/deposit-create.component';
import {DepositEditComponent} from './products/products-deposits/deposit-edit/deposit-edit.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {LoanCreateComponent} from './products/products-loans/loan-create/loan-create.component';
import {LoanTypeListComponent} from './products/products-loans/loan-type-list/loan-type-list.component';
import {LoanTypeCreateComponent} from './products/products-loans/loan-type-create/loan-type-create.component';
import {MatTabsModule} from "@angular/material/tabs";
import {LoanTypeEditComponent} from './products/products-loans/loan-type-edit/loan-type-edit.component';
import {LoansListComponent} from './products/products-loans/loans-list/loans-list.component';
import {LoansEditComponent} from './products/products-loans/loans-edit/loans-edit.component';
import {CreateBankAtmComponent} from './bank/create-bank-atm/create-bank-atm.component';
import {CreateBankBranchComponent} from './bank/create-bank-branch/create-bank-branch.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {BankAtmEditComponent} from './bank/bank-atms/bank-atm-edit/bank-atm-edit.component';
import {BankBranchEditComponent} from './bank/bank-branches/bank-branch-edit/bank-branch-edit.component';
import * as CanvasJSAngularChart from '../../assets/canvajs.angular.component';
import {MunisListComponent} from './payments/munis-list/munis-list.component';
import {UserClientsComponent} from './user/user-clients/user-clients.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {NgChartsModule} from 'ng2-charts';
import {MatInputModule} from "@angular/material/input";
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { OnlineChatComponent } from './call-center/online-chat/online-chat.component';
import { BankUsersComponent } from './bank/bank-users/bank-users.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { PensionComponent } from './marketing/pension/pension.component';
import { MessageIssueComponent } from './settings/message-issue/message-issue.component';
import { PensionEditComponent } from './marketing/pension-edit/pension-edit.component';
import { SuperOperatorChatComponent } from './call-center/super-operator-chat/super-operator-chat.component';
import { PaynetCategoriesChildComponent } from './payments/paynet-categories-child/paynet-categories-child.component';
import { PaynetServiceEditComponent } from './payments/paynet-services/paynet-service-edit/paynet-service-edit.component';
import { PaynetCategoryCreateComponent } from './payments/paynet-categories/paynet-category-create/paynet-category-create.component';
import { PaynetRequestParamsCreateComponent } from './payments/paynet-services/paynet-request-params-create/paynet-request-params-create.component';
import { PaynetCategoryEditComponent } from './payments/paynet-categories/paynet-category-edit/paynet-category-edit.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { UserMyidFailComponent } from './user/user-myid-fail/user-myid-fail.component';
import { PaynetRequestParamEditComponent } from './payments/paynet-services/paynet-request-param-edit/paynet-request-param-edit.component';
import { CashbackRateHistoryComponent } from './transfers/cashback-rate-history/cashback-rate-history.component';
import { CashbackHistoryComponent } from './transfers/cashback-history/cashback-history.component';
import { BannerCollectionsComponent } from './settings/banner-collections/banner-collections.component';
import { BannersListComponent } from './settings/banner-collections/banners-list/banners-list.component';
import { BannerContentComponent } from './settings/banner-collections/banner-content/banner-content.component';
import { UserClientInfoComponent } from './user/user-clients/user-client-info/user-client-info.component';
import { CardCreateComponent } from './products/products-cards/card-create/card-create.component';
import { CardEditComponent } from './products/products-cards/card-edit/card-edit.component';
import { RoleAddComponent } from './user/user-permissions/role-add/role-add.component';
import { RoleEditComponent } from './user/user-permissions/role-edit/role-edit.component';
import {NgxPermissionsModule} from "ngx-permissions";
import { MessageIssueV2Component } from './settings/message-issue-v2/message-issue-v2.component';
import { OrderedCardsComponent } from './marketing/ordered-cards/ordered-cards.component';
import { LoanRedemptionRegisterComponent } from './transfers/loan-redemption-register/loan-redemption-register.component';
import { FraudLogsComponent } from './fraud/fraud-logs/fraud-logs.component';
import { FraudsComponent } from './fraud/frauds/frauds.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import { OrderedVirtualCardsComponent } from './marketing/ordered-virtual-cards/ordered-virtual-cards.component';
import { FraudUsersComponent } from './fraud/fraud-users/fraud-users.component';
import { FraudDevicesComponent } from './fraud/fraud-devices/fraud-devices.component';
import { UserClientsStatusComponent } from './user/user-vip-clients/user-clients-status.component';
import { UserVipLimitsComponent } from './user/user-vip-clients/user-vip-limits/user-vip-limits.component';
import { LimitDetailsComponent } from './user/user-vip-clients/user-vip-limits/limit-details/limit-details.component';
import { ProductLoanAppComponent } from './products/product-loan-app/product-loan-app.component';
import { TranfersReportsComponent } from './transfers/tranfers-reports/tranfers-reports.component';
import { TransferReportCardComponent } from './transfers/tranfers-reports/transfer-report-card/transfer-report-card.component';
import {CurrencyNewPipe} from "../pipes/currency-new.pipe";
import { GovernmentCategoriesComponent } from './payments/government-services/government-categories/government-categories.component';
import { SearchComponent } from './search/search.component';
import { GovernmentCategoriesChildComponent } from './payments/government-services/government-categories-child/government-categories-child.component';
import { GovernmentServiceComponent } from './payments/government-services/government-service/government-service.component';
import { StateMonitoringComponent } from './state/state-monitoring/state-monitoring.component';
import { StateMonitoringOneComponent } from './state/state-monitoring-one/state-monitoring-one.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { JobBlockComponent } from './job-block/job-block.component';
import { MarketSettingsComponent } from './settings/market-settings/market-settings.component';
import { MarketSettingsEditComponent } from './settings/market-settings/market-settings-edit/market-settings-edit.component';
import { ApplicationReviewComponent } from './call-center/application-review/application-review.component';
import { ApplicationReviewDialogComponent } from './call-center/application-review/application-review-dialog/application-review-dialog.component';
import { ApplicationReviewDescriptionDialogComponent } from './call-center/application-review/application-review-description-dialog/application-review-description-dialog.component';
import { DocumentUpdateApplicationComponent } from './call-center/document-update-application/document-update-application.component';
import { DocumentUpdateAppDialogComponent } from './call-center/document-update-application/document-update-app-dialog/document-update-app-dialog.component';
import { ModelsComponent } from './my-auto/models/models.component';
import { ModelInfoPageComponent } from './my-auto/model-info-page/model-info-page.component';
import {IvyCarouselModule} from "angular-responsive-carousel";
import { CarColorsComponent } from './my-auto/car-colors/car-colors.component';
import { CarColorInfoPageComponent } from './my-auto/car-color-info-page/car-color-info-page.component';
import { LoanApplicationComponent } from './call-center/loan-application/loan-application.component';
import { InternationalTransfersComponent } from './transfers/international-transfers/international-transfers.component';
import { DashboardCriticalNotificationComponent } from './dashboard/dashboard-critical-notification/dashboard-critical-notification.component';
import { LoanPortfelComponent } from './products/loan-portfel/loan-portfel.component';
import { LoanFolderInfoDialogComponent } from './products/loan-portfel/loan-folder-info-dialog/loan-folder-info-dialog.component';
import { LogSettingsComponent } from './settings/log-settings/log-settings.component';
import { LogSettingsEditComponent } from './settings/log-settings/log-settings-edit/log-settings-edit.component';
import { PropertyComponent } from './settings/property/property.component';
import { FailTransactionsComponent } from './fail-transactions/fail-transactions.component';
import { FailTransactionsDetailComponent } from './fail-transactions/fail-transactions-detail/fail-transactions-detail.component';
import { LoanFolderErrorMessageComponent } from './products/loan-portfel/loan-folder-error-message/loan-folder-error-message.component';
import { UserBankLimitsComponent } from './user/user-bank-limits/user-bank-limits.component';
import { UserBankLimitOneComponent } from './user/user-bank-limits/user-bank-limit-one/user-bank-limit-one.component';
import { UserBankLimitAddComponent } from './user/user-bank-limits/user-bank-limit-add/user-bank-limit-add.component';
import { UserBankLimitEditComponent } from './user/user-bank-limits/user-bank-limit-edit/user-bank-limit-edit.component';
import { LoanStatisticsItemComponent } from './products/product-loan-app/loan-statistics-item/loan-statistics-item.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordDialogComponent } from './my-profile/change-password-dialog/change-password-dialog.component';
import { ListConfirmationComponent } from './transfers/list-confirmation/list-confirmation.component';
import { ListConfirmationDetailDialogComponent } from './transfers/list-confirmation/list-confirmation-detail-dialog/list-confirmation-detail-dialog.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { InpsTransactionsComponent } from './inps/inps-transactions/inps-transactions.component';
import { ProductLoanAppProcessComponent } from './products/product-loan-app-process/product-loan-app-process.component';
import { ProductLoanAppOneComponent } from './products/product-loan-app-process/product-loan-app-one/product-loan-app-one.component';
import { UserBlacklistAbsComponent } from './user/user-blacklist-abs/user-blacklist-abs.component';
import { InsuranceListComponent } from './products/insurance-list/insurance-list.component';
import { ServiceControllerComponent } from './settings/service-controller/service-controller.component';
import { ServiceControllerInactiveDialogComponent } from './settings/service-controller/service-controller-inactive-dialog/service-controller-inactive-dialog.component';
import { ServiceControllerDetailsComponent } from './settings/service-controller/service-controller-details/service-controller-details.component';
import { ChatImageDialogComponent } from './online-chat/chat-image-dialog/chat-image-dialog.component';
import { DocumentUpdateAppCompareDialogComponent } from './call-center/document-update-application/document-update-app-compare-dialog/document-update-app-compare-dialog.component';
import { UserPromoCodeComponent } from './user/user-promo-code/user-promo-code.component';
import { LoanBlacklistComponent } from './products/loan-blacklist/loan-blacklist.component';
import { LoanBlacklistAddUserComponent } from './products/loan-blacklist/loan-blacklist-add-user/loan-blacklist-add-user.component';
import { LoanBlacklistUserEditComponent } from './products/loan-blacklist/loan-blacklist-user-edit/loan-blacklist-user-edit.component';
import { LoanBlacklistUserDetailsComponent } from './products/loan-blacklist/loan-blacklist-user-details/loan-blacklist-user-details.component';
import { GoldUsersComponent } from './user/gold-users/gold-users.component';
import { EposReconciliationComponent } from './settings/epos-reconciliation/epos-reconciliation.component';
import { FaqComponent } from './settings/faq/faq.component';
import { AnswerFaqChildComponent } from './settings/faq/answer-faq-child/answer-faq-child.component';
import { AnswerForQuestionsComponent } from './settings/faq/answer-for-questions/answer-for-questions.component';
import { NotificationScheduleComponent } from './marketing/notification-schedule/notification-schedule.component';
import { ProductAccountsComponent } from './products/product-accounts/product-accounts.component';
import { VirtualConditionCardsComponent } from './products/virtual-condition-cards/virtual-condition-cards.component';
import { VirtualConditionCardsAddComponent } from './products/virtual-condition-cards-add/virtual-condition-cards-add.component';
import { VirtualConditionCardsEditComponent } from './products/virtual-condition-cards-edit/virtual-condition-cards-edit.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AppEventsComponent} from "./settings/app-events/app-events.component";
import { TransactionOperationComponent } from './transaction-history/transaction-operation/transaction-operation.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatButtonModule,
        AdComponentsModule,
        DragDropModule,
        MatDividerModule,
        MatIconModule,
        RouterModule,
        NgxSkeletonLoaderModule,
        FormsModule,
        MatTooltipModule,
        MatSelectModule,
        MatOptionModule,
        MatTabsModule,
        RouterModule,
        NgbTimepickerModule,
        FormsModule,
        MatButtonToggleModule,
        NgChartsModule,
        MatInputModule,
        MatRippleModule,
        NgxMaskModule.forRoot(maskConfig),
        MatListModule,
        MatMenuModule,
        NgxPermissionsModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatTableModule,
        MatAutocompleteModule,
        IvyCarouselModule,
        ClipboardModule,
      MatSlideToggleModule
    ],
    exports: [
        CurrencyNewPipe
    ],
    declarations: [
        DashboardComponent,
        DashboardAnalyticsComponent,
        DashboardAdvertisementComponent,
        DashboardBannersComponent,
        DashboardNotificationsComponent,
        DashboardWorkflowComponent,
        DashboardTranslationComponent,
        DboListComponent,
        DboAdminsComponent,
        CardsTransactionsComponent,
        CardsInfoComponent,
        CardsHistoryComponent,
        ProductsListComponent,
        ProductsCardsComponent,
        ProductsDepositsComponent,
        ProductsLoansComponent,
        BankEposComponent,
        BankParamComponent,
        BankBranchesComponent,
        BankAtmsComponent,
        BankAccountsComponent,
        PermissionsComponent,
        PermissionsCodesComponent,
        PermissionsHistoryComponent,
        UserGroupsComponent,
        UserPermissionsComponent,
        LoginComponent,
        PaynetCategoriesComponent,
        PaynetServicesComponent,
        CanvasJSChart,
        DepositCreateComponent,
        DepositEditComponent,
        LoanCreateComponent,
        LoanTypeListComponent,
        LoanTypeCreateComponent,
        LoanTypeEditComponent,
        LoansListComponent,
        LoansEditComponent,
        CreateBankAtmComponent,
        CreateBankBranchComponent,
        BankAtmEditComponent,
        BankBranchEditComponent,
        MunisListComponent,
        UserClientsComponent,
        OnlineChatComponent,
        BankUsersComponent,
        PensionComponent,
        MessageIssueComponent,
        PensionEditComponent,
        SuperOperatorChatComponent,
        PaynetCategoriesChildComponent,
        PaynetServiceEditComponent,
        PaynetCategoryCreateComponent,
        PaynetRequestParamsCreateComponent,
        PaynetCategoryEditComponent,
        TransactionHistoryComponent,
        UserMyidFailComponent,
        PaynetRequestParamEditComponent,
        CashbackRateHistoryComponent,
        CashbackHistoryComponent,
        BannerCollectionsComponent,
        BannersListComponent,
        BannerContentComponent,
        UserClientInfoComponent,
        CardCreateComponent,
        CardEditComponent,
        RoleAddComponent,
        RoleEditComponent,
        MessageIssueV2Component,
        OrderedCardsComponent,
        LoanRedemptionRegisterComponent,
        FraudLogsComponent,
        FraudsComponent,
        OrderedVirtualCardsComponent,
        FraudUsersComponent,
        FraudDevicesComponent,
        UserClientsStatusComponent,
        UserVipLimitsComponent,
        LimitDetailsComponent,
        ProductLoanAppComponent,
        TranfersReportsComponent,
        TransferReportCardComponent,
        CurrencyNewPipe,
        GovernmentCategoriesComponent,
        SearchComponent,
        GovernmentCategoriesChildComponent,
        GovernmentServiceComponent,
        StateMonitoringComponent,
        StateMonitoringOneComponent,
        JobBlockComponent,
        MarketSettingsComponent,
        MarketSettingsEditComponent,
        ApplicationReviewComponent,
        ApplicationReviewDialogComponent,
        ApplicationReviewDescriptionDialogComponent,
        DocumentUpdateApplicationComponent,
        DocumentUpdateAppDialogComponent,
        ModelsComponent,
        ModelInfoPageComponent,
        CarColorsComponent,
        CarColorInfoPageComponent,
        LoanApplicationComponent,
        InternationalTransfersComponent,
        DashboardCriticalNotificationComponent,
        LoanPortfelComponent,
        LoanFolderInfoDialogComponent,
        LogSettingsComponent,
        LogSettingsEditComponent,
        PropertyComponent,
        FailTransactionsComponent,
        FailTransactionsDetailComponent,
        LoanFolderErrorMessageComponent,
        UserBankLimitsComponent,
        UserBankLimitOneComponent,
        UserBankLimitAddComponent,
        UserBankLimitEditComponent,
        LoanStatisticsItemComponent,
        MyProfileComponent,
        ChangePasswordDialogComponent,
        ListConfirmationComponent,
        ListConfirmationDetailDialogComponent,
        InpsTransactionsComponent,
        ProductLoanAppProcessComponent,
        ProductLoanAppOneComponent,
        UserBlacklistAbsComponent,
        InsuranceListComponent,
        ServiceControllerComponent,
        ServiceControllerInactiveDialogComponent,
        ServiceControllerDetailsComponent,
        ChatImageDialogComponent,
        DocumentUpdateAppCompareDialogComponent,
        UserPromoCodeComponent,
        LoanBlacklistComponent,
        LoanBlacklistAddUserComponent,
        LoanBlacklistUserEditComponent,
        LoanBlacklistUserDetailsComponent,
        GoldUsersComponent,
        EposReconciliationComponent,
        FaqComponent,
        AnswerFaqChildComponent,
        AnswerForQuestionsComponent,
        NotificationScheduleComponent,
        ProductAccountsComponent,
        VirtualConditionCardsComponent,
        VirtualConditionCardsAddComponent,
        VirtualConditionCardsEditComponent,
      AppEventsComponent,
      TransactionOperationComponent,
    ]
})
export class AdViewsModule {
}

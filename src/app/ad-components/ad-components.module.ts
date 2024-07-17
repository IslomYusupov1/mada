import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdStatusDialogComponent} from './ad-status-dialog/ad-status-dialog.component';
import {MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {AdLoadingDialogComponent} from './ad-loading-dialog/ad-loading-dialog.component';
import {AdLeftMenuBlockComponent} from './ad-left-menu-block/ad-left-menu-block.component';
import {AdLoginTopBlockComponent} from './ad-login-top-block/ad-login-top-block.component';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {MatCardModule} from "@angular/material/card";
import {AdBtnEyeComponent} from './ad-btn-eye/ad-btn-eye.component';
import {AdBreadcrumbComponent} from './ad-breadcrumb/ad-breadcrumb.component';
import {AdTableComponent} from './ad-table/ad-table.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {AdAgreeDialogComponent} from './ad-agree-dialog/ad-agree-dialog.component';
import {AdPaginationComponent} from './ad-pagination/ad-pagination.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SendNotificationDialogComponent} from './ad-dialog/send-notification-dialog/send-notification-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SendSmsComponent} from './ad-dialog/send-sms/send-sms.component';
import { OfferComponent } from './offer/offer.component';
import {MatMenuModule} from "@angular/material/menu";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';
import {MatInputModule} from "@angular/material/input";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateNotificationDialogComponent } from './ad-dialog/create-notification-dialog/create-notification-dialog.component';
import { CreateSmsDialogComponent } from './ad-dialog/create-sms-dialog/create-sms-dialog.component';
import { BankAdminDetailComponent } from './ad-dialog/bank-admin-detail/bank-admin-detail.component';
import { CreateAdminComponent } from './ad-dialog/create-admin/create-admin.component';
import { CreateMessageComponent } from './ad-dialog/create-message/create-message.component';
import { EditMessageDialogComponent } from './ad-dialog/edit-message-dialog/edit-message-dialog.component';
import { EditNotificationComponent } from './ad-dialog/edit-notification/edit-notification.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTabsModule} from "@angular/material/tabs";
import { TranslateDialogComponent } from './ad-dialog/translate-dialog/translate-dialog.component';
import { CategoryTitleDialogComponent } from './ad-payment/paynet-category/category-title-dialog/category-title-dialog.component';
import { AttachPhotoDialogComponent } from './ad-payment/paynet-category/attach-photo-dialog/attach-photo-dialog.component';
import { PaynetServiceCreateComponent } from './ad-payment/paynet-service/paynet-service-create/paynet-service-create.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { RequestParamTitleTranslateComponent } from './ad-payment/paynet-service/request-param-title-translate/request-param-title-translate.component';
import { RequestParamChildCreateComponent } from './ad-payment/paynet-service/request-param-child-create/request-param-child-create.component';
import { MyidFailsByUserComponent } from './ad-users/myid-fails-by-user/myid-fails-by-user.component';
import { TransactionDetailDialogComponent } from './ad-transactions/transaction-detail-dialog/transaction-detail-dialog.component';
import { PaynetReponseParamCreateComponent } from './ad-payment/paynet-service/paynet-reponse-param-create/paynet-reponse-param-create.component';
import { ResponseParamTitleTranslateComponent } from './ad-payment/paynet-service/response-param-title-translate/response-param-title-translate.component';
import { PaynetResponseParamEditComponent } from './ad-payment/paynet-service/paynet-response-param-edit/paynet-response-param-edit.component';
import { RequestParamChildEditComponent } from './ad-payment/paynet-service/request-param-child-edit/request-param-child-edit.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { CreateBannerCollectionDialogComponent } from './ad-settings/banner-collections/create-banner-collection-dialog/create-banner-collection-dialog.component';
import { EditBannerCollectionDialogComponent } from './ad-settings/banner-collections/edit-banner-collection-dialog/edit-banner-collection-dialog.component';
import { BannerCreateDialogComponent } from './ad-settings/banner-list/banner-create-dialog/banner-create-dialog.component';
import { BannerEditDialogComponent } from './ad-settings/banner-list/banner-edit-dialog/banner-edit-dialog.component';
import { BannerContentCreateComponent } from './ad-settings/banner-content/banner-content-create/banner-content-create.component';
import { BannerContentEditComponent } from './ad-settings/banner-content/banner-content-edit/banner-content-edit.component';
import { UserProfileComponent } from './ad-users/user-info/user-profile/user-profile.component';
import { UserCardsComponent } from './ad-users/user-info/user-cards/user-cards.component';
import { UserWalletComponent } from './ad-users/user-info/user-wallet/user-wallet.component';
import { UserDepositsComponent } from './ad-users/user-info/user-deposits/user-deposits.component';
import { UserLoansComponent } from './ad-users/user-info/user-loans/user-loans.component';
import { UserCardBalanceDialogComponent } from './ad-users/user-info/user-cards/user-card-balance-dialog/user-card-balance-dialog.component';
import { UserWalletBalanceDialogComponent } from './ad-users/user-info/user-cards/user-wallet-balance-dialog/user-wallet-balance-dialog.component';
import {NgxPermissionsModule} from "ngx-permissions";
import { CreateMessageV2Component } from './ad-dialog/create-message-v2/create-message-v2.component';
import { EditMessageV2Component } from './ad-dialog/edit-message-v2/edit-message-v2.component';
import { MessageDetailsV2Component } from './ad-dialog/message-details-v2/message-details-v2.component';
import { OrderedCardDetailsComponent } from './ad-marketing/ordered-card/ordered-card-details/ordered-card-details.component';
import { OrderedCardChangeStatusComponent } from './ad-marketing/ordered-card/ordered-card-change-status/ordered-card-change-status.component';
import { EditAdminComponent } from './ad-dialog/edit-admin/edit-admin.component';
import { OrderedCardUpdateReasonComponent } from './ad-marketing/ordered-card/ordered-card-update-reason/ordered-card-update-reason.component';
import { UserLoanScheduleComponent } from './ad-users/user-info/user-loans/user-loan-schedule/user-loan-schedule.component';
import { TransactionCheckHoldComponent } from './ad-transactions/transaction-check-hold/transaction-check-hold.component';
import { TransactionConfirmKeyDialogComponent } from './ad-transactions/transaction-confirm-key-dialog/transaction-confirm-key-dialog.component';
import { RedemptionDialogComponent } from './ad-dialog/redemption-dialog/redemption-dialog.component';
import { EditCreateFraudDialogComponent } from './ad-dialog/edit-create-fraud-dialog/edit-create-fraud-dialog.component';
import { AdFilterButtonsComponent } from './ad-filter-buttons/ad-filter-buttons.component';
import { CreateVipLimitDialogComponent } from './ad-users/vip-user/create-vip-limit-dialog/create-vip-limit-dialog.component';
import { EditVipLimitDialogComponent } from './ad-users/vip-user/edit-vip-limit-dialog/edit-vip-limit-dialog.component';
import { GovermentCategoryCreateComponent } from './ad-payment/government-category/goverment-category-create/goverment-category-create.component';
import { GovermentCategoryEditComponent } from './ad-payment/government-category/goverment-category-edit/goverment-category-edit.component';
import { GovernmentAttachPhotoComponent } from './ad-payment/government-category/government-attach-photo/government-attach-photo.component';
import { GovernmentTitleDialogComponent } from './ad-payment/government-category/government-title-dialog/government-title-dialog.component';
import { SearchAddComponent } from './ad-settings/search-add/search-add.component';
import { GovernmentServiceCreateComponent } from './ad-payment/government-service/government-service-create/government-service-create.component';
import { GovernmentServiceEditComponent } from './ad-payment/government-service/government-service-edit/government-service-edit.component';
import { GovernmentResParamCreateComponent } from './ad-payment/government-service/government-res-param-create/government-res-param-create.component';
import { GovernmentResParamEditComponent } from './ad-payment/government-service/government-res-param-edit/government-res-param-edit.component';
import { GovernmentResParamTranslateComponent } from './ad-payment/government-service/government-res-param-translate/government-res-param-translate.component';
import { GovernmentReqParamCreateComponent } from './ad-payment/government-service/government-req-param-create/government-req-param-create.component';
import { GovernmentReqParamEditComponent } from './ad-payment/government-service/government-req-param-edit/government-req-param-edit.component';
import { GovernmentReqParamTranslateComponent } from './ad-payment/government-service/government-req-param-translate/government-req-param-translate.component';
import { GovernmentServiceInfoCreateComponent } from './ad-payment/government-service/government-service-info-create/government-service-info-create.component';
import { GovernmentServiceInfoEditComponent } from './ad-payment/government-service/government-service-info-edit/government-service-info-edit.component';
import { LoanAppGetDialogComponent } from './ad-dialog/loan-app-get-dialog/loan-app-get-dialog.component';
import { StateStatisticsCardComponent } from './ad-state/state-statistics-card/state-statistics-card.component';
import { DetailLoanAppComponent } from './ad-dialog/detail-loan-app/detail-loan-app.component';
import { JobBlockEditComponent } from './ad-dialog/job-block-edit/job-block-edit.component';
import { DepositOpenCheckDialogComponent } from './ad-dialog/deposit-open-check-dialog/deposit-open-check-dialog.component';
import { TransactionCheckS2pComponent } from './ad-transactions/transaction-check-s2p/transaction-check-s2p.component';
import { AutoModelCardComponent } from './my-auto/auto-model-card/auto-model-card.component';
import { AutoModelCreateDialogComponent } from './my-auto/auto-model-create-dialog/auto-model-create-dialog.component';
import { AutoModelEditDialogComponent } from './my-auto/auto-model-edit-dialog/auto-model-edit-dialog.component';
import { AutoModelImageCardComponent } from './my-auto/auto-model-image-card/auto-model-image-card.component';
import { CarColorCreateDialogComponent } from './my-auto/car-color-create-dialog/car-color-create-dialog.component';
import { AutoImageCreateDialogComponent } from './my-auto/auto-image-create-dialog/auto-image-create-dialog.component';
import { AutoImageEditDialogComponent } from './my-auto/auto-image-edit-dialog/auto-image-edit-dialog.component';
import { CarColorEditDialogComponent } from './my-auto/car-color-edit-dialog/car-color-edit-dialog.component';
import { AutoModelInfoLeftComponent } from './my-auto/auto-model-info-left/auto-model-info-left.component';
import { AutoModelInfoRightComponent } from './my-auto/auto-model-info-right/auto-model-info-right.component';
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CarColorInfoLeftComponent } from './my-auto/car-color-info-left/car-color-info-left.component';
import { CarColorInfoRightComponent } from './my-auto/car-color-info-right/car-color-info-right.component';
import { CarColorSimilarAddDialogComponent } from './my-auto/car-color-similar-add-dialog/car-color-similar-add-dialog.component';
import { DepositPercentDialogComponent } from './ad-users/user-info/user-deposits/deposit-percent-dialog/deposit-percent-dialog.component';
import { InternationalTransferInfoComponent } from './ad-transactions/international-transfer-info/international-transfer-info.component';
import { CreateCriticalNotificationComponent } from './ad-dialog/create-critical-notification/create-critical-notification.component';
import { EditCriticalNotificationComponent } from './ad-dialog/edit-critical-notification/edit-critical-notification.component';
import { FailCallHardDialogComponent } from './ad-dialog/fail-call-hard-dialog/fail-call-hard-dialog.component';
import { TransactionLoanToolComponent } from './ad-transactions/transaction-loan-tool/transaction-loan-tool.component';
import { EditSmsDialogComponent } from './ad-dialog/edit-sms-dialog/edit-sms-dialog.component';
import { TransactionLoanToolCauseComponent } from './ad-transactions/transaction-loan-tool/transaction-loan-tool-cause/transaction-loan-tool-cause.component';
import { Offer2Component } from './offer2/offer2.component';
import { CreateOffer2Component } from './offer2/create-offer2/create-offer2.component';
import { EditOffer2Component } from './offer2/edit-offer2/edit-offer2.component';
import { AmlUserOneComponent } from './ad-users/aml-user-one/aml-user-one.component';
import { AmlUserConfirmComponent } from './ad-users/aml-user-confirm/aml-user-confirm.component';
import { VirtualCardDetailsComponent } from './ad-marketing/virtual-card/virtual-card-details/virtual-card-details.component';
import { LoanPortfelAdminStatisticsComponent } from './products/loan-portfel-admin-statistics/loan-portfel-admin-statistics.component';
import { GoldUserOneComponent } from './ad-dialog/gold-user-one/gold-user-one.component';
import { CreateFaqComponent } from './ad-dialog/create-faq/create-faq.component';
import { EditFaqComponent } from './ad-dialog/edit-faq/edit-faq.component';
import { TranslateFaqDialogComponent } from './ad-dialog/translate-faq-dialog/translate-faq-dialog.component';
import { AnswerFaqEditDialogComponent } from './ad-dialog/answer-faq-edit-dialog/answer-faq-edit-dialog.component';
import { AnswerFaqCreateComponent } from './ad-dialog/answer-faq-create/answer-faq-create.component';
import { ScheduleQueeDialogComponent } from './ad-dialog/schedule-quee-dialog/schedule-quee-dialog.component';
import {MatDividerModule} from "@angular/material/divider";
import { CommissionDetailUpdateDialogComponent } from './ad-dialog/commission-detail-update-dialog/commission-detail-update-dialog.component';
import { CommissionConditionUpdateDialogComponent } from './ad-dialog/commission-condition-update-dialog/commission-condition-update-dialog.component';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import { YandexMapDialogComponent } from './ad-dialog/yandex-map-dialog/yandex-map-dialog.component';
import { ProductAccountsActionsDialogComponent } from './ad-dialog/product-accounts-actions-dialog/product-accounts-actions-dialog.component';
import { DetailVirtualCardDialogComponent } from './ad-dialog/detail-virtual-card-dialog/detail-virtual-card-dialog.component';
import { TransactionOperationJsonComponent } from './ad-dialog/transaction-operation-json/transaction-operation-json.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AdStatusDialogComponent,
    AdLoadingDialogComponent,
    AdLeftMenuBlockComponent,
    AdLoginTopBlockComponent,
    AdBtnEyeComponent,
    AdBreadcrumbComponent,
    AdTableComponent,
    AdAgreeDialogComponent,
    AdPaginationComponent,
    SendNotificationDialogComponent,
    SendSmsComponent,
    OfferComponent,
    CreateOfferComponent,
    CreateNotificationDialogComponent,
    CreateSmsDialogComponent,
    BankAdminDetailComponent,
    CreateAdminComponent,
    CreateMessageComponent,
    EditMessageDialogComponent,
    EditNotificationComponent,
    TranslateDialogComponent,
    CategoryTitleDialogComponent,
    AttachPhotoDialogComponent,
    PaynetServiceCreateComponent,
    RequestParamTitleTranslateComponent,
    RequestParamChildCreateComponent,
    MyidFailsByUserComponent,
    TransactionDetailDialogComponent,
    PaynetReponseParamCreateComponent,
    ResponseParamTitleTranslateComponent,
    PaynetResponseParamEditComponent,
    RequestParamChildEditComponent,
    CreateBannerCollectionDialogComponent,
    EditBannerCollectionDialogComponent,
    BannerCreateDialogComponent,
    BannerEditDialogComponent,
    BannerContentCreateComponent,
    BannerContentEditComponent,
    UserProfileComponent,
    UserCardsComponent,
    UserWalletComponent,
    UserDepositsComponent,
    UserLoansComponent,
    UserCardBalanceDialogComponent,
    UserWalletBalanceDialogComponent,
    CreateMessageV2Component,
    EditMessageV2Component,
    MessageDetailsV2Component,
    OrderedCardDetailsComponent,
    OrderedCardChangeStatusComponent,
    EditAdminComponent,
    OrderedCardUpdateReasonComponent,
    UserLoanScheduleComponent,
    TransactionCheckHoldComponent,
    TransactionConfirmKeyDialogComponent,
    RedemptionDialogComponent,
    EditCreateFraudDialogComponent,
    AdFilterButtonsComponent,
    CreateVipLimitDialogComponent,
    EditVipLimitDialogComponent,
    GovermentCategoryCreateComponent,
    GovermentCategoryEditComponent,
    GovernmentAttachPhotoComponent,
    GovernmentTitleDialogComponent,
    SearchAddComponent,
    GovernmentServiceCreateComponent,
    GovernmentServiceEditComponent,
    GovernmentResParamCreateComponent,
    GovernmentResParamEditComponent,
    GovernmentResParamTranslateComponent,
    GovernmentReqParamCreateComponent,
    GovernmentReqParamEditComponent,
    GovernmentReqParamTranslateComponent,
    GovernmentServiceInfoCreateComponent,
    GovernmentServiceInfoEditComponent,
    LoanAppGetDialogComponent,
    StateStatisticsCardComponent,
    DetailLoanAppComponent,
    JobBlockEditComponent,
    DepositOpenCheckDialogComponent,
    TransactionCheckS2pComponent,
    AutoModelCardComponent,
    AutoModelCreateDialogComponent,
    AutoModelEditDialogComponent,
    AutoModelImageCardComponent,
    CarColorCreateDialogComponent,
    AutoImageCreateDialogComponent,
    AutoImageEditDialogComponent,
    CarColorEditDialogComponent,
    AutoModelInfoLeftComponent,
    AutoModelInfoRightComponent,
    CarColorInfoLeftComponent,
    CarColorInfoRightComponent,
    CarColorSimilarAddDialogComponent,
    DepositPercentDialogComponent,
    InternationalTransferInfoComponent,
    CreateCriticalNotificationComponent,
    EditCriticalNotificationComponent,
    FailCallHardDialogComponent,
    TransactionLoanToolComponent,
    EditSmsDialogComponent,
    TransactionLoanToolCauseComponent,
    Offer2Component,
    CreateOffer2Component,
    EditOffer2Component,
    AmlUserOneComponent,
    AmlUserConfirmComponent,
    VirtualCardDetailsComponent,
    LoanPortfelAdminStatisticsComponent,
    GoldUserOneComponent,
    CreateFaqComponent,
    EditFaqComponent,
    TranslateFaqDialogComponent,
    AnswerFaqEditDialogComponent,
    AnswerFaqCreateComponent,
    ScheduleQueeDialogComponent,
    CommissionDetailUpdateDialogComponent,
    CommissionConditionUpdateDialogComponent,
    YandexMapDialogComponent,
    ProductAccountsActionsDialogComponent,
    DetailVirtualCardDialogComponent,
    TransactionOperationJsonComponent,
  ],
  exports: [
    AdLoginTopBlockComponent,
    AdLeftMenuBlockComponent,
    AdLoadingDialogComponent,
    AdBtnEyeComponent,
    AdBreadcrumbComponent,
    AdTableComponent,
    AdPaginationComponent,
    MatProgressBarModule,
    UserProfileComponent,
    UserCardsComponent,
    UserWalletComponent,
    UserDepositsComponent,
    UserLoansComponent,
    AdFilterButtonsComponent,
    StateStatisticsCardComponent,
    AutoModelCardComponent,
    AutoModelImageCardComponent,
    AutoModelInfoLeftComponent,
    AutoModelInfoRightComponent,
    CarColorInfoLeftComponent,
    CarColorInfoRightComponent,
  ],
    imports: [
        CommonModule,
        MatRippleModule,
        MatDialogModule,
        MatButtonModule,
        RouterModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatSelectModule,
        CKEditorModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(maskConfig),
        MatMenuModule,
        NgxPermissionsModule,
        NgxSkeletonLoaderModule,
        MatInputModule,
        FormsModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatCheckboxModule,
        ClipboardModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDividerModule,
      AngularYandexMapsModule
    ]
})
export class AdComponentsModule {
}

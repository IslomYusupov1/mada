import {Injectable} from '@angular/core';
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class LoanService extends MainService {
  protected useBearer = true
  protected returnJson = true

  productLoanTypeGet(data: any) {
    return this.postData('/product/loan/type/get', data)
  }

  issueForceLoan(newStatus: string, loanId: number) {
    return this.postData('/loan/application/item/force/issue', {newStatus, loanId})
  }

  productLoanTypeCreate(data: any) {
    return this.postData('/product/loan/type/create', data)
  }

  getLoanAppList(paging: any, filter: any) {
    return this.postData('/loan/application', {paging, filter})
  }

  getLoanAppProcesslist(data: any) {
    return this.postData('/folder/loan/list/v2', data)
  }

  getLoanAppProcessOne(id: string) {
    return this.postData('/folder/loan/one', {id})
  }

  getLoanAppInsuranceFile(id: number) {
    return this.postData('/loan/application/insurance/file', {id})
  }

  getLoanAppProcessList(data: any) {
    return this.postData('/loan/process', data)
  }

  getOneLoanApp(id: number) {
    return this.postData('/loan/application/item', {id})
  }

  cancelLoan(id: number) {
    return this.postData('/loan/application/cancel', {id})
  }

  loanApplicationStatisticsItem() {
    return this.getData('/loan/application/statistics/item')
  }

  getPaymentDetail(id: number) {
    return this.postData('/loan/application/payment', {id})
  }

  applicationConveyorRefresh(id: number) {
    return this.postData('/loan/application/conveyor/refresh', {id})
  }

  productLoanTypeGetOne(id: string) {
    return this.postData('/product/loan/type/get/one', {id})
  }

  loanExcelDownload(data: any) {
    const token: any = localStorage.getItem('token')
    return this.http.post('https://mob-audit-api-juicer.aab.uz/api/v1/loan/application/download', data, {
      responseType: 'blob',
      headers: {'X-Auth-Token': token}
    })
  }

  productLoanTypeUpdate(data: any) {
    return this.postData('/product/loan/type/update', data)
  }

  productLoanTypeDelete(id: string) {
    return this.postData('/product/loan/type/delete', {id})
  }

  productLoansGet(data: any) {
    return this.postData('/product/loan/filter/by/pagination', data)
  }

  productLoanCreate(data: any) {
    return this.postData('/product/loan/create', data)
  }

  productLoanUpdate(data: any) {
    return this.postData('/product/loan/update', data)
  }

  productLoanActivate(id: string) {
    return this.postData('/product/loan/activate', {id})
  }

  productLoanDeactivate(id: string) {
    return this.postData('/product/loan/deactivate', {id})
  }

  productLoanDelete(id: string) {
    return this.postData('/product/loan/delete', {id})
  }

  productLoanGet(id: string) {
    return this.postData('/product/loan/get', {id})
  }

  folderLoanList(data: any) {
    return this.postData('/folder/loan/list', data)
  }

  folderLoanStatistics(data: { applicationType: string, from: string, to: string }) {
    return this.postData('/folder/statistics', data)
  }

  folderStatisticsSend(data: { applicationType: 'LOAN', from: string, to: string }) {
    return this.postData('/folder/statistics/send', data)
  }

  statisticsAdminIssue(data: { from: string, to: string }) {
    return this.postData('/folder/statistics/admin/issue', data)
  }

  paymentCheckLoan(id: string) {
    return this.postDefaultNoLoad('/payment/tool/check/loan', {id})
  }

  paymentCheckAnor(id: string) {
    return this.postDefaultNoLoad('/payment/tool/check/anor', {id})
  }

  paymentAbsCheck(id: string) {
    return this.postDefaultNoLoad('/payment/tool/check/abs', {id})
  }

  paymentCheckTransaction(id: string) {
    return this.postDefaultNoLoad('/payment/tool/check/debit/transaction', {id})
  }

  paymentCheckCreditTransaction(id: string) {
    return this.postDefaultNoLoad('/payment/tool/check/credit/transaction', {id})
  }

  paymentToolChangedBy(id: string) {
    return this.postDefaultNoLoad('/payment/tool/changed/by', {id})
  }

  paymentToolConfirmTransaction(id: string) {
    return this.postData('/payment/tool/transaction/reverse/approve', {id})
  }

  paymentToolCancelTransaction(id: string) {
    return this.postData('/payment/tool/transaction/cancel/prepare', {id})
  }

  paymentToolPrepareTransaction(data: { id: string, cause: string }) {
    return this.postData('/payment/tool/transaction/reverse/prepare', data)
  }

  insuranceGetList(data: { page: number, size: number }) {
    return this.postData('/insurance/get/list', data)
  }

  loanBlackList(data: any) {
    return this.postData('/loan/black/list', data)
  }

  loanBlackListAdd(data: { pinfl: string, loanType: Array<string>, adminComment: string }) {
    return this.postData('/loan/black/list/add', data)
  }

  loanBlackListEdit(data: { id: number, loanType: Array<string>, adminComment: string }) {
    return this.postData('/loan/black/list/edit', data)
  }

  loanBlackListDelete(data: { id: number }) {
    return this.postData('/loan/black/list/delete', data)
  }
}

import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {Observable} from "rxjs";
import {TLimitAddRequest} from "../ad-views/user/user-bank-limits/user-bank-limit-one/user-bank-limit-one.component";

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService {
  protected useBearer = true
  protected returnJson = true

  userAdminOne(id: string) {
    return this.postData('/admin/user/one', {id})
  }

  getRedemption(id: string) {
    return this.postData('/loan/check/redemption', {id})
  }

  operationMerchantList() {
    return this.getData('/operation/merchant/list')
  }

  operationCategoryList() {
    return this.getData('/operation/category/list')
  }

  operationRecipientListByMerchant(merchant: string) {
    return this.postData('/operation/recipient/list/by/merchant', {merchant})
  }

  depositOpenCheck(id: number) {
    return this.postData('/deposit/open/check', {id})
  }

  depositOpenTry(id: number) {
    return this.postData('/deposit/open/try', {id})
  }

  depositPercentCheck(id: string) {
    return this.postData('/deposit/percent/check', {id})
  }

  depositPercentWallet(data: { amount: number, depId: string }) {
    return this.postData('/deposit/percent/wallet', data)
  }

  depositIncreaseTry(id: number) {
    return this.postData('/deposit/increase/try', {id})
  }

  uploadImageNotify(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`https://mob-file-juicer.aab.uz/file/upload/general/notify`, formData, {
      headers: {
        'Authorization': 'Basic bW9iLWZyb250OjcwYXVLeE10UzZOSHhRQTQ='
      }
    })
  }

  userProfileList(paging: any) {
    return this.postData('/user/profile/get/list', {paging})
  }

  createRole(data: any) {
    return this.postData('/role/create', data)
  }

  getOneRole(id: any) {
    return this.postData('/role/get/one', {id})
  }

  editRole(data: any) {
    return this.postData('/role/edit', data)
  }

  userMyIDFailList(data: any) {
    return this.postData('/user/myid/fail/list', data)
  }

  userMyIDFailByUser(id: string) {
    return this.postData('/user/myid/fail/by/user', {id})
  }

  userClientGetOne(id: string) {
    return this.postData('/user/one', {id})
  }

  userClientCardList(userUUID: string) {
    return this.postData('/card/list', {userUUID})
  }

  userClientCardBalance(cardId: number, userId: string) {
    return this.postData('/card/balance/one', {cardId, userId})
  }

  userClientWalletBalance(ident: string, userId: string) {
    return this.postData('/wallet/balance', {ident, userId})
  }

  userWalletReopen(walletUuid: string, userUuid: string) {
    return this.postData('/wallet/reopen', {userUuid, walletUuid})
  }

  userWalletOpen(userUUID: string) {
    return this.postData('/wallet/open/new', {userUUID})
  }

  userClientWalletList(user: string) {
    return this.postData('/wallet/list', {user})
  }

  userClientDepositList(id: string) {
    return this.postData('/deposit/list', {id})
  }

  userClientLoansList(id: string) {
    return this.postData('/loan/list', {id})
  }

  getUserClientLoanSchedule(data: any) {
    return this.postData('/loan/payment/schedule', data)
  }

  getPensionOne(uuid: string) {
    return this.postData('/pension/get', {uuid})
  }

  getPensionList(data: any) {
    return this.postData('/pension/get/list', data)
  }

  getUserRoles(data: any) {
    return this.postData('/role/get/list/paging', data)
  }

  getRoles() {
    return this.getData('/role/get/list')
  }

  getJobBlockList() {
    return this.getData('/job-block-time/get/list')
  }

  getOneJobBlock(jobBlockType: string) {
    return this.postData('/job-block-time/get/one', {jobBlockType})
  }

  jobBlockEdit(data: { startTime: string, endTime: string, type: string, description: string, alwaysOn: boolean }) {
    return this.postData('/job-block-time/edit', data)
  }

  userGetList(data: any) {
    return this.postData('/user/filter', data)
  }

  userProfileStatusList(data: any) {
    return this.postData('/vip/user/get/list', data)
  }

  addressRegionList() {
    return this.getData('/address/region/list')
  }

  vipUserLimits(id: string) {
    return this.postData('/vip/user/get/limit/list', {id})
  }

  vipUserTransactionLimitAdd(data: any) {
    return this.postData('/vip/user/add/transaction/limit', data)
  }

  vipUserTransactionLimitUpdate(data: any) {
    return this.postData('/vip/user/update/transaction/limit', data)
  }

  vipUserTransactionLimitDelete(id: string) {
    return this.postData('/vip/user/delete/transaction/limit', {id})
  }

  vipUserPeriodList() {
    return this.getData('/vip/user/get/period/list')
  }

  operationTypeList() {
    return this.getData('/operation/type/list')
  }

  operationCodeList(operationType: string) {
    return this.postData('/operation/code/list', {operationType})
  }

  exportToExcel(data: any) {
    const token: any = localStorage.getItem('token')
    return this.http.post('https://mob-audit-api-juicer.aab.uz/api/v1/user/download/filter', data, {
      responseType: 'blob',
      headers: {'X-Auth-Token': token}
    })
  }

  transactionExportToExcel(data: any, path: string) {
    const token: any = localStorage.getItem('token')
    const url = 'https://mob-audit-api-juicer.aab.uz/api/v1' + path
    return this.http.post(url, data, {
      responseType: 'blob',
      headers: {'X-Auth-Token': token}
    })
  }

  inpsTransactionExportToExcel(data: any, path: string) {
    const token: any = localStorage.getItem('token')
    const url = 'https://mob-audit-api-juicer.aab.uz/api/v1' + path
    return this.http.post(url, data, {
      responseType: 'blob',
      headers: {'X-Auth-Token': token}
    })
  }

  getAdminUserList(data: any) {
    return this.postData('/admin/user/list', data)
  }

  getAdminUserFilterList(data: any) {
    return this.postData('/admin/user/filter', data)
  }

  deleteAdminUser(id: string) {
    return this.postData('/admin/user/delete', {id})
  }

  getFailTransactions(paging: any, filter: { from: string, to: string }) {
    return this.postData('/wallet/transaction/fail/list', {paging, filter})
  }

  getDetailTransactionFail(transID: any) {
    return this.postData('/wallet/transaction/fail/one', {transID})
  }

  callFailHard(data: any) {
    return this.postData('/wallet/transaction/fail/call/hard', data)
  }

  getUserListForNotification(phone: string) {
    return this.postData('/notification/user/get/list', {phone})
  }

  sendToAllUsers(notificationId: string) {
    return this.postData('/notification/send/list', {notificationId})
  }
  stopTopicSend(id: string) {
    return this.postData('/notification/schedule/stop/send-topic', {id})
  }
  stopChosenSend(id: string) {
    return this.postData('/notification/schedule/stop/send-chosen-users', {id})
  }

  homeSend(notificationId: string) {
    return this.postData('/notification/home/send', {notificationId})
  }

  sentSmsUSer(smsId: string) {
    return this.postData('/sms/send/all', {smsId})
  }

  deleteSms(id: string) {
    return this.postData('/sms/delete', {id})
  }

  sentSmsToOneUser(data: any) {
    return this.postData('/sms/send/user', data)
  }

  sendToOneUser(data: any) {
    return this.postData('/notification/send', data)
  }

  getSmsList(data: any) {
    return this.postData('/sms/get/list', data)
  }

  getSmsOne(id: string) {
    return this.postData('/sms/get/one', {id})
  }

  createNotification(data: any) {
    return this.postData('/notification/add', data)
  }

  editNotification(data: any) {
    return this.postData('/notification/edit', data)
  }

  deleteNotification(id: string) {
    return this.postData('/notification/delete', {id})
  }
  detailQueue(id: string) {
    return this.postData('/notification/schedule/get/send-chosen-users/queue', {id})
  }
  editPension(data: any) {
    return this.postData('/pension/edit', data)
  }

  createUserAdmin(data: any) {
    return this.postData('/admin/user/create', data)
  }

  editUserAdmin(data: any) {
    return this.postData('/admin/user/edit', data)
  }

  createSms(data: any) {
    return this.postData('/sms/add', data)
  }

  editSms(data: any) {
    return this.postData('/sms/edit', data)
  }

  reId(id: string) {
    return this.postData('/user/reidentify', {id})
  }

  changeToVipStatus(id: string) {
    return this.postData('/vip/user/update', {id})
  }

  deleteVipStatus(id: string) {
    return this.postData('/vip/user/delete', {id})
  }

  userDboStatistics() {
    return this.getData('/user/statistics')
  }

  transactionHistory(data: any) {
    return this.postData('/transaction/history', data)
  }
  operationTransactionList(operationId: number) {
    return this.postData('/operation-transactions/list', {operationId})
  }

  inpsTransactionHistory(data: any) {
    return this.postData('/inps/history', data)
  }

  transactionStatistics(data: any) {
    return this.postData('/transaction/statistics', data)
  }

  transactionStatisticsV2(data: {period: string}) {
    return this.postData('/transaction/statistics/v2', data)
  }

  transactionStatisticsSync(data: {period: string}) {
    return this.postData('/transaction/statistics/sync', data)
  }

  transactionTypesList() {
    return this.getData('/transaction/history/types')
  }

  transactionServiceTypes(serviceType: string) {
    return this.postData('/transaction/history/service/types', {serviceType})
  }

  transactionCheckHold(id: string) {
    return this.postData('/transaction/check/hold', {id})
  }

  transactionS2PCheck(id: string) {
    return this.postData('/transaction/history/check/s2p', {id})
  }

  transactionConfirmHold(id: string) {
    return this.postData('/transaction/confirm/hold', {id})
  }

  loanTransactionStatusChange(id: string) {
    return this.postData('/loan/status/change', {id})
  }

  loanRedemptionRegister(paymentDate: string) {
    return this.postData('/loan/redemption/register', {paymentDate})
  }

  loanConfirmPayment(id: string) {
    return this.postData('/loan/confirm/payment', {id})
  }

  getPermissions() {
    return this.getData('/role/permission/get/list')
  }

  imtHistory(data: any) {
    return this.postData('/imt/history', data)
  }

  imtHistoryGetOne(id: number) {
    return this.postData('/imt/history/one', {id})
  }

  notificationFileGet(id: string) {
    const token: any = localStorage.getItem('token')
    const url = 'https://mob-audit-api-juicer.aab.uz/api/v1/notification/file/get'
    return this.http.post(url, {id}, {
      headers: {'X-Auth-Token': token}
    }).toPromise().then((res: any) => {
      return res && res.data ? res.data : res
    })
  }

  userBankLimitBankList() {
    return this.getData('/bank/transaction/limit/bank/list')
  }

  userBankTransactionLimitGet(id: number) {
    return this.postData('/bank/transaction/limit/get', {id})
  }

  userBankTransactionLimitAdd(data: TLimitAddRequest) {
    return this.postData('/bank/transaction/limit/add', data)
  }

  userBankTransactionLimitEdit(data: { id: number, amountLimit: number, countLimit: number }) {
    return this.postData('/bank/transaction/limit/edit', data)
  }

  userBankTransactionLimitDelete(id: number) {
    return this.postData('/bank/transaction/limit/delete', {id})
  }

  userBankTransactionCardTypeList() {
    return this.getData('/bank/transaction/limit/card/type/list')
  }

  userBankTransactionOperationCodeList(data: { operationType: string, cardType: string, bankId: number }) {
    return this.postData('/bank/transaction/limit/operation/code/list', data)
  }

  getAdminProfile() {
    return this.getData('/admin/profile/get')
  }

  adminPasswordChangeInit(data: { passwordOld: string, passwordNew: string }) {
    return this.postData('/auth/admin/password/change/init', data)
  }

  adminPasswordChangeConfirm(data: { identity: string, code: string }) {
    return this.postData('/auth/admin/password/change/confirm', data)
  }

  toolPrepareList(data: any) {
    return this.postData('/payment/tool/prepare/list', data)
  }

  userCheckAmlFilter(data: any) {
    return this.postData('/check/aml/filter', data)
  }

  userCheckAmlGetOne(id: number) {
    return this.postData('/check/aml/get/one', {id})
  }

  userCheckAmlFromAbs(id: number) {
    return this.postData('/check/aml/check', {id})
  }

  userCheckAmlRead(id: number) {
    return this.postData('/check/aml/read', {id})
  }

  userCheckAmlConfirm(data: {id: number, comment: string}) {
    return this.postData('/check/aml/confirm', data)
  }

  userPromoCodeFilterList(data: any) {
    return this.postData('/promocode/filter/list',data)
  }
}

import {Injectable} from '@angular/core';
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class FaqService extends MainService {
  protected useBearer = true
  protected returnJson = true

  getFaqList() {
    return this.getData('/chat/faq/list')
  }

  getOneFaq(id: number) {
    return this.postData('/chat/faq/one', {id})
  }

  createFaq(parent: number, text: string) {
    return this.postData('/chat/faq/create', {parent, text})
  }

  editFaq(data:{id: number, text: string, visible: boolean}) {
    return this.postData('/chat/faq/edit', data)
  }
  translateFaq(data:any) {
    return this.postData('/chat/faq/translate',data)
  }
  orderFaq(list: Array<any>) {
    let content = list.map((value, index) => {
      return index + 1 && value.id
    })
    const obj = Object.assign({}, content)
    return this.postData('/chat/faq/order', obj)
  }
  answerFaq(questionId:number) {
    return this.postData('/chat/faq/answer',{questionId})
  }
  answerFaqOne(id:number) {
    return this.postData('/chat/faq/answer/one',{id})
  }
  answerFaqCreate(questionId:number,text:string,actionType:string,actionText:string) {
    return this.postData('/chat/faq/answer/create',{questionId,text,actionType,actionText})
  }
  answerFaqEdit(data:{id:number,text:string,actionType:string}) {
    return this.postData('/chat/faq/answer/edit',data)
  }
  answerFaqTranslate(data:any) {
    return this.postData('/chat/faq/answer/translate',data)
  }
  answerFaqActionTranslate(data:any) {
    return this.postData('/chat/faq/answer/action/translate',data)
  }
}

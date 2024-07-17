import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuperOperatorChatService {
  token: any;
  socket: any;

  public info$: BehaviorSubject<any> = new BehaviorSubject(null);
  public message$: BehaviorSubject<any> = new BehaviorSubject(null);
  public messageHistory$: BehaviorSubject<any> = new BehaviorSubject(null);
  public waitingRooms$: BehaviorSubject<any> = new BehaviorSubject(null);
  public activeRooms$: BehaviorSubject<any> = new BehaviorSubject(null);
  public activeRoomsSearch$: BehaviorSubject<any> = new BehaviorSubject(null);
  public operators$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.token = localStorage.getItem('chatToken') ? localStorage.getItem('chatToken') : ''
  }

  public getAllInfo = () => {
    this.socket = io(environment.SOCKET_ENDPOINT, {transports: ['websocket']})

    this.socket.emit('super-init', this.token, 0, 10)

    this.socket.on('super-info', (rooms: any) => {
      this.info$.next(rooms)
    })

    return this.info$.asObservable()
  }

  public getNewMessageRooms = () => {
    this.socket.on('super-wait', (rooms: any) => {
      this.waitingRooms$.next(rooms)
    })

    return this.waitingRooms$.asObservable()
  }

  public getActiveRooms = () => {
    this.socket.on('super-active', (rooms: any) => {
      this.activeRooms$.next(rooms)
    })

    return this.activeRooms$.asObservable()
  }

  public getSearchActiveRooms = () => {
    this.socket.on('super-active-search', (rooms: any) => {
      this.activeRoomsSearch$.next(rooms)
    })

    return this.activeRoomsSearch$.asObservable()
  }

  public getOperators = () => {
    this.socket.on('super-operators', (operator: any) => {
      this.operators$.next(operator)
    })

    return this.operators$.asObservable()
  }

  public getAllMessages = () => {
    this.socket.on('send-chat-messages', (message: any) => {
      this.message$.next(message.messages)
    })

    this.socket.on('message', (message: any) => {
      this.message$.next(message);
    })

    return this.message$.asObservable()
  }

  public getHistoryMessage = () => {
    this.socket.on('history-message', (message: any) => {
      this.messageHistory$.next(message);
    })

    return this.messageHistory$.asObservable()
  }

  emitChatHistories(page: number, userId: string) {
    this.socket.emit('get-histories', page, 2, userId)
  }

  getActiveSuper(text: string, page: number) {
    this.socket.emit('get-active-super', text, page)
  }

  closeChat() {
    this.socket.emit('chatMessage', '', null, true)
  }

  socketLeave() {
    this.socket.emit('operator-leave')
  }

  getMessages(roomId: string) {
    this.socket.emit('get-chat-messages-super', roomId)
  }

  sendMessage(message: string) {
    this.socket.emit('chatMessage', message);
  }
}

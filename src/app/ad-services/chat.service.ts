import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token: any;
  socket: any;

  public messages$: BehaviorSubject<any> = new BehaviorSubject(null);
  public message$: BehaviorSubject<any> = new BehaviorSubject(null);
  public messageHistory$: BehaviorSubject<any> = new BehaviorSubject(null);
  public newMessages$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.token = localStorage.getItem('chatToken') ? localStorage.getItem('chatToken') : ''
  }

  public getAllRooms = () => {
    this.socket = io(environment.SOCKET_ENDPOINT, {transports: ['websocket']})

    this.socket.emit('operator-init', this.token, 0, 10)

    this.socket.on('operator-info', (rooms: any) => {
      this.messages$.next(rooms.rooms)
    })

    return this.messages$.asObservable()
  }

  public getNewMessageRooms = () => {
    this.socket.on('new-rooms', (rooms: any) => {
      this.newMessages$.next(rooms.rooms)
    })

    return this.newMessages$.asObservable()
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

  closeChat() {
    this.socket.emit('chatMessage', '', null, true)
  }

  socketLeave() {
    this.socket.emit('operator-leave')
  }

  getMessages(roomId: string) {
    this.socket.emit('get-chat-messages', roomId)
  }

  sendMessage(message: string) {
    this.socket.emit('chatMessage', message);
  }

  sendFile(fileId: string) {
    this.socket.emit('chatMessage', fileId, null, false, 'FILE')
  }
}

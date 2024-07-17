import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HrService} from "../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuperOperatorChatService} from "../../../ad-services/super-operator-chat.service";
import {ChatImageDialogComponent} from "../../online-chat/chat-image-dialog/chat-image-dialog.component";
import {log} from "util";
import {Observable} from "rxjs";

@Component({
  selector: 'app-super-operator-chat',
  templateUrl: './super-operator-chat.component.html',
  styleUrls: ['./super-operator-chat.component.scss']
})
export class SuperOperatorChatComponent implements OnInit {
  @ViewChild('chatList') myScrollContainer!: ElementRef;
  // @ViewChild('chatInput') chatInput!: ElementRef;

  messageList: Array<any> = []
  roomList: Array<any> = []
  newRoomsList: Array<any> = []
  operatorsList: Array<any> = []
  corpName: string = ''
  operatorName: string = ''
  roomId: string = ''
  chatHistory: boolean = false
  fileInputStyle: boolean = true
  isChat: boolean = true
  show: boolean = true
  loading: boolean = false
  loadContent: boolean = false
  toBottom: boolean = false
  page: number = 0
  userId: string = ''
  activeRoomPage: number = 1
  isSearchActiveRooms: boolean = false
  searchByText: boolean = false
  searchModel: string = ''

  chatForm: FormGroup = new FormGroup({
    chatMessage: new FormControl('', Validators.compose([]))
  })

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.clearMessageContent()
  }

  clearMessageContent(): void {
    this.messageList = []
    this.isChat = true
    this.corpName = ''
    this.roomId = ''
    this.page = 0
    this.loading = false
    this.toBottom = false
    this.loadContent = false
    this.superOperatorChatService.socketLeave()
  }

  constructor(
    private superOperatorChatService: SuperOperatorChatService,
    public hrService: HrService,
    public dialog: MatDialog
  ) {
  }

  public searchResult$!: Observable<Array<any>>

  ngOnInit(): void {
    const search = document.querySelector('#search') as HTMLElement


    this.superOperatorChatService.getAllInfo().subscribe((rooms: any) => {
      if (rooms) {
        if (!this.isSearchActiveRooms) {
          this.roomList = rooms.activeRooms
        }
        this.newRoomsList = rooms.waitRooms
        this.operatorsList = rooms.operators
      }
    })

    this.superOperatorChatService.getNewMessageRooms().subscribe((rooms: any) => {
      if (rooms) {
        this.newRoomsList = rooms.waitRooms
      }
    })

    this.superOperatorChatService.getActiveRooms().subscribe((rooms: any) => {
      if (rooms) {
        if (!this.isSearchActiveRooms) {
          this.roomList = rooms.activeRooms
        }
      }
    })

    this.superOperatorChatService.getSearchActiveRooms().subscribe((rooms: any) => {
      if (rooms) {
        if (this.searchByText) {
          this.searchByText = false
          this.roomList = rooms.activeRooms
          this.activeRoomPage++
        } else {
          this.roomList.push(...rooms.activeRooms)
          this.activeRoomPage++
        }
      }
    })

    this.superOperatorChatService.getOperators().subscribe((operator: any) => {
      if (operator) {
        this.operatorsList = operator.operators
      }
    })
    //
    this.superOperatorChatService.getAllMessages().subscribe((message: any) => {
      if (message) {
        if (Array.isArray(message.messageList)) {
          if (message.messageList.length === 0 && !message.last) {
            this.toBottom = true
            this.loadContent = true
            this.getChatHistory()
          } else {
            this.messageList = message.messageList
            this.chatHistory = message.last
            this.loadContent = false
            this.toBottom = false
          }
          console.log(message.messageList)
        } else {
          this.messageList.push(message)
          this.loadContent = false
          this.toBottom = false
        }
        setTimeout(() => {
          this.scrollToBottom()
        }, 50);
      } else {
        this.messageList = []
        this.loadContent = false
        setTimeout(() => {
          this.scrollToBottom()
        }, 50);
      }
    })

    this.superOperatorChatService.getHistoryMessage().subscribe((message: any) => {
      if (message) {
        let historyMessage: Array<any> = message.messageList
        this.messageList = historyMessage.concat(this.messageList)
        console.log(this.messageList)
        this.chatHistory = message.last
        this.loadContent = false
        this.loading = false
        if (this.toBottom) {
          setTimeout(() => {
            this.scrollToBottom()
            this.toBottom = false
          }, 0)
        }
      }
    })
  }

  getChat(room: any) {
    this.loadContent = true
    this.isChat = false
    this.messageList = []
    this.roomId = room.id
    this.page = 0
    this.operatorName = room.oper_name ? `Operator: ${room.oper_name}` : 'Operator: неизвестно'
    // @ts-ignore
    this.corpName = room.room_name
    this.userId = room.user_id
    for (let i = 0; i < this.roomList.length; i++) {
      this.roomList[i].active = false;
    }
    room.active = !room.active
    this.superOperatorChatService.getMessages(room.id)
  }

  getChatHistory() {
    this.loading = true
    this.chatHistory = true
    this.superOperatorChatService.emitChatHistories(this.page, this.userId)
    this.page++
  }

  sendMsg() {
    if (this.chatForm.valid) {
      // this.chatService.sendMessage(this.chatForm.value.chatMessage)
      this.chatForm.patchValue({
        chatMessage: ''
      })
    }
  }

  clickFileInput() {
    document.getElementById('fileInput')?.click()
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy() {
    location.reload()
  }

  showMoreActiveRooms(): void {
    this.superOperatorChatService.getActiveSuper(this.searchModel.toUpperCase(), this.activeRoomPage)
  }

  openChatImageDialog(path: string) {
    this.dialog.open(ChatImageDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      height: '90%',
      data: {
        path
      }
    })
  }

  searchRooms(): void {
    if (this.searchModel.length >= 4) {
      this.activeRoomPage = 0
      this.searchByText = true
      this.isSearchActiveRooms = true
      this.superOperatorChatService.getActiveSuper(this.searchModel.toUpperCase(), this.activeRoomPage)
      this.clearMessageContent()
    }

    if (this.searchModel.length === 0) {
      this.activeRoomPage = 0
      this.searchByText = true
      this.isSearchActiveRooms = false
      this.superOperatorChatService.getActiveSuper('', this.activeRoomPage)
      this.clearMessageContent()
    }
  }

  clearInput(): void {
    this.searchModel = ''
    this.activeRoomPage = 0
    this.searchByText = true
    this.isSearchActiveRooms = false
    this.superOperatorChatService.getActiveSuper('', this.activeRoomPage)
    this.clearMessageContent()
  }

  closeChat() {
    // this.chatService.closeChat()
  }

  scrollToBottom(): void {
    if (this.myScrollContainer) {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {
      }
    }
  }

}

import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../ad-services/chat.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {ChatImageDialogComponent} from "../../online-chat/chat-image-dialog/chat-image-dialog.component";
import {PointService} from "../../../ad-services/point.service";

@Component({
  selector: 'app-online-chat',
  templateUrl: './online-chat.component.html',
  styleUrls: ['./online-chat.component.scss']
})
export class OnlineChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatList') myScrollContainer!: ElementRef;
  @ViewChild('chatInput') chatInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  messageList: Array<any> = []
  roomList: Array<any> = []
  newRoomsList: Array<any> = []
  corpName: string = ''
  corpStatus: string = ''
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
  isFile: boolean = false
  heightWithFile: string = '64px'
  uploadedImage: string | null | ArrayBuffer = ''
  attachmentId: string = ''

  chatForm: FormGroup = new FormGroup({
    chatMessage: new FormControl('', Validators.compose([]))
  })

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.messageList = []
    this.isChat = true
    this.corpName = ''
    this.roomId = ''
    this.page = 0
    this.loading = false
    this.toBottom = false
    this.loadContent = false
    this.chatService.socketLeave()
  }

  constructor(
    private chatService: ChatService,
    private pointService: PointService,
    public hrService: HrService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.chatService.getAllRooms().subscribe((rooms: any) => {
      if (rooms) {
        this.roomList = rooms
      }
    })

    this.chatService.getNewMessageRooms().subscribe((rooms: any) => {
      if (rooms) {
        this.newRoomsList = rooms
      }
    })

    this.chatService.getAllMessages().subscribe((message: any) => {
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
        } else {
          this.messageList.push(message)
          this.loadContent = false
          this.toBottom = false
        }
        setTimeout(() => {
          this.scrollToBottom()
        }, 50);
        console.log(this.messageList)
      } else {
        this.messageList = []
        this.loadContent = false
        setTimeout(() => {
          this.scrollToBottom()
        }, 50);
      }
    })

    this.chatService.getHistoryMessage().subscribe((message: any) => {
      if (message) {
        let historyMessage: Array<any> = message.messageList
        this.messageList = historyMessage.concat(this.messageList)
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
    // this.corpStatus = room.status
    // @ts-ignore
    this.corpName = room.room_name
    this.userId = room.user_id
    for (let i = 0; i < this.roomList.length; i++) {
      this.roomList[i].active = false;
    }
    room.active = !room.active
    this.chatService.getMessages(room.id)
    setTimeout(() => {
      this.chatInput.nativeElement.focus()
    }, 500)
  }

  getChatHistory() {
    this.loading = true
    this.chatHistory = true
    this.chatService.emitChatHistories(this.page, this.userId)
    this.page++
  }

  sendMsg() {
    if (this.chatForm.valid || this.isFile) {
      if (this.isFile) {
        this.chatService.sendFile(this.attachmentId)
        this.clearFile()
        this.chatForm.patchValue({
          chatMessage: ''
        })
      } else {
        this.chatService.sendMessage(this.chatForm.value.chatMessage)
        this.chatForm.patchValue({
          chatMessage: ''
        })
      }
    }
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

  uploadImage(event: any) {
    let target = event.target
    let selectedFile = target.files[0]
    let type = selectedFile.type.split('/')[0]
    console.log('ImageType: ' + type)
    if (type != 'image') {
      alert('пожалуйста, выберите изображение')
      return
    }
    let fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => {
      localStorage.setItem('loadingCol', '1')
      this.pointService.uploadChatImage(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.attachmentId = event.result.data.fileId
            this.uploadedImage = fileReader.result
            this.isFile = true
            this.heightWithFile = '130px'
            setTimeout(() => {
              this.scrollToBottom()
            }, 50)
            localStorage.setItem('loadingCol', '0')
          }
        }
      }, (e)=>{
        localStorage.setItem('loadingCol', '0')
      })
    }
    fileReader.onerror = () => {
      this.uploadedImage = './assets/images/default-image.png'
    }

  }

  clearFile(): void {
    this.uploadedImage = ''
    this.isFile = false
    this.heightWithFile = '64px'
    this.fileInput.nativeElement.value = ''
    setTimeout(() => {
      this.scrollToBottom()
    }, 50)
  }

  clickFileInput() {
    document.getElementById('fileInput')?.click()
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy() {
    location.reload()
  }

  closeChat() {
    this.chatService.closeChat()
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

import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../models/Message';
import {AuthService} from '../../../../services/auth.service';
import {Attachment} from '../../../../models/Attachment';
import {environment} from '../../../../../environments/environment';
import {saveAs} from 'file-saver';
import {FileService} from '../../../../services/file.service';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit {
  @Input() message: Message;

  constructor(
    private authService: AuthService,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
  }

  getCurrentUserUsername() {
    console.log(this.authService.getUsername());
    return this.authService.getUsername();
  }

  onReplySent(reply: Message) {
    this.message.reply = reply;
  }


  onAttachmentDownload(attachment: Attachment) {
    this.fileService.getFileAsBlob(environment.apiUrl + '/attachments/' + attachment.id).subscribe(data => {
      saveAs(data, attachment.fileName);
    });
  }
}

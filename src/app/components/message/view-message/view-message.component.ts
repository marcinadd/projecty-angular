import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';
import {Attachment} from '../../../models/Attachment';
import {FileService} from '../../../services/file.service';
import {saveAs} from 'file-saver';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  messageId = Number(this.route.snapshot.paramMap.get('id'));
  message: Message;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.messageService.getMessage(this.messageId).subscribe(message => {
      this.message = message;
      console.log(message);
    }, () => {
      this.router.navigate(['messages']);
    });
  }

  onAttachmentDownload(attachment: Attachment) {
    this.fileService.getFileAsBlob(environment.apiUrl + '/attachments/' + attachment.id).subscribe(data => {
      saveAs(data, attachment.fileName);
    });
  }
}

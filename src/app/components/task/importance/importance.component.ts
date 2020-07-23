import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-importance',
  templateUrl: './importance.component.html',
  styleUrls: ['./importance.component.css']
})
export class ImportanceComponent implements OnInit {
  @Input() importance: number;
  @Input() readonly = false;
  @Output() importanceChanged = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onImportanceSelected(value: number) {
    if (!this.readonly) {
      this.importance = value;
      this.importanceChanged.emit(value);
    }
  }
}

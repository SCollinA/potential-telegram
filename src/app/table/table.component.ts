import { Component, OnInit, Input} from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  openModalEventId: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  openModal(): void {
    this.eventService.triggerEvent(this.openModalEventId);
  }
}

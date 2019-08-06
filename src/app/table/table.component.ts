import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  emphasis = '';

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  openModal(): void {
    this.eventService.triggerEvent('openForm');
  }
}

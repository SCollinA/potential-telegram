import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input()
  openModalEventId: string;

  emphasis = '';
  eventSubscription: Subscription;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventSubscription = this.eventService.subscribeToEvent(this.openModalEventId, () => {
      this.emphasis = 'really';
    });
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  openModal(): void {
    this.eventService.triggerEvent(this.openModalEventId);
  }
}

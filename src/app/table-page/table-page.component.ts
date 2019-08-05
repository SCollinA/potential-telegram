import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit, OnDestroy {

  componentId: string;
  openModalEventId: string;
  closeModalEventId: string;
  eventSubscription: Subscription;

  isModalOpen = false;

  constructor(private eventService: EventService) {

  }

  ngOnInit() {
    this.componentId = this.eventService.registerComponent();

    let event = this.eventService.registerEvent(
      this.componentId,
      () => this.isModalOpen = true
    );
    this.openModalEventId = event.eventId;
    event = this.eventService.registerEvent(
      this.componentId,
      () => this.isModalOpen = false
    );
    this.closeModalEventId = event.eventId;
    this.eventSubscription = event.eventSubscription;
  }

  ngOnDestroy() {
    // write unregister function that does all this
    this.eventSubscription.unsubscribe();
    this.eventService.unregisterComponent(this.componentId);
    this.eventService.unregisterEvent(this.closeModalEventId);
    this.eventService.unregisterEvent(this.openModalEventId);
  }
}

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
    // self reference
    this.componentId = this.eventService.registerComponent();

    // event references
    this.openModalEventId = this.eventService.registerEvent(this.componentId);
    this.closeModalEventId = this.eventService.registerEvent(this.componentId);

    // listening for events
    this.eventSubscription = this.listenForEvents();
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  private listenForEvents(): Subscription {
    return this.eventService.event.subscribe((event: any) => {
      if (event.targetId === this.componentId) {
        this.handleEvent(event);
      }
    });
  }

  private handleEvent(event: any): void {
    switch (event.eventId) {
      case this.openModalEventId: this.isModalOpen = true;
                                  break;
      case this.closeModalEventId: this.isModalOpen = false;
                                   break;
      default: break;
    }
  }

}

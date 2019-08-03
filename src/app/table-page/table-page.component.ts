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
    this.openModalEventId = this.eventService.registerEvent(this.componentId);
    this.closeModalEventId = this.eventService.registerEvent(this.componentId);

    this.eventSubscription = this.eventService.event.subscribe((event: any) => {
      if (event.targetId === this.componentId) {
        this.handleEvent(event);
      }
    });
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  private handleEvent(event: any): void {
    console.log('event', event);
    switch (event.eventId) {
      case this.openModalEventId: this.isModalOpen = true;
                                  break;
      case this.closeModalEventId: this.isModalOpen = false;
                                   break;
      default: break;
    }
  }

}

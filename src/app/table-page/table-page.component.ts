import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../events.service';
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

  modalIsOpen = false;

  constructor(private eventService: EventService) {

  }

  ngOnInit() {
    this.componentId = this.eventService.registerComponent();
    this.openModalEventId = this.eventService.registerEvent();
    this.closeModalEventId = this.eventService.registerEvent();

    this.eventSubscription = this.eventService.event.subscribe(this.handleEvents);
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  private handleEvents(event: any): void {
    console.log('event', event);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  componentId: string;
  closeFormEventId: string;
  eventSubscription: Subscription;

  isModalOpen = false;

  constructor(private eventService: EventService) {

  }

  ngOnInit() {
    // self reference
    this.componentId = this.eventService.registerComponent();

    // event reference
    this.closeFormEventId = this.eventService.registerEvent(this.componentId);

    this.eventSubscription = this.listenForEvents();
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  private listenForEvents(): Subscription {
    return this.eventService.event.subscribe(this.handleEvent);
  }

  private handleEvent(event: any): void {
    if (event.targetId !== this.componentId) { return; }
    switch (event.eventId) {
      case this.closeFormEventId: history.back();
                                  break;
      default: break;
    }
  }

}

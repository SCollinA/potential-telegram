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
    this.componentId = this.eventService.registerComponent();

    const event = this.eventService.registerEvent(
      this.componentId,
      () => history.back()
    );
    this.closeFormEventId = event.eventId;
    this.eventSubscription = event.eventSubscription;
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.eventService.unregisterComponent(this.componentId);
    this.eventService.unregisterEvent(this.closeFormEventId);
  }
}

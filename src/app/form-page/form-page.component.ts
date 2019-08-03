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
    this.closeFormEventId = this.eventService.registerEvent(this.componentId);

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
      case this.closeFormEventId: history.back();
                                  break;
      default: break;
    }
  }

}

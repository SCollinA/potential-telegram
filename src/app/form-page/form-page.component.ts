import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  eventSubscription: Subscription;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.registerEvent('closeForm');
    this.eventSubscription = this.eventService.subscribeToEvent('closeForm', () => history.back());
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.eventService.unregisterEvent('closeForm'); 
  }
}

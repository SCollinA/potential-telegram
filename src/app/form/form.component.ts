import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  @Input()
  parentComponentId: string;

  @Input()
  closeFormEventId: string;

  componentId: string;

  private eventSubscription: Subscription;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.componentId = this.eventService.registerComponent();
    this.eventSubscription = this.eventService.event.subscribe(this.handleEvents);
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  closeForm() {
    this.eventService.triggerEvent(this.closeFormEventId, this.componentId, this.parentComponentId);
  }

  private handleEvents(event: any) {
    console.log('handling event in form component', event);
  }
}

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

  isModalOpen = false;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.componentId = this.eventService.registerComponent();

    this.closeFormEventId = this.eventService.registerEvent(
      this.componentId,
      () => history.back()
    );
  }

  ngOnDestroy() {
    this.eventService.unregisterComponent(this.componentId);
  }
}

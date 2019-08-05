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

  isModalOpen = false;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.componentId = this.eventService.registerComponent();

    this.openModalEventId = this.eventService.registerEvent(
      this.componentId,
      () => this.isModalOpen = true
    );
    this.closeModalEventId = this.eventService.registerEvent(
      this.componentId,
      () => this.isModalOpen = false
    );
  }

  ngOnDestroy() {
    this.eventService.unregisterComponent(this.componentId);
  }
}

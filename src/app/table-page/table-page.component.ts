import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit, OnDestroy {

  isModalOpen = false;
  openFormSubscription: Subscription;
  closeFormSubscription: Subscription;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.registerEvent('openForm');
    this.eventService.registerEvent('closeForm');
    this.openFormSubscription = this.eventService.subscribeToEvent('openForm', () => this.isModalOpen = true);
    this.closeFormSubscription = this.eventService.subscribeToEvent('closeForm', () => {
      this.isModalOpen = false;
      console.log('herro');
    });
  }

  ngOnDestroy() {
    this.openFormSubscription.unsubscribe();
    this.closeFormSubscription.unsubscribe();
  }
}

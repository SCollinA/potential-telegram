import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input()
  parentComponentId: string;

  @Input()
  openModalEventId: string;

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

  openModal(): void {
    this.eventService.triggerEvent(this.openModalEventId, this.componentId, this.parentComponentId);
    return undefined;
  }

  private handleEvents(event: any): void {
    console.log('handling event in table component', this.eventService);
  }
}

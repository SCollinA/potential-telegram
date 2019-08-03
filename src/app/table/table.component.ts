import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../events.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  parentComponentId: string;

  @Input()
  openModalEventId: string;

  componentId: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.componentId = this.eventService.registerComponent();
  }

  openModal(): void {
    // this.eventService.triggerEvent(this.openModalEventId, this.componentId, this.parentComponentId);
    return undefined;
  }
}

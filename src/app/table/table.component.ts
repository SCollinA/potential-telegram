import { Component, OnInit } from '@angular/core';
import { EventService } from '../events.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  openModal(): void {
    // this.eventService

    return undefined;
  }
}

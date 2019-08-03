import { Component, OnInit } from '@angular/core';
import { EventService } from '../events.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  componentId: string;
  modalIsOpen = false;

  constructor(private eventService: EventService) {

  }

  ngOnInit() {
    this.componentId = this.eventService.register();
  }

}

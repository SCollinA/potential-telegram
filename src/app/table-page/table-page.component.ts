import { Component, OnInit } from '@angular/core';
import { EventService } from '../events.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  modalIsOpen = false;

  constructor(private eventService: EventService) { 

  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  closeFormEventId: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  closeForm() {
    this.eventService.triggerEvent(this.closeFormEventId);
  }
}

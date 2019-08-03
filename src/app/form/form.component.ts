import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../events.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  parentComponentId: string;

  @Input()
  closeFormEventId: string;

  componentId: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.componentId = this.eventService.registerComponent();
  }

  closeForm() {
    // this.eventService.triggerEvent(this.closeFormEventId, this.componentId, this.parentComponentId);
  }

}

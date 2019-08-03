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

  componentId: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.componentId = this.eventService.register();
  }

  closeForm() {

  }

}

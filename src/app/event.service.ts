import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // need list or map to store events, components
  eventMap = {};

  // need observable for components to subscribe to listen for events
  event = new Subject<any>();

  constructor() { }

  registerEvent(): any {
    const eventId = uuid();
    const componentId = uuid();
    this.eventMap[eventId] = componentId;
    return {
      eventId,
      componentId
    };
  }

  triggerEvent(eventId: string): void {
    const targetId = this.eventMap[eventId];
    if (
      !eventId ||
      !targetId
      ) { return undefined; }
    this.event.next({
      eventId,
      targetId
    });
  }

  unregisterEvent(eventId: string): void {
    delete this.eventMap[eventId];
  }
}

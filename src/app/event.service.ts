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

  registerComponent = (): string => uuid();

  registerEvent(targetId: string): any {
    const eventId = uuid();
    this.eventMap[eventId] = targetId;
    return eventId;
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

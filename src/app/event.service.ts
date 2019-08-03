import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // need list or map to store events, components
  componentMap = {};

  // need observable for components to subscribe to listen for events
  event = new Subject<any>();

  constructor() { }

  registerComponent(): string {
    const componentId = uuid();
    this.componentMap[componentId] = {};
    return componentId;
  }

  registerEvent(targetId: string): string {
    const eventId = uuid();
    this.componentMap[targetId][eventId] = {};
    return eventId;
  }

  triggerEvent(eventId: string, sourceId: string, targetId: string): void {
    if (
      !eventId || !sourceId || !targetId ||
      !this.componentMap[targetId] ||
      !this.componentMap[targetId][eventId]
      ) { return undefined; }
    this.event.next({
      eventId,
      sourceId,
      targetId
    });
  }

  // unregisterComponent = (): stri

  // unregisterEvent()
}

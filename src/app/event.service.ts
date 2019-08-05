import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  componentMap = {};
  eventMap = {};
  event = new Subject<any>();

  constructor() { }

  registerComponent(): string {
    const componentId = uuid();
    this.componentMap[componentId] = {};
    return componentId;
  }

  registerEvent(targetId: string, eventHandler: any): any {
    const eventId = uuid();

    this.eventMap[eventId] = targetId;
    this.componentMap[targetId][eventId] = eventHandler;

    const handleEvent = this.createEventHandler(targetId);
    this.componentMap[targetId].eventSubscription = this.event.subscribe(handleEvent);

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

  unregisterComponent(targetId: string): void {
    const component = this.componentMap[targetId];
    component.eventSubscription.unsubscribe();
    for (const eventId in this.eventMap) {
      if (this.eventMap[eventId] === targetId) {
        this.unregisterEvent(eventId);
      }
    }
    delete this.componentMap[targetId];
  }

  unregisterEvent(eventId: string): void {
    delete this.eventMap[eventId];
  }

  private createEventHandler(targetId: string): (liveEvent: any) => void {
    const events = this.componentMap[targetId];
    function handleEvent(liveEvent: any) {
      for (const eventId in events) {
        if (eventId === liveEvent.eventId && events[eventId]) {
          events[eventId]();
        }
      }
    }
    return handleEvent;
  }
}

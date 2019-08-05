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
    const eventSubscription = this.event.subscribe(handleEvent);

    return {
      eventId,
      eventSubscription
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

  unregisterComponent(targetId: string): void {
    delete this.componentMap[targetId];
    for (const eventId in this.eventMap) {
      if (this.eventMap[eventId] === targetId) {
        delete this.eventMap[eventId];
      }
    }
  }

  unregisterEvent(eventId: string): void {
    delete this.eventMap[eventId];
    for (const componentId in this.componentMap) {
      if (this.componentMap[componentId]) {
        delete this.componentMap[componentId][eventId];
      }
    }
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

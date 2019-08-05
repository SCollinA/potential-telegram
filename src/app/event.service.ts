import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private componentMap = {};
  private eventMap = {};
  private event = new Subject<any>();

  event$ = this.event.asObservable();

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
    this.componentMap[targetId].eventSubscription = this.event$.subscribe(this.handleEvent);
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

  handleEvent = (liveEvent: any): void => {
    const events = this.componentMap[liveEvent.targetId];
    for (const eventId in events) {
      if (eventId === liveEvent.eventId && events[eventId]) {
        events[eventId]();
        return;
      }
    }
  }

  subscribeToEvent = (eventId: string, callback: any): Subscription => {
    return this.event$.subscribe((event: any) => {
      if (event.eventId === eventId) {
        callback();
      }
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
}

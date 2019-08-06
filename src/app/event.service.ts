import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventMap = {};

  constructor() { }

  registerEvent(eventId: string): any {
    if (!this.eventMap[eventId]) {
      this.eventMap[eventId] = new Subject<any>();
      console.log('registering event', eventId);
    }
  }

  triggerEvent(eventId: string): void {
    const event$ = this.eventMap[eventId];
    if (!eventId || !event$ ) { return undefined; }
    event$.next();
  }

  subscribeToEvent = (eventId: string, callback: any): Subscription => {
    const event$ = this.eventMap[eventId];
    console.log('subscribing to event', this.eventMap);
    if (!event$) { return undefined; }
    return event$.asObservable().subscribe(() => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  unregisterEvent(eventId: string): void {
    delete this.eventMap[eventId];
  }
}

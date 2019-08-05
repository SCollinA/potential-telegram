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
    this.eventMap[eventId] = new Subject<any>();
    return this.eventMap[eventId];
  }

  triggerEvent(eventId: string): void {
    const event$ = this.eventMap[eventId];
    if (!eventId ) { return undefined; }
    event$.next();
  }

  subscribeToEvent = (eventId: string): Subscription => {
    return this.eventMap[eventId].asObservable();
  }

  unregisterEvent(eventId: string): void {
    delete this.eventMap[eventId];
  }
}

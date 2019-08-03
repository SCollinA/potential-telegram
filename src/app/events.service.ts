import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // need list or map to store events, components

  // need observable for components to subscribe to listen for events
  event = new Subject<any>();

  constructor() { }

  registerComponent = (): string => uuid();

  registerEvent = (): string => uuid();

  triggerEvent = (eventId: string, sourceId: string, targetId: string): void => {
    if (!eventId || !sourceId || !targetId) { return undefined; }


  }

  // unregisterComponent = (): stri

  // unregisterEvent()
}

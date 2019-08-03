import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  register(): string {
    const uniqueId = uuid();
    console.log(uniqueId);
    return uniqueId;
  }
}

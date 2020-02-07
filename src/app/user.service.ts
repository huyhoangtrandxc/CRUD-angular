import { Injectable, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';
import { User } from './list/user-edit/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new Subject<User>();

  constructor() { }
}

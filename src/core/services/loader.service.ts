import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  showLoading = new BehaviorSubject<boolean>(false);

  show() {
    this.showLoading.next(true);
  }

  hide() {
    this.showLoading.next(false);
  }
}

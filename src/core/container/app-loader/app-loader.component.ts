import { Component } from '@angular/core';
import { LoaderService } from 'src/core/services/loader.service';

@Component({
  selector: 'gs-loader',
  template: `
    <div class="loader-header" *ngIf="isLoading">
      <span class="loader"></span>
    </div>
  `,
  styleUrls: ['./app-loader.component.scss'],
})
export class AppLoaderComponent {
  isLoading!: boolean;
  constructor(public loaderService: LoaderService) {
    this.loaderService.showLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}

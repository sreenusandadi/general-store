import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLoaderComponent } from './container/app-loader/app-loader.component';

@NgModule({
  declarations: [AppLoaderComponent],
  exports: [AppLoaderComponent],
  imports: [CommonModule],
})
export class CoreModule {}

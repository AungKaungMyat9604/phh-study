import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFrameRoutingModule } from './app-frame-routing.module';
import { AppFrameComponent } from './app-frame.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppFrameComponent],
  imports: [CommonModule, AppFrameRoutingModule, RouterOutlet],
})
export class AppFrameModule {}

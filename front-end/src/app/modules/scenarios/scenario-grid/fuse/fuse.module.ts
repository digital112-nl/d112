import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FusePipe } from './fuse.pipe';
import { FuseService } from './fuse.service';

@NgModule({
  declarations: [
    FusePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FusePipe
  ],
  providers: [ FuseService ]
})
export class FuseModule {
}

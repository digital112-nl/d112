import { NgModule } from '@angular/core';
import { InitialsPipe } from './initials.pipe';
import { PrioPipe } from './prio.pipe';

@NgModule({
  declarations: [
    PrioPipe,
    InitialsPipe
  ],
  exports: [
    PrioPipe,
    InitialsPipe
  ]
})
export class SharedPipesModule {

}

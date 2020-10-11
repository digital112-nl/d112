import { NgModule } from '@angular/core';
import { PrioPipe } from './prio.pipe';

@NgModule({
  declarations: [
    PrioPipe
  ],
  exports: [
    PrioPipe
  ]
})
export class SharedPipesModule {

}

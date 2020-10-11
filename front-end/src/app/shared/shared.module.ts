import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule
  ]
})
export class SharedModule {
}

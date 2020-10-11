import { Pipe, PipeTransform } from '@angular/core';
import { ScenarioPrio } from '../../modules/scenarios/scenario-list/scenario-list.component';

@Pipe({
  name: 'prio'
})
export class PrioPipe implements PipeTransform {
  public transform(
    value: number,
    styling?: boolean,
    icon?: boolean
  ): any {
    let prioOutput = '';
    let prioIconOutput = '';

    switch (value) {
      case ScenarioPrio.Emergency:
        prioOutput = 'emergency';
        prioIconOutput = 'priority-highest';
        break;
      case ScenarioPrio.High:
        prioOutput = 'high';
        prioIconOutput = 'priority-high';
        break;
      case ScenarioPrio.Medium:
        prioOutput = 'medium';
        prioIconOutput = 'priority-normal';
        break;
      case ScenarioPrio.Low:
        prioOutput = 'low';
        prioIconOutput = 'priority-low';
        break;
    }

    if ( icon ) {
      return prioIconOutput;
    }

    if ( styling ) {
      return prioOutput;
    } else {
      return prioOutput.charAt(0).toUpperCase() + prioOutput.slice(1);
    }
  }
}

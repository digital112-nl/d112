import { Pipe, PipeTransform } from '@angular/core';
import { ReportModel } from '../../../api/models';
import { isNil } from 'lodash';

export interface ScenarioIcon {
  icon: string;
  description: string;
  disabled?: boolean;
}

export function ScenarioIconForReport(report: ReportModel): ScenarioIcon[] {
  const icons = [];

  if (
    report.callStatus === 'ringing' ||
    report.callStatus === 'in-progress'
  ) {
    icons.push({
      icon: '📞',
      description: 'On the line right now.'
    });
  } else if ( report.callStatus === 'completed' ) {
    icons.push({
      icon: '✅',
      description: 'Call completed.'
    });
  } else if ( report.callStatus === 'canceled' ) {
    icons.push({
      icon: '❌',
      description: 'Cancelled call.'
    });
  }

  if ( report.department ) {
    if ( report.department.fire_department ) {
      icons.push({
        icon: '🚒',
        description: 'Case for fire department'
      });
    }
    if ( report.department.ambulance ) {
      icons.push({
        icon: '🚑',
        description: 'Case for hospital'
      });
    }
    if ( report.department.police ) {
      icons.push({
        icon: '🚓',
        description: 'Case for police'
      });
    }
    if ( !report.department.disable_location_required ) {
      icons.push({
        icon: '🌍',
        description: 'Location',
        disabled: isNil(report.location) || isNil(report.location.lat) || isNil(report.location.lon)
      });
    }
    if ( report.department.unhandled ) {
      icons.push({
        icon: '👋🏻',
        description: 'Do not know how to handle this call.'
      });
    }
  }

  return icons.length > 0 ?
    icons :
    [ {
      icon: '⁉️',
      description: 'Unknown'
    } ];
}

@Pipe({
  pure: true,
  name: 'scenarioIcons'
})
export class ScenarioIconsPipe implements PipeTransform {
  public transform(
    report: ReportModel
  ): ScenarioIcon[] {
    return ScenarioIconForReport(report);
  }
}

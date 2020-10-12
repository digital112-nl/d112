import { Component } from '@angular/core';

export enum ScenarioPrio {
  Emergency = 0,
  High = 1,
  Medium = 2,
  Low = 3,
}

export interface ScenarioListItem {
  category: string; // Make this an enum
  title: string;
  prio: ScenarioPrio;
  time: number;
}

@Component({
  selector: 'di-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: [ './scenario-list.component.scss' ]
})
export class ScenarioListComponent {

  public scenarioList: ScenarioListItem[] = [
    {
      category: '🔥',
      title: 'Fire in building',
      prio: ScenarioPrio.Emergency,
      time: Date.now()
    },
    {
      category: '🔥',
      title: 'Fire in building',
      prio: ScenarioPrio.High,
      time: Date.now() - 60000
    },
    {
      category: '🔥',
      title: 'Fire in building',
      prio: ScenarioPrio.Medium,
      time: Date.now() - 200000
    },
    {
      category: '🔥',
      title: 'Fire in building',
      prio: ScenarioPrio.Low,
      time: Date.now() - 400000
    }
  ];
}

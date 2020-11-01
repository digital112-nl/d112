import { Component } from '@angular/core';

@Component({
  selector: 'di-scenario-detail-chat',
  templateUrl: './scenario-detail-chat.component.html',
  styleUrls: ['./scenario-detail-chat.component.scss']
})
export class ScenarioDetailChatComponent {

  public questionnaire: any[] = [
    {
      key: 'scale-1-10',
      type: 'Scale',
      question: 'On a scale from 1 to 10 how is the fire progressing?',
      asked: true,
      answered: true,
      outcome: {
        type: 'ScalePriorityPossibility',
        key: 'scale-1',
        forValue: 1,
        priority: 2
      },
      possibilities: [
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-1',
          forValue: 1,
          priority: 2
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-2',
          forValue: 2,
          priority: 2
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-3',
          forValue: 3,
          priority: 2
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-4',
          forValue: 4,
          priority: 2
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-5',
          forValue: 5,
          priority: 1
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-6',
          forValue: 6,
          priority: 1
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-7',
          forValue: 7,
          priority: 1
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-8',
          forValue: 8,
          priority: 0
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-9',
          forValue: 9,
          priority: 0
        },
        {
          type: 'ScalePriorityPossibility',
          key: 'scale-10',
          forValue: 10,
          priority: 0
        }
      ]
    }
  ];
}

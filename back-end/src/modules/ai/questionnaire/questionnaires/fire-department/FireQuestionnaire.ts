import { Priority, Questionnaire, ScalePriorityPossibility } from '../../Questionnaire';

export const scalePriorityPossibilities: ScalePriorityPossibility[] = [
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-1',
    forValue: 1,
    priority: Priority.Medium
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-2',
    forValue: 2,
    priority: Priority.Medium
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-3',
    forValue: 3,
    priority: Priority.Medium
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-4',
    forValue: 4,
    priority: Priority.Medium
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-5',
    forValue: 5,
    priority: Priority.High
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-6',
    forValue: 6,
    priority: Priority.High
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-7',
    forValue: 7,
    priority: Priority.High
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-8',
    forValue: 8,
    priority: Priority.Emergency
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-9',
    forValue: 9,
    priority: Priority.Emergency
  },
  {
    type: 'ScalePriorityPossibility',
    key: 'scale-10',
    forValue: 10,
    priority: Priority.Emergency
  }
];

export const FireQuestionnaire: Questionnaire = {
  key: 'fire',
  questions: [
    {
      key: 'scale-1-10',
      type: 'Scale',
      question: 'On a scale from 1 to 10 how is the fire progressing?',
      possibilities: scalePriorityPossibilities
    }
  ]
};

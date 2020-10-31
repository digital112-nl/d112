import { Questionnaire } from '../../Questionnaire';

export const FireQuestionnaire: Questionnaire = {
  key: 'fire',
  questions: [
    {
      key: 'first-question',
      question: 'How are you doing?',
      possibilities: [
        {
          type: 'AiEntityPossibility',
          key: 'test',
          entity: 'test'
        }
      ]
    }
  ]
};

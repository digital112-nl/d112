import { Questionnaire } from '../../Questionnaire';

export const AccidentQuestionnaire: Questionnaire = {
  key: 'accident',
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

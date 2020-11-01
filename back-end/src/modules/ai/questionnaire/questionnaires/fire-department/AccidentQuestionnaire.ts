import { Questionnaire } from '../../Questionnaire';

export const AccidentQuestionnaire: Questionnaire = {
  key: 'accident',
  questions: [
    {
      key: 'scale-1-10',
      type: 'Scale',
      question: 'On a scale from 1 to 10 how big is the accident?',
    }
  ]
};

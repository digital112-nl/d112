enum Outcome {
  AddAmbulance,
  AddPolice,
  AddFireDepartment
}

interface QuestionPossibility {
  type: 'AiEntityPossibility' | 'AiIntentPossibility' | 'PriorityPossibility';
  key: string;
  outcome?: Outcome | Outcome[];
}

interface AiEntityPossibility extends QuestionPossibility {
  type: 'AiEntityPossibility';
  entity: string;
}

interface AiIntentPossibility extends QuestionPossibility {
  type: 'AiIntentPossibility';
  intent: string;
}

enum Priority {
  Emergency = 0,
  High = 1,
  Medium = 2,
  Low = 3,
}

interface PriorityPossibility extends QuestionPossibility {
  type: 'PriorityPossibility';
  priority: Priority;
}

interface Question {
  key: string;
  question: string;
  possibilities: (AiEntityPossibility | AiIntentPossibility | PriorityPossibility)[];
}

export interface Questionnaire {
  key: string;
  questions: Question[];
}

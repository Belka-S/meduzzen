import * as Yup from 'yup';

import { name, number } from './pattern';

export const quizSchema = (questions: { [key: string]: number }) => {
  let question = {};
  let answer = {};

  for (let i = 1; i <= questions[`question_${i}`]; i += 1) {
    for (let j = 1; j <= questions[`answer_${i}-${j}`]; j += 1) {
      answer = {
        ...answer,
        [`question_answers_${i}-${j}`]: Yup.string().required('is required'),
      };
    }

    question = {
      ...question,
      [`question_text_${i}`]: Yup.string().required('is required'),
      ...answer,
      [`question_correct_answer_${i}`]: number,
    };
  }

  return Yup.object().shape({
    quiz_name: name,
    quiz_frequency: number,

    ...question,
  });
};

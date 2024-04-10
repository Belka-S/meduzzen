import * as Yup from 'yup';

import { name, number } from './pattern';

export const quizSchema = Yup.object().shape({
  quiz_name: name,
  quiz_frequency: number,
});

export const questionSchema = (answers: { [key: string]: number }) => {
  let answer = {};

  for (let i = 1; i <= answers[`answer_${i}`]; i += 1) {
    answer = {
      ...answer,
      [`question_answer_${i}`]: Yup.string().required('is required'),
    };
  }

  return Yup.object().shape({
    question_text: Yup.string().required('is required'),
    ...answer,
    question_correct_answer: Yup.number()
      .integer()
      .moreThan(0)
      .lessThan(Object.keys(answer).length + 1)
      .required('is required'),
  });
};

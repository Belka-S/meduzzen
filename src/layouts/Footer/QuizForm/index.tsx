import { FC, useState } from 'react';
import InputText from 'components/InputText';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { editCompany, setCompanyAppendix } from 'store/company';
import { getQuizzesListThunk } from 'store/companyData';
import { createQuizThunk } from 'store/quiz';
import { useCompany } from 'utils/hooks';
import { quizSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TQuizForm = { setIsModal: () => void };

const initialState = { [`question_${1}`]: 1, [`answer_${1}-${1}`]: 1 };

const QuizForm: FC<TQuizForm> = ({ setIsModal }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();

  const [questionCount, setQuestionCount] = useState(1);
  const [answerCount, setAnswerCount] = useState(1);
  const [questions, setQuestions] = useState(initialState);

  const schema = quizSchema(questions);
  type TInput = InferType<typeof schema>;
  const inputFields = Object.keys(quizSchema(questions).fields) as Array<
    keyof TInput
  >;

  // RHF
  const resolver: Resolver<TInput> = yupResolver(quizSchema(questions));
  const { register, watch, handleSubmit, formState } = useForm<TInput>({
    resolver,
    mode: 'onChange',
    // defaultValues: { is_visible: true },
  });

  if (!company) return;
  const { company_id } = company;

  const q = inputFields
    .filter(el => el.includes('question_text_'))
    .map(el => watch(el));

  const a = inputFields
    .filter(el => el.includes(`question_answers_${q.length}`))
    .map(el => watch(el));

  const onSubmit: SubmitHandler<TInput> = async data => {
    const { quiz_name, quiz_frequency } = data;

    const entries = Object.entries(data);
    const questions = entries.filter(el => el[0].includes('question_text_'));
    const answers = entries.filter(el => el[0].includes('question_answers_'));
    const correct = entries.filter(el => el[0].includes('correct_answer_'));

    const questions_list = questions.map(el => {
      const qId = Number(el[0].replace('question_text_', ''));
      const question_answers = answers
        .filter(el => el[0].includes(`question_answers_${qId}-`))
        .map(el => el[1])
        .reverse();
      const question_correct_answer = correct
        .filter(el => el[0].includes(`correct_answer_${qId}`))
        .map(el => el[1])[0];

      // question_answers[1] ? setIsActive(true) : setIsActive(false);
      console.log('question_answers[1]: ', question_answers[1]);

      return {
        question_text: el[1],
        question_answers,
        question_correct_answer,
      };
    });
    const quiz = { quiz_name, quiz_frequency, company_id, questions_list };

    await dispatchExtra(createQuizThunk(quiz));
    await dispatchExtra(getQuizzesListThunk({ company_id }));
    dispatch(setCompanyAppendix('quizzez'));
    setIsModal();
  };

  const handleAddAnswer = () => {
    setAnswerCount(answerCount + 1);
    setQuestions({
      ...questions,
      [`question_${questionCount}`]: questionCount,
      [`answer_${questionCount}-${answerCount + 1}`]: answerCount + 1,
    });
  };

  const handleAddQuestion = () => {
    setAnswerCount(1);
    setQuestionCount(questionCount + 1);
    setQuestions({
      ...questions,
      [`question_${questionCount + 1}`]: questionCount + 1,
      [`answer_${questionCount + 1}-${1}`]: 1,
    });
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.title__wrap}>
        <H3 className={s.title}>Create quiz</H3>
      </div>

      {inputFields.map(el => (
        <InputText
          key={el}
          inputName={el}
          errors={formState.errors}
          register={register}
        />
      ))}

      <Button variant="smooth" label="Add answer" onClick={handleAddAnswer} />
      <Button
        variant="smooth"
        label="Add question"
        onClick={handleAddQuestion}
      />

      <Button
        type="submit"
        variant="smooth"
        color={a.length > 1 && q.length > 1 ? 'default' : 'disabled'}
        label="Submit"
      />
    </form>
  );
};

export default QuizForm;

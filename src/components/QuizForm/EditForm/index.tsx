import { FC, useState } from 'react';
import InputText from 'components/InputText';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { TQuestion } from 'store';
import { useAppExtraDispatch } from 'store';
import { getQuizzesListThunk } from 'store/companyData';
import { addQuestionThunk, getQuizThunk } from 'store/quiz';
import { updateQuestionThunk, updateQuizThunk } from 'store/quiz';
import { getAnswerArr } from 'utils/helpers';
import { useCompany, useQuiz } from 'utils/hooks';
import { questionSchema, quizSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import QuestionEditList from '../EditForm/QuestionEditList';

import s from './index.module.scss';

type TQuizForm = { setIsModal: () => void };
type TQuizInput = InferType<typeof quizSchema>;
const quizFields = Object.keys(quizSchema.fields) as Array<keyof TQuizInput>;

export type TAnswerOfObj = { [key: string]: number };
const answerObjInitialState: TAnswerOfObj = { [`answer_${1}`]: 1 };

const QuizEditForm: FC<TQuizForm> = ({ setIsModal }) => {
  // const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();
  const { quiz } = useQuiz();

  const [count, setCount] = useState(1);
  const [answerObj, setAnswerObj] = useState(answerObjInitialState);
  const [question_id, setQuestionId] = useState(NaN);

  // RHF quiz
  const quizResolver: Resolver<TQuizInput> = yupResolver(quizSchema);
  const { register, handleSubmit, formState } = useForm<TQuizInput>({
    resolver: quizResolver,
    mode: 'onChange',
    defaultValues: {
      quiz_name: quiz?.quiz_name,
      quiz_frequency: quiz?.quiz_frequency,
    },
  });

  // RHF questions
  const shema = questionSchema(answerObj);
  type TQuestionInput = InferType<typeof shema>;
  const questionFields = Object.keys(shema.fields) as Array<
    keyof TQuestionInput
  >;
  const questionResolver: Resolver<TQuestionInput> = yupResolver(shema);
  const {
    reset,
    setValue,
    getFieldState,
    register: registerQ,
    handleSubmit: addQuestion,
    formState: formStateQ,
  } = useForm<TQuestionInput>({
    resolver: questionResolver,
    mode: 'onChange',
    // defaultValues: '',
  });

  if (!quiz || !company) return;
  const { questions_list, quiz_id } = quiz;
  const { company_id } = company;

  const onQuizSubmit: SubmitHandler<TQuizInput> = async data => {
    await dispatchExtra(updateQuizThunk({ ...data, quiz_id }));
    await dispatchExtra(getQuizzesListThunk({ company_id }));
    // dispatch(setCompanyAppendix('quizzez'));
    setIsModal();
  };

  const handleAddQuestion: SubmitHandler<TQuestionInput> = async data => {
    const { question_text, question_correct_answer } = data;
    const { isTouched } = getFieldState('question_correct_answer', formStateQ);

    const question: TQuestion = {
      question_id,
      question_text,
      question_answers: getAnswerArr(data, isTouched) as string[],
      question_correct_answer: question_correct_answer - 1,
    };

    if (!question_id) {
      await dispatchExtra(addQuestionThunk({ ...question, quiz_id }));
    } else {
      if (questions_list.find(el => el.question_text === question_text)) {
        return alert(`You alreddy have ${question_text} question`);
      }
      await dispatchExtra(updateQuestionThunk({ ...question, question_id }));
    }
    await dispatchExtra(getQuizThunk({ quiz_id }));
    setAnswerObj(answerObjInitialState);
    setCount(1);
    setQuestionId(NaN);
    reset();
  };

  const handleAddAnswer = () => {
    setCount(count + 1);
    setAnswerObj({ ...answerObj, [`answer_${count + 1}`]: count + 1 });
  };

  return (
    <div className={s.form_wrap}>
      <H3 className={s.title}>Create quiz</H3>

      <form className={s.form} onSubmit={handleSubmit(onQuizSubmit)}>
        {quizFields.map(el => (
          <InputText
            key={el}
            inputName={el}
            errors={formState.errors}
            register={register}
          />
        ))}

        <Button
          className={s.button}
          type="submit"
          variant="smooth"
          color={questions_list.length > 1 ? 'default' : 'disabled'}
          label="Update quiz info"
        />
      </form>

      <QuestionEditList
        setAnswerObj={setAnswerObj}
        setCount={setCount}
        setValue={setValue}
        setQuestionId={setQuestionId}
      />

      <form className={s.form} onSubmit={addQuestion(handleAddQuestion)}>
        {questionFields.map(el => (
          <InputText
            key={el}
            inputName={el}
            errors={formStateQ.errors}
            register={registerQ}
          />
        ))}

        <Button variant="smooth" label="Add answer" onClick={handleAddAnswer} />
        <Button
          color={Object.keys(answerObj).length > 1 ? 'default' : 'disabled'}
          type="submit"
          variant="smooth"
          label="Add or edit question"
        />
      </form>
    </div>
  );
};

export default QuizEditForm;

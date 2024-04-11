import { FC, useState } from 'react';
import InputText from 'components/InputText';
import QuestionAddList from 'components/QuizForm/AddForm/QuestionAddList';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { TQuestion, TQuizCreate, useAppDispatch } from 'store';
import { useAppExtraDispatch } from 'store';
import { setCompanyAppendix } from 'store/company';
import { getQuizzesListThunk } from 'store/companyData';
import { createQuizThunk } from 'store/quiz';
import { getAnswerArr } from 'utils/helpers';
import { useCompany, useQuiz } from 'utils/hooks';
import { questionSchema, quizSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TQuizForm = { setIsModal: () => void };
type TQuizInput = InferType<typeof quizSchema>;
const quizFields = Object.keys(quizSchema.fields) as Array<keyof TQuizInput>;

export type TAnswerOfObj = { [key: string]: number };
const answerObjInitialState: TAnswerOfObj = { [`answer_${1}`]: 1 };

const QuizAddForm: FC<TQuizForm> = ({ setIsModal }) => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();
  const { quiz } = useQuiz();

  const [count, setCount] = useState(1);
  const [answerObj, setAnswerObj] = useState(answerObjInitialState);
  const [questions_list, setQuestionList] = useState<TQuestion[]>(
    quiz?.questions_list ?? [],
  );

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

  if (!company) return;
  const { company_id } = company;

  const onQuizSubmit: SubmitHandler<TQuizInput> = async data => {
    const quiz = { ...data, company_id, questions_list } as TQuizCreate;
    await dispatchExtra(createQuizThunk(quiz));
    await dispatchExtra(getQuizzesListThunk({ company_id }));
    dispatch(setCompanyAppendix('quizzez'));
    setIsModal();
  };

  const handleAddQuestion: SubmitHandler<TQuestionInput> = data => {
    const { question_text, question_correct_answer } = data;
    const { isTouched } = getFieldState('question_correct_answer', formStateQ);
    if (questions_list.find(el => el.question_text === question_text)) {
      alert(`You alreddy have ${question_text} question`);
      return;
    }
    const question: TQuestion = {
      question_text,
      question_answers: getAnswerArr(data, isTouched) as string[],
      question_correct_answer: question_correct_answer - 1,
    };
    setQuestionList([...questions_list, question]);
    setAnswerObj(answerObjInitialState);
    setCount(1);
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
          label="Submit"
        />
      </form>

      <QuestionAddList
        questions_list={questions_list}
        setQuestionList={setQuestionList}
        setAnswerObj={setAnswerObj}
        setCount={setCount}
        setValue={setValue}
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
          label="Add question"
        />
      </form>
    </div>
  );
};

export default QuizAddForm;

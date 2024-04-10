import { FC, useRef, useState } from 'react';
import InputText from 'components/InputText';
import Button from 'components/ui/Button';
import H3 from 'components/ui/Typography/H3';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { setCompanyAppendix } from 'store/company';
import { getQuizzesListThunk } from 'store/companyData';
import { createQuizThunk } from 'store/quiz';
import { getQuestionArr } from 'utils/helpers';
import { useCompany } from 'utils/hooks';
import { questionSchema, quizSchema } from 'utils/validation';
import { InferType } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import s from './index.module.scss';

type TQuizForm = { setIsModal: () => void };
type TQuiz = InferType<typeof quizSchema>;
const quizFields = Object.keys(quizSchema.fields) as Array<keyof TQuiz>;

const answerListInitialState = { [`answer_${1}`]: 1 };

const QuizForm: FC<TQuizForm> = ({ setIsModal }) => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();

  const [answerCount, setAnswerCount] = useState(1);
  const [answerList, setAnsverList] = useState(answerListInitialState);
  const [questions_list, setQuestionList] = useState<TQuestion[]>([]);

  // RHF
  const quizResolver: Resolver<TQuiz> = yupResolver(quizSchema);
  const { register, handleSubmit, formState } = useForm<TQuiz>({
    resolver: quizResolver,
    mode: 'onChange',
    // defaultValues: { is_visible: true },
  });

  const shema = questionSchema(answerList);

  type TQuestion = InferType<typeof shema>;
  const questionFields = Object.keys(shema.fields) as Array<keyof TQuestion>;
  const questionResolver: Resolver<TQuestion> = yupResolver(shema);
  const {
    reset,
    register: registerQ,
    handleSubmit: addQuestion,
    formState: formStateQ,
  } = useForm<TQuestion>({
    resolver: questionResolver,
    mode: 'onChange',
    // defaultValues: { question_text: '', question_correct_answer: NaN },
  });

  if (!company) return;
  const { company_id } = company;

  const onQuizSubmit: SubmitHandler<TQuiz> = async data => {
    const quiz = { ...data, company_id, questions_list };
    const { payload } = await dispatchExtra(createQuizThunk(quiz));
    console.log('payload: ', payload);
    await dispatchExtra(getQuizzesListThunk({ company_id }));
    dispatch(setCompanyAppendix('quizzez'));
    setIsModal();
  };

  const handleAddQuestion: SubmitHandler<TQuestion> = data => {
    const { question_text, question_correct_answer } = data;
    const question = {
      question_text,
      question_answers: getQuestionArr(data),
      question_correct_answer: question_correct_answer - 1,
    };
    setQuestionList([...questions_list, question]);
    setAnsverList(answerListInitialState);
    setAnswerCount(1);
    reset();
  };

  const handleAddAnswer = () => {
    setAnswerCount(answerCount + 1);
    setAnsverList({
      ...answerList,
      [`answer_${answerCount + 1}`]: answerCount + 1,
    });
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
          color={Object.keys(answerList).length > 1 ? 'default' : 'disabled'}
          type="submit"
          variant="smooth"
          label="Add question"
        />
      </form>
    </div>
  );
};

export default QuizForm;

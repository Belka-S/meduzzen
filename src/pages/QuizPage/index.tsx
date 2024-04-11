import { useEffect } from 'react';
import classNames from 'classnames';
import InputCheck from 'components/InputCheck';
import Button from 'components/ui/Button';
import Section from 'components/ui/Section';
import H3 from 'components/ui/Typography/H3';
import H4 from 'components/ui/Typography/H4';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppExtraDispatch } from 'store';
import { TAnswers } from 'store';
import { selectCompanies, setCompanyAppendix } from 'store/company';
import { getQuizThunk, takeQuizThunk } from 'store/quiz';
import { getValuableObj } from 'utils/helpers';
import { useQuiz } from 'utils/hooks';

import s from './index.module.scss';

const QuizPage = () => {
  const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { quiz } = useQuiz();

  const quiz_id = Number(id);
  useEffect(() => {
    (async () => await dispatchExtra(getQuizThunk({ quiz_id })))();
  }, [dispatchExtra, quiz_id]);

  // RHF
  const { register, handleSubmit } = useForm<TAnswers>({
    mode: 'onChange',
  });

  const handleTakeQuiz: SubmitHandler<TAnswers> = async data => {
    await dispatchExtra(takeQuizThunk({ ...getValuableObj(data), quiz_id }));
    dispatch(selectCompanies('owner'));
    dispatch(setCompanyAppendix('quizzes'));
    navigate(state.from, { replace: true });
  };

  if (!quiz) return;
  const { quiz_name, quiz_frequency, questions_list } = quiz;

  return (
    <Section className={classNames('container', s.screen)}>
      <H3>{`${quiz_name} (id: ${quiz_id})`}</H3>
      <H4>{`Frequency ${quiz_frequency}`}</H4>

      {questions_list.map((el, i) => (
        <form onSubmit={handleSubmit(handleTakeQuiz)} key={el.question_id}>
          <H4>{el.question_text}</H4>

          {el.question_answers.map(answer => (
            <InputCheck
              inputName={`${el.question_id}`}
              register={register}
              type="radio"
              value={answer}
              label={answer}
              key={`answer_${answer}`}
            />
          ))}

          {questions_list.length === i + 1 && (
            <Button type="submit" label="Submit" />
          )}
        </form>
      ))}
    </Section>
  );
};

export default QuizPage;

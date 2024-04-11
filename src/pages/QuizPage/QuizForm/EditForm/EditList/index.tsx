import { FC } from 'react';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { TAnswerOfObj } from 'pages/QuizPage/QuizForm/AddForm';
import { UseFormSetValue } from 'react-hook-form';
import { TQuestion, useAppExtraDispatch } from 'store';
import { deleteQuestionThunk, getQuizThunk } from 'store/quiz';
import { useQuiz } from 'utils/hooks';

import s from '../../list.module.scss';

type TQuestionEdit = {
  question_text: string;
  question_correct_answer: number;
  [key: string]: string | number;
};

export type TQuestionListProps = {
  // questions_list: TQuestion[];
  setAnswerObj: (list: TAnswerOfObj) => void;
  setCount: (count: number) => void;
  setQuestionId: (question_id: number) => void;
  setValue: UseFormSetValue<TQuestionEdit>;
};

const QuestionEditList: FC<TQuestionListProps> = props => {
  const { setAnswerObj, setCount, setQuestionId, setValue } = props;

  const dispatchExtra = useAppExtraDispatch();
  const { quiz } = useQuiz();
  const quiz_id = quiz?.quiz_id;

  if (!quiz_id) return;
  const { questions_list } = quiz;

  const handleEditQuestion = (el: TQuestion) => {
    const { question_id, question_text } = el;
    setQuestionId(question_id);
    const answers = el.question_answers.reduce((acc, answer, i) => {
      setValue(`question_answer_${i + 1}`, answer);
      return { ...acc, [`answer_${i + 1}`]: i + 1 };
    }, {});
    setAnswerObj(answers);
    setCount(el.question_answers.length);
    setValue('question_text', question_text);
  };

  const handleDeleteQuestion = async (el: TQuestion) => {
    const { question_id, question_text } = el;
    if (!question_id) return;
    if (!confirm(`Are you sure you want to delete: ${question_text}`)) return;
    await dispatchExtra(deleteQuestionThunk({ question_id }));
    await dispatchExtra(getQuizThunk({ quiz_id }));
  };

  return (
    <div className={s.list}>
      {questions_list.map((el, i) => (
        <div className={s.item} key={el.question_id}>
          <span>{(i + 1).toString().padStart(2, '0')}:</span>
          <span> {el.question_text} ?</span>
          <span>
            [&nbsp;
            {el.question_answers.map((el, i) => (
              <span className={s.answer} key={el + i}>
                {el}
              </span>
            ))}
            &nbsp;]
          </span>
          <span>id: {el.question_id}</span>

          <div className={s.btn_wrap}>
            <Button
              size="s"
              variant="round"
              color="transparent"
              onClick={() => handleEditQuestion(el)}
            >
              <SvgIcon svgId="ui-edit" size={16} />
            </Button>
            <Button
              size="s"
              variant="round"
              color="transparent"
              onClick={() => handleDeleteQuestion(el)}
            >
              <SvgIcon svgId="ui-trash" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionEditList;

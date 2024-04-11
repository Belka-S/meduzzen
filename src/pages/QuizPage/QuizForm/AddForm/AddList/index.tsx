import { FC } from 'react';
import Button from 'components/ui/Button';
import SvgIcon from 'components/ui/SvgIcon';
import { TAnswerOfObj } from 'pages/QuizPage/QuizForm/AddForm';
import { UseFormSetValue } from 'react-hook-form';
import { TQuestion } from 'store';

import s from '../../list.module.scss';

type TQuestionEdit = {
  question_text: string;
  question_correct_answer: number;
  [key: string]: string | number;
};

export type TQuestionListProps = {
  questions_list: TQuestion[];
  setAnswerObj: (list: TAnswerOfObj) => void;
  setCount: (count: number) => void;
  setQuestionList: (list: TQuestion[]) => void;
  setValue: UseFormSetValue<TQuestionEdit>;
};

const QuestionAddList: FC<TQuestionListProps> = props => {
  const { questions_list, setAnswerObj, setCount, setValue } = props;

  const handleEditQuestion = (el: TQuestion) => {
    const { question_text, question_correct_answer } = el;
    // delete question from list to edit
    const index = questions_list.findIndex(
      el => el.question_text === question_text,
    );
    questions_list.splice(index, 1);
    // set question values to form
    const answers = el.question_answers.reduce((acc, answer, i) => {
      setValue(`question_answer_${i + 1}`, answer);
      return { ...acc, [`answer_${i + 1}`]: i + 1 };
    }, {});
    setAnswerObj(answers);
    setCount(el.question_answers.length);
    setValue('question_text', question_text);
    setValue('question_correct_answer', question_correct_answer + 1);
  };

  const handleDeleteQuestion = (el: TQuestion) => {
    const { question_text } = el;
    if (!confirm(`Are you sure you want to delete: ${question_text}`)) return;
    // delete question from list to edit
    const index = questions_list.findIndex(
      el => el.question_text === question_text,
    );
    questions_list.splice(index, 1);
    setAnswerObj({ [`answer_${1}`]: 1 });
  };

  return (
    <div className={s.list}>
      {questions_list.map((el, i) => (
        <div
          className={s.item}
          key={el.question_text + el.question_correct_answer}
        >
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
          <span>--&gt; {el.question_correct_answer + 1}</span>

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

export default QuestionAddList;

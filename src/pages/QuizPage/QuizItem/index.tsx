import { FC, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import SvgIcon from 'components/ui/SvgIcon';
import QuizEditForm from 'pages/QuizPage/QuizForm/EditForm';
import { NavLink, useLocation } from 'react-router-dom';
import { TQuizOfList, useAppExtraDispatch } from 'store';
import { getQuizzesListThunk } from 'store/companyData';
import { deleteQuizThunk, getQuizThunk } from 'store/quiz';
import { useCompany, useQuiz } from 'utils/hooks';

import s from './index.module.scss';

type TQuizProps = {
  props: TQuizOfList;
};

const QuizItem: FC<TQuizProps> = ({ props }) => {
  const { quiz_id, quiz_name, quiz_title, quiz_description } = props;
  const { pathname } = useLocation();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();
  const { result, quiz } = useQuiz();
  const [isAddQuizModal, setIsAddQuizModal] = useState(false);

  if (!quiz_id || !company) return;
  const isActive = quiz?.quiz_id === quiz_id;

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    const { company_id } = company;
    if (!confirm(`Are you sure you want to delete: ${quiz_name}`)) return;
    await dispatchExtra(deleteQuizThunk({ quiz_id }));
    await dispatchExtra(getQuizzesListThunk({ company_id }));
  };

  const handleEdit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    await dispatchExtra(getQuizThunk({ quiz_id }));
    setIsAddQuizModal(!isAddQuizModal);
  };

  return (
    <NavLink
      to={`/quiz/${quiz_id}`}
      state={{ from: pathname }}
      className={classNames(s.item, s.hover, isActive && s.active)}
    >
      <span>{quiz_id}</span>
      <span>{quiz_name}</span>
      <span>{quiz_title}</span>
      <span>{quiz_description}</span>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleEdit}
      >
        <SvgIcon className={s.icon_svg} svgId="ui-edit" />
      </Button>

      <Button
        className={s.button}
        variant="round"
        color="transparent"
        onClick={handleDelete}
      >
        <SvgIcon className={s.icon_svg} svgId="ui-trash" />
      </Button>

      {isActive ? <span>{`result: ${result?.result_score}%`}</span> : <span />}

      {isAddQuizModal && (
        <Modal
          className={s.modal}
          setIsModal={() => setIsAddQuizModal(!isAddQuizModal)}
        >
          <QuizEditForm setIsModal={() => setIsAddQuizModal(!isAddQuizModal)} />
        </Modal>
      )}
    </NavLink>
  );
};

export default QuizItem;

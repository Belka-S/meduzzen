import { FC, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import QuizEditForm from 'pages/QuizPage/QuizForm/EditForm';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import SvgIcon from 'components/ui/SvgIcon';
import { TQuizOfList, useAppExtraDispatch } from 'store';
import { getQuizzesListThunk } from 'store/companyData';
import { deleteQuizThunk, getQuizThunk } from 'store/quiz';
import { useCompany } from 'utils/hooks';

import s from './index.module.scss';

type TQuizProps = {
  props: TQuizOfList;
};

const QuizItem: FC<TQuizProps> = ({ props }) => {
  const { quiz_id, quiz_name, quiz_title } = props;
  const { quiz_description, quiz_frequency } = props;
  // const dispatch = useAppDispatch();
  const dispatchExtra = useAppExtraDispatch();
  const { company } = useCompany();
  const [isAddQuizModal, setIsAddQuizModal] = useState(false);

  if (!quiz_id) return;
  // const isChecked = checkedCompanies.some(el => el.company_id === company_id);
  const isActive = false;

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    if (!company) return;
    const { company_id } = company;
    if (!confirm(`Are you sure you want to delete: ${quiz_name}`)) return;
    await dispatchExtra(deleteQuizThunk({ quiz_id }));
    await dispatchExtra(getQuizzesListThunk({ company_id }));
  };

  const handleEdit = async () => {
    await dispatchExtra(getQuizThunk({ quiz_id }));
    setIsAddQuizModal(!isAddQuizModal);
  };

  const handleTakeQuiz = async () => {
    // console.log('qwe');
  };

  return (
    <div
      className={classNames(s.item, s.hover, isActive && s.active)}
      onClick={handleTakeQuiz}
    >
      <span>{quiz_name}</span>
      <span>{quiz_title}</span>
      <span>{quiz_description}</span>
      <span>{quiz_frequency}</span>

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

      <span>{quiz_id}</span>

      {isAddQuizModal && (
        <Modal
          className={s.modal}
          setIsModal={() => setIsAddQuizModal(!isAddQuizModal)}
        >
          <QuizEditForm setIsModal={() => setIsAddQuizModal(!isAddQuizModal)} />
        </Modal>
      )}
    </div>
  );
};

export default QuizItem;

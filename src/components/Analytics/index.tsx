import { FC, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import classNames from 'classnames';
import H3 from 'components/ui/Typography/H3';
import { TRatingAnalytic, useAppExtraDispatch } from 'store';
import {
  getAnalyticQuizThunk,
  getAnalyticUsersThunk,
  getAnalyticUserThunk,
  getRatingQuizThunk,
  getRatingUsersThunk,
  getRatingUserThunk,
} from 'store/companyData';
import { useAction, useQuiz, useUser } from 'utils/hooks';

import s from './index.module.scss';

type TAnalytics = {
  company_id: number;
};

const Analytics: FC<TAnalytics> = ({ company_id }) => {
  const dispatchExtra = useAppExtraDispatch();
  const { user } = useUser();
  const { quiz } = useQuiz();
  const { companyData, loadingCD } = useAction();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    dispatchExtra(getRatingUsersThunk({ company_id }));
    dispatchExtra(getAnalyticUsersThunk({ company_id }));
    if (!user) return;
    const { user_id } = user;
    dispatchExtra(getRatingUserThunk({ user_id, company_id }));
    dispatchExtra(getAnalyticUserThunk({ user_id, company_id }));
    if (!quiz) return;
    const { quiz_id } = quiz;
    dispatchExtra(getRatingQuizThunk({ quiz_id, company_id }));
    dispatchExtra(getAnalyticQuizThunk({ quiz_id, company_id }));
  }, [company_id, dispatchExtra, quiz, user]);

  const ratingUsers = companyData.analyticUsers.reduce((acc, el) => {
    console.log('el: ', el.rating);
    return [...acc, ...el.rating];
  }, [] as TRatingAnalytic[]);

  console.log('ratingUsers: ', ratingUsers);

  useEffect(() => {
    if (canvas.current) {
      const chart = new Chart(canvas.current, {
        type: 'bar',
        data: {
          labels: ratingUsers.map(el => `${el.pass_at}`),
          datasets: [
            {
              label: 'Users rating by time',
              data: ratingUsers.map(el => `${el.average_rating}`),
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  });

  if (loadingCD) return;
  return (
    <div className={s.analytics}>
      {!ratingUsers[0] && <H3>No rating yet</H3>}
      <canvas
        className={classNames(!ratingUsers[0] ? 'hidden' : s.chart)}
        ref={canvas}
      ></canvas>
    </div>
  );
};

export default Analytics;

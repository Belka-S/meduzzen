import { toast } from 'react-toastify';
import { TCompany, TCompanyAppendix, TCompanyOfList } from 'store';
import { TCompanySelect, TEdit, TPagination } from 'store';
import { initialState, TInitialState } from 'store/company';
import * as TNK from 'store/company/companyThunks';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [TNK.createCompanyThunk, TNK.getCompanyThunk];

type TState = 'pending' | 'fulfilled' | 'rejected';
const fn = (state: TState) => thunkArr.map(el => el[state]);

// handlers
const handleSuccess = () => {
  toast.success('Success');
};

const handleAvatarPreviewSuccess = (
  state: TInitialState,
  action: PayloadAction<Pick<TCompany, 'company_avatar'>>,
) => {
  if (!state || !state.company) return;
  const { company_avatar } = action.payload;
  state.company.company_avatar = company_avatar;
};

const handleSelectCompanies = (
  state: TInitialState,
  action: PayloadAction<TCompanySelect>,
) => {
  state.select = action.payload;
};

const handleCheckCompany = (
  state: TInitialState,
  action: PayloadAction<TCompanyOfList>,
) => {
  state.checked.push(action.payload);
};

const handleUncheckCompany = (
  state: TInitialState,
  action: PayloadAction<Pick<TCompany, 'company_id'>>,
) => {
  const { company_id } = action.payload;
  const index = state.checked.findIndex(el => el.company_id === company_id);
  state.checked.splice(index, 1);
};

const handleAppendix = (
  state: TInitialState,
  action: PayloadAction<TCompanyAppendix>,
) => {
  state.appendix = action.payload;
};

const handleEditSuccess = (
  state: TInitialState,
  action: PayloadAction<TEdit>,
) => ({ ...state, edit: action.payload });

const handleCreateSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TCompanyOfList }>,
) => {
  state.companyList.push(action.payload.result);
};

const handleGetSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TCompany }>,
) => {
  state.company = action.payload.result;
};

const handleUpdateVisibleSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: Pick<TCompany, 'company_id'> }>,
) => {
  const { company_id } = action.payload.result;
  const index = state.companyList.findIndex(el => el.company_id === company_id);
  const company = state.companyList.at(index);
  if (state.select === 'all' && company) {
    const is_visible = !company.is_visible;
    state.companyList.splice(index, 1, { ...company, is_visible });
  }
};

const handleDeleteSuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: Pick<TCompany, 'company_id'> }>,
) => {
  const { company_id } = action.payload.result;
  const index = state.companyList.findIndex(el => el.company_id === company_id);
  state.companyList.splice(index, 1);
};

const handleGetAllSuccess = (
  state: TInitialState,
  action: PayloadAction<{
    result: { companies: TCompanyOfList[]; pagination: TPagination };
  }>,
) => {
  const { companies, pagination } = action.payload.result;
  state.companyList = [...state.companyList, ...companies];
  state.pagination = pagination;
};

// slice
const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    updateAvatarPreview: handleAvatarPreviewSuccess,
    selectCompanies: handleSelectCompanies,
    checkCompany: handleCheckCompany,
    uncheckCompany: handleUncheckCompany,
    uncheckAllCompanies: state => ({ ...state, checked: [] }),
    setCompanyAppendix: handleAppendix,
    editCompany: handleEditSuccess,
  },
  extraReducers: builder => {
    builder
      // company success
      .addCase(TNK.createCompanyThunk.fulfilled, handleCreateSuccess)
      .addCase(TNK.getCompanyThunk.fulfilled, handleGetSuccess)
      .addCase(TNK.updateInfoThunk.fulfilled, () => {})
      .addCase(TNK.updateVisibleThunk.fulfilled, handleUpdateVisibleSuccess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleSuccess)
      .addCase(TNK.deleteCompanyThunk.fulfilled, handleDeleteSuccess)
      // companyList success
      .addCase(TNK.getAllCompaniesThunk.fulfilled, handleGetAllSuccess)
      // loading, error
      .addMatcher(isAnyOf(...fn('pending')), state => {
        return { ...state, loading: true, error: false };
      })
      .addMatcher(isAnyOf(...fn('fulfilled')), state => {
        return { ...state, loading: false, error: false };
      })
      .addMatcher(isAnyOf(...fn('rejected')), (state, action) => {
        return { ...state, loading: false, error: action.payload };
      });
  },
});

export const companyReducer = companySlice.reducer;

export const {
  updateAvatarPreview,
  selectCompanies,
  checkCompany,
  uncheckAllCompanies,
  uncheckCompany,
  setCompanyAppendix,
  editCompany,
} = companySlice.actions;

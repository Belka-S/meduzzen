import { toast } from 'react-toastify';
import { TCompany, TCompanyFromList, TEdit, TPagination } from 'store';
import { initialState, TInitialState } from 'store/company';
import * as TNK from 'store/company/companyThunks';

import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

const thunkArr = [TNK.createCompanyThunk, TNK.getCompanyThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// handlers
const handleSuccess = () => {
  toast.success('Success');
};

const handleAvatarPreviewSuccess = (
  state: TInitialState,
  action: PayloadAction<Pick<TCompany, 'company_avatar'>>,
) => {
  if (!state || !state.company) return;
  return { ...state, company: { ...state.company, ...action.payload } };
};

const handleEditSuccess = (
  state: TInitialState,
  action: PayloadAction<TEdit>,
) => ({ ...state, edit: action.payload });

const handleGetCompanySuccess = (
  state: TInitialState,
  action: PayloadAction<{ result: TCompany }>,
) => ({ ...state, company: action.payload.result });

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
    result: { companies: TCompanyFromList[]; pagination: TPagination };
  }>,
) => ({
  ...state,
  companyList: state.companyList.concat(action.payload.result.companies),
  pagination: action.payload.result.pagination,
});

// slice
const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    updateAvatarPreview: handleAvatarPreviewSuccess,
    editCompany: handleEditSuccess,
  },
  extraReducers: builder => {
    builder
      // company
      .addCase(TNK.createCompanyThunk.fulfilled, handleSuccess)
      .addCase(TNK.getCompanyThunk.fulfilled, handleGetCompanySuccess)
      .addCase(TNK.updateInfoThunk.fulfilled, handleSuccess)
      .addCase(TNK.updateVisibleThunk.fulfilled, handleSuccess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleSuccess)
      .addCase(TNK.deleteCompanyThunk.fulfilled, handleDeleteSuccess)
      // companyList
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

export const { updateAvatarPreview, editCompany } = companySlice.actions;

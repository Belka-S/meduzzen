import { toast } from 'react-toastify';
import {
  TCompaniesList,
  TCompany,
  TCompanyFromList,
  TEdit,
  TPagination,
} from 'store';
import { initialState } from 'store/company';
import * as TNK from 'store/company/companyThunks';

import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

const thunkArr = [TNK.createCompanyThunk, TNK.getCompanyThunk];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    if (type === 'pending') return el.pending;
    if (type === 'fulfilled') return el.fulfilled;
    else return el.rejected;
  });

// fulfilled slice
const handleGetSuccess = (
  state: TCompany | null,
  action: PayloadAction<{ result: TCompany }>,
) => ({ ...state, ...action.payload?.result });

const handleUpdateSuccess = (
  state: TCompany | null,
  action: PayloadAction<{ result: TCompany }>,
) => ({ ...state, ...action.payload.result });

//

const handleGetAllSuccess = (
  state: TCompaniesList,
  action: PayloadAction<{ result: { companies: TCompaniesList } }>,
) => state.concat(action.payload.result.companies);

const handleCreateCompanySuccess = (
  state: TCompaniesList,
  action: PayloadAction<{ result: TCompanyFromList }>,
) => {
  state.push(action.payload.result);
};

const handleDeleteSuccess = (
  state: TCompaniesList,
  action: PayloadAction<{ result: Pick<TCompany, 'company_id'> }>,
) => {
  const { company_id } = action.payload.result;
  const index = state.findIndex(el => el.company_id === company_id);
  console.log('index: ', index);
  state.splice(index, 1);
};

const handlePaginationSuccess = (
  _: TPagination,
  action: PayloadAction<{ result: { pagination: TPagination } }>,
) => action.payload.result.pagination;

const handleEditSuccess = (_: TEdit, action: PayloadAction<TEdit>) =>
  action.payload;

const handleSuccess = () => {
  toast.success('Success');
};

const handleAvatarPreviewSuccess = (
  state: TCompany | null,
  action: PayloadAction<Pick<TCompany, 'company_avatar'>>,
) => state && { ...state, ...action.payload };

// company
const companySlice = createSlice({
  name: 'company',
  initialState: initialState.company,
  reducers: {
    updateAvatarPreview: handleAvatarPreviewSuccess,
  },
  extraReducers: builder => {
    builder
      .addCase(TNK.getCompanyThunk.fulfilled, handleGetSuccess)
      .addCase(TNK.updateInfoThunk.fulfilled, handleUpdateSuccess)
      .addCase(TNK.updateVisibleThunk.fulfilled, handleSuccess)
      .addCase(TNK.updateAvatarThunk.fulfilled, handleSuccess);
  },
});

// edit
const editSlice = createSlice({
  name: 'edit',
  initialState: initialState.edit,
  reducers: { editCompany: handleEditSuccess },
});

// companyList
const companiesListSlice = createSlice({
  name: 'companyList',
  initialState: initialState.companiesList,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(TNK.getAllCompaniesThunk.fulfilled, handleGetAllSuccess)
      .addCase(TNK.createCompanyThunk.fulfilled, handleCreateCompanySuccess)
      .addCase(TNK.deleteCompanyThunk.fulfilled, handleDeleteSuccess);
  },
});

// pagination
const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState.pagination,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      TNK.getAllCompaniesThunk.fulfilled,
      handlePaginationSuccess,
    );
  },
});

// loading slice
const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => true)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), () => false);
  },
});

// error slice
const errorSlice = createSlice({
  name: 'error',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => false)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), (_, action) => action.payload);
  },
});

export const companyReducer = combineReducers({
  company: companySlice.reducer,
  companiesList: companiesListSlice.reducer,
  pagination: paginationSlice.reducer,
  edit: editSlice.reducer,
  loading: loadingSlice.reducer,
  error: errorSlice.reducer,
});

export const { editCompany } = editSlice.actions;
export const { updateAvatarPreview } = companySlice.actions;

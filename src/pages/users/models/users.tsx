import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
    loading: false,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    // SHOW_LOADING(state) {
    //   return { ...state, loading: true};
    // },
    // HIDE_LOADING(state) {
    //   return { ...state, loading: false};
    // },
  },
  effects: {
    *fetch({ payload: { page = '1'} }, { call, put }) {
      // yield put({ type: 'SHOW_LOADING' });
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers && headers['x-total-count'] || 10, 10 ),
          page: parseInt(page, 10)
        }
      });
      // yield put({ type: 'HIDE_LOADING' });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(usersService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};

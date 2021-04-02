/*
 * @Author: your name
 * @Date: 2020-09-10 17:22:12
 * @LastEditTime: 2020-09-10 17:52:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \weath\src\pages\costInfo\model.js
 */
import {} from './service'

const Model = {
  namespace: 'billListDetail',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload)
      yield put({
        type: 'fetch',
        payload: Array.isArray(response) ? response : [],
      })
    },
  },
  reducers: {
    fetch(state, action) {
      return { ...state, list: action.payload }
    },
  },
}

export default Model

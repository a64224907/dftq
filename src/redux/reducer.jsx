import storageUtils from '../util/storageUtils'
import {combineReducers} from 'redux'
const initHeadTitle = '首页'
function headTitle (state=initHeadTitle,action) {
  switch(action.type) {
    default:
      return state
  }
}
const initUser = storageUtils.getUser()
function user (state=initUser,action) {
  switch(action.type) {
    default:
      return state
  }
}
export default combineReducers({
  headTitle,
  user
})
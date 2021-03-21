import ApplicationRecord from '../../models/Base'
import SessionModel from '../../lib/fxnet/session'

export const updateToken = (state, token) => {
  ApplicationRecord.jwt=token
  state.session = new SessionModel(token)
}

export function logout (state) {
  console.debug("action logout")
  ApplicationRecord.jwt=null
  state.session = new SessionModel()
//  LocalStorage.remove('login_token')
}

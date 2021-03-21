import SessionModel from '../../lib/fxnet/session'
export default function () {
  return {
    session: new SessionModel()
  }
}

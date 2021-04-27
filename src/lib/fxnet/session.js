import moment from 'moment'
import jwt from 'jsonwebtoken'

const GUEST_ID=2
const ADMIN_ID=1
class Session {
  constructor(token) {
    this.token=token
    if (token) {
      this.decoded=jwt.decode(this.token)
    } else {
      this.decoded = { exp: 0,
                       data: {
                         user_id: GUEST_ID,
                         login: "guest"
                       }
                     }
    }
  }

  isLoggedIn() {
//    console.log("isLoggedIn:", this.isGuest(), this.isExpired(), !this.isGuest() && !this.isExpired())
    return !this.isGuest() && !this.isExpired()
  }

  expiresAt() {
    if (this.decoded.exp == 0) {
      return (new Date() + 24*60*60*1000) // in one day (never)
    } else {
      return new Date(this.decoded.exp*1000)
    }
  }

  timeLeft() {
    return (this.expiresAt() - new Date())/1000
  }

  isExpired() {
    return this.timeLeft() < 0
  }

  isGuest() {
//    console.log("is guest", this.decoded.data.user_id, GUEST_ID, this.decoded.data.user_id == GUEST_ID)
    return this.decoded.data.user_id == GUEST_ID
  }

  isAdmin() {
    return this.decoded.data.user_id == ADMIN_ID
  }

  userId() {
    return this.decoded.data.user_id
  }

  name() {
    return this.decoded.name
  }

  timeLeftString() {
      return moment(this.expiresAt()).fromNow()
  }
}

export default Session;

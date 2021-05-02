import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

class SecurityMgr {
  constructor(store, config) {
    console.log("SecurityMgr", config)
    var mgr = new Oidc.UserManager({
      authority: config.authority,
      client_id: config.client_id,
      redirect_uri: window.location.origin + '/oidc/callback',
      response_type: 'id_token token',
      scope: config.scope,

      //https://github.com/IdentityModel/oidc-client-js/wiki
      //clockScew: 300,
      loadUserInfo: true,
      //filterProtocolClaims: true
      //post_logout_redirect_uri: window.location.origin + '/oidc/login',
      //popup_redirect_uri: '',
      //popupWindowFeatures (string, default: 'location=no,toolbar=no,width=500,height=500,left=100,top=100'):
      //silent_redirect_uri: window.location.origin + '/oidc/silent-renew',
      //automaticSilentRenew: true,
      //silentRequestTimeout (number, default: 10000),
      //accessTokenExpiringNotificationTime: 30,
      //stateStore: (default: local storage): Storage object used to persist interaction state. E.g. userStore: new WebStorageStateStore({ store: window.localStorage })
      userStore: new Oidc.WebStorageStateStore(),
      //monitorSession [1.1.0]: (default: true),
      //revokeAccessTokenOnSignout [1.2.1] (default: false):
      //includeIdTokenInSilentRenew [1.4.0] (default: true)
      //staleStateAge (default: 300):
      //extraQueryParams
      //mergeClaims [1.11.0] (default: false)
      //client_authentication [1.11.0] (default: client_secret_post)
      //clockService [1.11.0]
    })


    mgr.events.addUserLoaded(function (user) {
      console.log('New User Loaded：', arguments);
      console.log('Acess_token: ', user.access_token)
    });

    mgr.events.addAccessTokenExpiring(function () {
      console.log('AccessToken Expiring：', arguments);
    });

    mgr.events.addAccessTokenExpired(function () {
      console.log('AccessToken Expired：', arguments);
      //alert('Session expired. Going out!');
      //mgr.signoutRedirect().then(function (resp) {
      //  console.log('signed out', resp);
      //}).catch(function (err) {
      //  console.log(err)
      //})
    });

    mgr.events.addSilentRenewError(function () {
      console.error('Silent Renew Error：', arguments);
    });

    mgr.events.addUserSignedOut(function () {
      alert('Going out!');
      console.log('UserSignedOut：', arguments);
      mgr.signoutRedirect().then(function (resp) {
        console.log('signed out', resp);
      }).catch(function (err) {
        console.log(err)
      })
    });

    this.mgr=mgr
    this.store= store
  }

  // Renew the token manually
  renewToken () {
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.signinSilent().then(function (user) {
        if (user == null) {
          self.signIn(null)
        } else{
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the user who is logged in
  getUser () {
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          self.store.commit('session/logout')
          return resolve(null)
        } else{
          self.store.commit('session/updateToken', user.id_token)
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Check if there is any user logged in
  getSignedIn () {
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Redirect of the current window to the authorization endpoint.
  signIn () {
    this.mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }

  // Redirect of the current window to the end session endpoint
  async signOut () {
    this.store.commit('session/logout')
    await this.mgr.removeUser()
//    mgr.signoutRedirect().then(function (resp) {
//      console.log('signed out', resp);
//    }).catch(function (err) {
//      console.log(err)
//    })
  }

  // Get the profile of the user logged in
  getProfile () {
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the token id
  getIdToken(){
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{
          return resolve(user.id_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the session state
  getSessionState(){
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{
          return resolve(user.session_state)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the access token of the logged in user
  getAcessToken(){
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Takes the scopes of the logged in user
  getScopes(){
    let self = this
    return new Promise((resolve, reject) => {
      self.mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{
          return resolve(user.scopes)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }


  async signinRedirectCallback() {
    var idpUser = await this.mgr.signinRedirectCallback()
    this.store.commit('session/updateToken', idpUser.id_token)
    return idpUser
  }
}

export default SecurityMgr

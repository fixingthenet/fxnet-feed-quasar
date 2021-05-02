// this throws an error on boot time
//import {App, ApplicationRecord} from '../lib/auth_api';
import Config from '../lib/fxnet/config';
import SecurityMgr from '../lib/fxnet/SecurityMgr'
import AppConfiguration from '../models/AppConfiguration'
import BaseModel from '../models/Base'

const {SpraypaintBase,MiddlewareStack} = require("spraypaint/dist/spraypaint")

export default async ({store, Vue, router}) => {
  var config = Config.config;
  var appConfiguration = (await AppConfiguration.find(config.app_configuration_identifier)).data
  console.log("Fxnet Boot", appConfiguration)

  var securityMgr = new SecurityMgr(store, {
    authority: appConfiguration.configuration.oidc_issuer,
    client_id: appConfiguration.configuration.oidc_client_id,
    scope: appConfiguration.configuration.oidc_scopes,
  })
  console.log(config)
  // var res= await App.base()

  var fxnet= {//backend: res.data.configuration,
    frontend: config,
    securityMgr: securityMgr,
  }

  // store.commit('session/updateToken', ApplicationRecord.jwt)
  //convinience:
  //Vue.prototype.$fxnet = fxnet
  router.fxnet=fxnet;

  router.beforeEach( (to, from, next) => {
    if (to.meta.public)  {
      next()
    } else {
      //window.location.href = config.app_login_url
      var user = securityMgr.getUser().then((user) => {
        console.log("fxnet router user", user)
        if (!user) {
          window.localStorage.setItem('backLocation', window.location.pathname)
          securityMgr.signIn()
        } else {
          next()
        }
      })
    }
  })

  //var MiddlewareStack = spraypaint.MiddlewareStack;
  var middlewareStack = new MiddlewareStack();
  BaseModel.middlewareStack = middlewareStack
  middlewareStack.afterFilters.push(function(response, json) {
    //console.log("debugging:", response, response.status,json)
    if (response.status === 401) {
      store.commit('session/logout');
      securityMgr.signIn()
    }
  });

/*
  middleware.afterFilters.push(function(response, json) {

    console.log("debugging:", response.headers['Location'], response.redirected)
  });
*/


//  console.log("Middleware",middleware)
}

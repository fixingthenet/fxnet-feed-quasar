// this throws an error on boot time
//import {App, ApplicationRecord} from '../lib/auth_api';
import Config from '../lib/fxnet/config';
const {
  SpraypaintBase
} = require("spraypaint/dist/spraypaint")

export default async ({store, Vue, router}) => {
  var config = Config.config;
  console.log(config)
  // var res= await App.base()

  //var fxnet= {backend: res.data.configuration, frontend: config}

  // store.commit('session/updateToken', ApplicationRecord.jwt)
  //convinience:
  //Vue.prototype.$fxnet = fxnet
  //router.$fxnet=fxnet;

/*  router.beforeEach((to, from, next) => {
    if (!to.meta.public && !store.state.session.session.isLoggedIn() )
    {
      next({name: 'login', query: {next: to.fullPath}})
    } else {
      next()
    }

  })
*/
  //var MiddlewareStack = spraypaint.MiddlewareStack;
  //var middleware = new MiddlewareStack();
  //var middleware = ApplicationRecord.middlewareStack

/*
  middleware.afterFilters.push(function(response, json) {
    console.log("debugging:", response, response.status,json)
    console.log("debugging:", response.headers['Location'], response.redirected)
  });
*/
/*  middleware.afterFilters.push(function(response, json) {
    if (response.status === 401) {
      store.commit('session/logout');
      window.location.href = "/login";
      throw("abort");
    }
  });
*/
//  console.log("Middleware",middleware)

}

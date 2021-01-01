import Vue from 'vue'
import { SpraypaintBase, MiddlewareStack } from 'spraypaint'

const Base = SpraypaintBase.extend({
  static: {
    baseUrl: 'https://rss-reader.dev.fixingthe.net', //${envVariables.API_HOST}`,
    apiNamespace: '/api/v1',
  },
})

const middleware = new MiddlewareStack()
middleware.beforeFilters.push((url, options) => {
//  const apiKey = Vue.spraypaintConfig.config.store.getters.user.api_key
//  const encodedApiKey = btoa(`api_key:${apiKey}`)
//  options.headers.Authorization = `Basic ${encodedApiKey}`
})

Base.middlewareStack = middleware

export default Base

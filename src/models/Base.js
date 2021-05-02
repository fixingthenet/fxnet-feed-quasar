import Vue from 'vue'
import { SpraypaintBase, MiddlewareStack } from 'spraypaint'

const Base = SpraypaintBase.extend({
  static: {
    baseUrl: 'https://rss-reader.dev.fixingthe.net', //${envVariables.API_HOST}`,
    apiNamespace: '/api/v1',
  },
})

export default Base

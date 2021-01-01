import Vue from 'vue'

const spraypaintConfig = { config: null }

export default ({ store }) => {
  spraypaintConfig.config = {
    store,
  }
}

Vue.spraypaintConfig = spraypaintConfig

//const { SpraypaintVue } = require('spraypaint-vue')

//Vue.use(SpraypaintVue)


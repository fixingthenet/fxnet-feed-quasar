import { attr, belongsTo } from 'spraypaint'
import Base from './Base'

export default Base.extend({
  static: {
    jsonapiType: 'app_configurations',
  },
  attrs: {
    configuration: attr(),
  }
})

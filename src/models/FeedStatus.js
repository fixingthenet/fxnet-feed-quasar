import { attr, belongsTo } from 'spraypaint'
import Base from './Base'

export default Base.extend({
  static: {
    jsonapiType: 'feed_statuses',
  },
  attrs: {
    name: attr(),
    label: attr(),
  }
})

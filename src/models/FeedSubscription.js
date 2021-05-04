import { attr, belongsTo } from 'spraypaint'
import Base from './Base'

export default Base.extend({
  static: {
    jsonapiType: 'feed_subscriptions',
  },
  attrs: {
    userId: attr(),
    feedId: attr(),
    createdAt: attr(),
    feed: belongsTo(),

  }
})

import { attr, belongsTo, hasOne } from 'spraypaint'
import Base from './Base'
import moment from 'moment'

export default Base.extend({
  static: {
    jsonapiType: 'feeds',
  },
  attrs: {
    name: attr(),
    url: attr(),
    lastFetchedAt: attr(),
    createdAt: attr(),
    updatedAt: attr(),
    lastSuccessAt: attr(),
    lastSuccessCount: attr(),
    lastFailedCount: attr(),
    lastFailedAt: attr(),
    feedSubscriptionsCount: attr(),
    feedStatus: belongsTo(),
    userSubscription: hasOne('feed_subscriptions'),
  },
  methods: {
    lastSuccessAtHr() {
      return moment(this.lastSuccessAt)
    }

  }
})

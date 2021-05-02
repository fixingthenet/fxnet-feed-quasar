import { attr, belongsTo } from 'spraypaint'
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
    feedStatus: belongsTo(),
  },
  methods: {
    lastSuccessAtHr() {
      return moment(this.lastSuccessAt)
    }

  }
})

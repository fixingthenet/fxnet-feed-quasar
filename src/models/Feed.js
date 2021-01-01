import { attr, belongsTo } from 'spraypaint'
import Base from './Base'

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
  }
})

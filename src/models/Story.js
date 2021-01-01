import { attr, belongsTo } from 'spraypaint'
import Base from './Base'

export default Base.extend({
  static: {
    jsonapiType: 'stories',
  },
  attrs: {
    title: attr(),
    permalink: attr(),
    body: attr(),
    entryId: attr(),
    feedId: attr(),
    published: attr(),
    createdAt: attr(),
    updatedAt: attr(),
//    feed: belongsTo()
  }
})

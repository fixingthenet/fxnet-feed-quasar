import { attr, belongsTo } from 'spraypaint'
import Base from './Base'
import moment from 'moment'


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
    readLaterAt: attr(),
    lastOpenedAt: attr(),
    feed: belongsTo(),
  },
  methods: {

  }
})

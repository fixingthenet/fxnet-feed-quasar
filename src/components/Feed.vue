<template>
  <div  style="width: 100%">
    <q-card-section>
      <q-item-label>
        <q-badge outline align="middle" :color="feed.feedStatus.name">{{feed.feedStatus.name}}</q-badge> {{feed.name}}
      </q-item-label>
      <q-item-label caption>
        {{feed.url}}
      </q-item-label>
    </q-card-section>
    <q-card-actions class="row justify-between">
      <div>
        <q-icon color='green' name="check_circle" />{{$d(new Date(feed.lastSuccessAt), 'shortTime')}} <q-badge color="green">{{feed.lastSuccessCount}}</q-badge>
        <q-icon color='red' name="error" />{{$d(new Date(feed.lastFailedAt),'shortTime')}} <q-badge color="red">{{feed.lastFailedCount}}</q-badge>
        <q-icon name="people" /> {{ feed.feedSubscriptionsCount }}

      </div>
      <div class="justify-end">
        <q-btn v-if="isSubscribed(feed)" round v-on:click="unsubscribeFeed(feed)"><q-icon name="unsubscribe" /></q-btn>
        <q-btn v-else round v-on:click="subscribeFeed(feed)"><q-icon name="library_add" /></q-btn>
      </div>
    </q-card-actions>
  </div>
</template>

<script type="text/javascript">
  import FeedSubscription from '../models/FeedSubscription'

  export default {
    data() {
      return {}
    },
    props: {
      feed: {
        required: true,
        type: Object
      }
    },
    computed: {
    },
    methods: {
      isSubscribed(feed) {
        return !!feed.userSubscription
      },
      async subscribeFeed(feed) {
        var feedSub= new FeedSubscription({feedId: feed.id})
        await feedSub.save()
        feed.userSubscription = feedSub
        feed.feedSubscriptionsCount =         feed.feedSubscriptionsCount +1
      },
      async unsubscribeFeed(feed) {
        await feed.userSubscription.destroy()
        feed.userSubscription=null
        feed.feedSubscriptionsCount =         feed.feedSubscriptionsCount -1
      }
    }
  }

</script>

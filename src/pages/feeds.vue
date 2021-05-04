<template>
  <q-page class="center">
    <q-infinite-scroll ref="feedsScroll" @load="loadMore" :offset="50">
      <q-card v-for="(feed,index) in feeds" key="feed.id">
        <feed :feed="feed" v-on:deleted="onDeleted(feed.id)"/>
      </q-card>
    </q-infinite-scroll>
    <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    <router-link :to="{path: '/feeds/add'}">
  <q-btn  round  color="primary"  class="fixed" style="right: 18px; bottom: 18px" >
    <q-icon name="add" />
  </q-btn>
</router-link>
  </q-page>
</template>


<script>
  import feed from '../components/Feed';
  import Feed from '../models/Feed';
  import FeedStatus from '../models/FeedStatus';

  export default {
    components: {
      feed: feed,
    },
    data() {
      return {
        currentTab: this.$route.params.tab,
        feeds: [],
        nextAfter: null,
      }
    },
    methods: {
      // cases:
      // first load (nextAfter == null)
      // last page: nextAfter == 0
      // any page: nextAfter == xxxxxx

      async loadMore(index,done) {
        console.log("Loading more:",index)
        var results = await Feed.includes('feed_status').page(index).per(25).includes('user_subscription').all()
        this.feeds = this.feeds.concat(results.data)

        if (results.data.length == 0) {
          this.$refs.feedsScroll.stop()
        }

        done()
      },
    }
  }
</script>

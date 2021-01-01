<template>
  <q-page class="center">
   <q-infinite-scroll @load="loadMore" :offset="250">
      <q-list>
          <q-item v-for="(feed,index) in feeds" key="feed.id">
            <feed :feed="feed" v-on:deleted="onDeleted(index)"/>
          </q-item>
      </q-list>
      <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    </q-infinite-scroll>
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
      var results = await Feed.page(index).per(25).all()
      this.feeds = results.data
      done()
    },
    onDeleted(index) {
//      this.feeds.splice(index, 1)
    },


  }
}
</script>

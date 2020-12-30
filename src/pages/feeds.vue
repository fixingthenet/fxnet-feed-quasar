<template>
  <q-page class="center">
   <q-infinite-scroll :handler="loadMore">
      <q-list>
      <transition-group name="list" tag="div">
        <p v-for="(feed,index) in feeds" v-bind:key="index" :id="index">
          <feed :feed="feed.node" v-on:deleted="onDeleted(index)"/>
        </p>
      </transition-group>
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

    loadMore(index,done) {
    },
    onDeleted(index) {
//      this.feeds.splice(index, 1)
    },


  }
}
</script>

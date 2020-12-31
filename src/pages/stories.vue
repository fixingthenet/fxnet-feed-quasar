<template>
  <q-page class="center">
   <q-tabs class="float-left" v-model="currentTab">
     <q-route-tab default  to="/stories/new" class="text-white" icon="today"/>
     <q-route-tab to="/stories/all" icon="checked"  class="text-white"/>
     <q-route-tab to="/stories/bookmarked" icon="star"  class="text-white"/>
   </q-tabs>
    <div class="tabs-button">
      <q-btn flat big class="tabs-button" icon="cached" label="Reload"  @click="tabSelected" />
    </div>

   <q-infinite-scroll :offset=50 :handler="loadMore">
      <transition-group name="list" tag="div">
        <div v-for="(story,index) in stories" v-bind:key="story.node.id" :id="index">
        <story :story="story.node"
        v-on:opened="onOpened(index)"
        v-on:unbookmarked="onUnbookmarked(index)"
        v-on:bookmarked="onBookmarked(index)"
        />
          </div>
      <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    </transition-group>
</q-infinite-scroll>

   </div>
  </q-page>
</template>


<script>

import Story from '../components/Story.vue';

export default {
  name: 'PageIndex',
  components: {
    Story
  },
  data() {
    return {
      currentTab: this.$route.params.tab,
      stories: [],
      lastAfter:null,
      nextAfter: null,
    }
  },
  watch: {
    '$route.params.tab'(to,from) {
      this.tabSelected()
    }
  },
  created() {
//    this.tabSelected()
  },
  methods: {
    onOpened(index) {
      if (this.currentTab=='new') {
        this.stories.splice(index, 1)
      }
    },
    onBookmarked(index) {
      if (this.currentTab=='new') {
        this.stories.splice(index, 1)
      }
    },
    onUnbookmarked(index) {
      if (this.currentTab=='bookmarked') {
        this.stories.splice(index, 1)
      }
    },
    tabSelected() {
      console.log("tab selected: ", this.$route.params.tab)
      this.stories=[];
      this.nextAfter=null;
      this.loadMore();

    },
    loadMore(index,done) {
      return
      console.log("loadMore: ", this.nextAfter, this.lastAfter);
      if (this.nextAfter != null && this.nextAfter == this.lastAfter) {
        if (done) {done()}
        return
      }
      this.lastAfter=this.nextAfter;
      var newTab=this.$route.params.tab;
      var filters={limit: 20,
                   onlyUnread: false,
                   onlyMarked: false,
                   after:  this.nextAfter || ""
                   }

      if (newTab=='new') {
        filters.onlyUnread=true
      }
      if (newTab=='bookmarked') {
        filters.onlyMarked=true
      }
      rssFeederApi.stories(filters).
      then((result) => {
        console.log(result);
        if (this.nextAfter==result.stories.pageInfo.endCursor) {
        //ignore results
          console.log("same endcursor");
        } else  {
          if (result.stories.pageInfo.hasNextPage) {
            this.nextAfter=result.stories.pageInfo.endCursor;
          }
          this.stories=this.stories.concat(result.stories.edges);
        }
        if (done) {done()}

      }).
      catch( (e) => {
        if (done) {done()}
        console.log(e)

      })
    }
  }
}
</script>
<style>
.tabs-button {
  background: #027be3;
  min-height: 55px;
  color: #fff;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
/*.list-enter,*/
.list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px) /*scale(1,0);*/
}

</style>

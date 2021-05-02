<template>
  <q-page class="center">
    <q-tabs class="float-left" v-model="currentTab">
      <q-route-tab name="new" default  to="/stories/new"  class="text-white" icon="today"/>
     <q-route-tab name="all" to="/stories/all" icon="clear_all"  class="text-white"/>
     <q-route-tab name="bookmarked" to="/stories/bookmarked" icon="star"  class="text-white"/>
   </q-tabs>
   <div class="tabs-button">
     <q-btn flat big class="tabs-button" icon="cached" @click="tabSelected" >
     </q-btn>
   </div>
   <q-infinite-scroll ref="storiesScroll" @load="loadMore" :offset=50>
     <transition-group appear leave-active-class="animated fadeOutRight" :duration="500">
     <q-card v-for="(story,index) in stories" :key="story.id">
       <story :story="story"
         v-on:opened="onOpened(index)"
         v-on:unbookmarked="onUnbookmarked(index)"
         v-on:bookmarked="onBookmarked(index)"
       />
     </q-card>
</transition-group>
     <q-spinner-dots :size="40"></q-spinner-dots>
   </q-infinite-scroll>

  </q-page>
</template>


<script>
  import story from '../components/Story';
  import Story from '../models/Story'
  export default {
    name: 'PageIndex',
    components: {
      story
    },
    data() {
      return {
        currentTab: null,
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
      this.currentTab=this.$route.params.tab
    },
    methods: {
      onOpened(index) {

        console.debug("onOpened:",index,this.stories.length, this.currentTab,this.$route.params.tab)
        if (this.currentTab=='new') {
          this.stories.splice(index, 1)
//          this.$delete(this.stories,index)
          console.log("onOpened:", this.stories.length)
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
        this.currentTab=this.$route.params.tab
        this.stories=[];
        this.$refs.storiesScroll.resume()
        this.loadMore();
      },
      async loadMore(index,done) {
        console.log("loadMore: ", index, this.currentTab)
        var scope = Story.page(index||1).per(30)
        if (this.currentTab=='new') {
          scope = scope.where({unread: true, bookmarked: false})
        }
        if (this.currentTab=='bookmarked') {
          scope = scope.where({bookmarked: true})
        }

        var results = await scope.all()
        this.stories=this.stories.concat(results.data)
        if (results.data.length == 0) {
          this.$refs.storiesScroll.stop()
        }

        if (done) { done() }
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

<template>
  <div>
  <q-card-section>
    <a :href="story.permalink" target="_feeder" v-on:click="markOpened">{{story.title}}</a> <br/>
    <div class="row">
      <div class="feed col-9">{{story.feed_id}}</div>
      <div class="time col-3">{{$d(new Date(story.published), 'shortTime')}}</div>
    </div>
  </q-card-section>
  <q-card-section>
    {{shortened(story.body,500)}}
    <br/>
    <span> <q-icon :name="viewed(story.lastOpenedAt)" />{{moment(story.lastOpenedAt)}}</span> | <span>{{story.feed.name}}</span>
  </q-card-section>
  <q-card-actions class="justify-end">
    <q-btn round :icon="openedIcon()" v-on:click="toggleOpened" />
    <q-btn round :icon="markedIcon()" v-on:click="toggleMarked" />
  </q-card-actions>
</div>
</template>

<script type="text/javascript">
import mmt from 'moment';

export default {
    data() {
      return {}
    },
    props: {
      story: {
        required: true,
        type: Object
      }
    },
    computed: {
    },
    methods: {

      shortened(sth,lth) {
        if (sth && sth.slice) {
          return sth.slice(0,lth)
        } else {
          return ''
        }
      },
      viewed(time) {
        if (!time) {
          return 'visibility_off'
        } else {
          return 'visibility'
        }
      },
    moment(arg) {
      if (arg) {
        return mmt(Date.parse(arg)).fromNow()
      } else {
        return ''
      }
    },
    markedIcon: function() {
      if (this.story.readLaterAt) {
         return 'bookmark';
      } else {
         return 'bookmark_border';
      }
    },
    openedIcon: function() {
      if (this.story.lastOpenedAt) {
         return 'done';
      } else {
         return '';
      }
    },
    async toggleOpened(event, done) {
     console.log("toggle opened");
     if (this.story.lastOpenedAt) {
       this.story.lastOpenedAt=null
       await this.story.save()
       this.$emit('unopened');
     } else {
       await this.markOpened()
      }
    },

    async markOpened(event, done) {
      console.log("mark opened");
      this.story.lastOpenedAt=new Date()
      await this.story.save()
      this.$emit('opened');
    },

    async toggleMarked(event, done) {
      console.log("toggle marked");
      if (this.story.readLaterAt)  {
        this.story.readLaterAt=null
        await this.story.save()
        this.$emit('unbookmarked');
      } else {
        this.story.readLaterAt=new Date()
        await this.story.save()
        this.$emit('bookmarked');
      }
    },
  }
}

</script>
<style lang="css" scoped>
 .feed {
   font-size: 0.8em;
  }
 .time {
   text-align: right;
   font-size: 0.7em;
 }
</style>

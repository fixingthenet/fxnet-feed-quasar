<template>
  <div  style="width: 100%">
  <q-item-section>
    <q-item-label>
      {{feed.name}}
    </q-item-label>
    <q-item-label caption>
      {{feed.url}}
    </q-item-label>
  </q-item-section>
  <q-item-section side>
    <q-badge outline align="middle" :color="feed.feedStatus.name">{{feed.feedStatus.name}}</q-badge>
    {{feed.lastSuccessAt}}-{{feed.lastSuccessCount}}-{{feed.lastFailedAt}}-{{feed.lastFailedCount}}
    </q-item-section>
  <q-item-section side>
    <q-btn round v-on:click="deleteFeed"><q-icon name="delete" /></q-btn>
  </q-item-section>
</div>
</template>

<script type="text/javascript">

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
    deleteFeed() {
      rssFeederApi.feedDelete({feedId: this.feed.id}).
      then( (result)=>{
        this.$emit('deleted')
      }).catch((e) => {
        console.log("delete error:", e)
      })
    }
  }
}

</script>

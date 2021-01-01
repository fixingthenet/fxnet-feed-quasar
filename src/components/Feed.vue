<template>
<div>
  <q-item-section>
    <q-item-label>
      {{feed.name}}
    </q-item-label>
    <q-item-label caption>
      {{feed.url}}
    </q-item-label>
  </q-item-section>
  <q-item-section side>
    <q-btn flat round v-on:click="deleteFeed" small><q-icon name="delete forever" /></q-btn>
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

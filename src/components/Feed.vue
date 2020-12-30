<template>
<q-item>
<q-item-main>
  <q-item-tile>
    {{feed.name}}
  </q-item-tile>
  <q-item-tile>
    {{feed.url}}
  </q-item-tile>
  </q-item-main>
  <q-item-side right>
    <q-btn flat round v-on:click="deleteFeed" small><q-icon name="delete forever" /></q-btn>
  </q-item-side>
  </q-item>
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

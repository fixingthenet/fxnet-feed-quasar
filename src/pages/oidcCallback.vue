<template>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
      }
    },
    computed: {
    },
    async mounted() {
      console.log("handling callback")
      var user= await this.$router.fxnet.securityMgr.signinRedirectCallback()
      var backLocation= window.localStorage.getItem('backLocation')
      console.log("callback:", user, backLocation)
      this.$router.push({ path: backLocation || '/'})
    },
    methods: {
    }
  }

</script>

<style>

</style>

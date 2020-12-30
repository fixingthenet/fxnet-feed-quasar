<template>
  <div>
    <q-list no-border link inset-delimiter>
      <q-item v-for="(section,key,index) in sections" :key="section.title">
        <q-item-side :icon="section.icon" />
        <router-link :to="section.route">
          {{section.title}}
        </router-link>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        sections: [
          { title: 'Storries', route: {name: 'stories', params: { tab: 'new'}}, icon: 'chat' },
          { title: 'Feeds', route: {name: 'feeds'}, icon: 'rss feed' },
          // { title: 'Optimize', path: 'optimize' },
        ],
      };
    },
  };
</script>

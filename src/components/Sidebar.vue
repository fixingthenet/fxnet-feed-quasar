<template>
  <q-list no-border link inset-delimiter>
    <q-item-label header class="text-grey-8">
      RSS Reader
    </q-item-label>

    <q-item v-for="(section,key,index) in sections" :key="section.title" clickable>
      <q-item-section avatar>
        <q-avatar :icon="section.icon"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <router-link :to="section.route">
            {{section.title}}
          </router-link>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        sections: [
          { title: 'Storries', route: {name: 'stories', params: { tab: 'new'}}, icon: 'message' },
          { title: 'Feeds', route: {name: 'feeds'}, icon: 'feed' },
        ],
      };
    },
  };
</script>

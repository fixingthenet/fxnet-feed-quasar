<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Feed reader
        </q-toolbar-title>
        <div>
         {{ session.session.name() }}
        </div>
        <q-btn flat>
          <q-icon name='logout' @click="logout" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <sidebar/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import Sidebar from 'components/Sidebar';

  export default {
    name: 'MainLayout',
    components: {
      Sidebar
    },
    computed: {
      session() {
        return this.$store.state.session
      }
    },
    data() {
      return {
        leftDrawerOpen: false,
      };
    },
    methods: {
      async logout() {
        await this.$router.fxnet.securityMgr.signOut()
        window.location='/' //ugly but works
      }
    },

  };
</script>

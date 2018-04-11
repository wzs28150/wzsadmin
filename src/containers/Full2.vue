<template>
<div class="app">
  <AppHeader/>
  <div class="app-body">
    <Sidebar/>
    <main class="main">
      <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
        <div class="scroll-me">
          <breadcrumb :list="list" />
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </div>
      </vue-scrollbar>
    </main>
    <AppAside/>
  </div>
  <AppFooter/>
</div>
</template>

<script>
import VueScrollbar from 'vue2-scrollbar';
import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
import AppAside from '../components/Aside'
import AppFooter from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
require("../../static/css/vue2-scrollbar.css");
require("../../static/css/app.css");
export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    VueScrollbar,
    Breadcrumb
  },
  computed: {
    name() {
      return this.$route.name
    },

    list() {
      return this.$route.matched
    }
  }
}
</script>
<style type="text/css" scoped>
.my-scrollbar {
  width: 100%;
  height: 100%;
}

/* .my-scrollbar {
max-height: 100%;
} */

/*The Content*/

.scroll-me {
  width: 100%;
}
</style>

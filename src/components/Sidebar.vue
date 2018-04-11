<template>
<div class="sidebar">
  <nav class="sidebar-nav">
    <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
      <div class="scroll-me">
        <sidebar-item :routes='siderbar_routers.children'></sidebar-item>
      </div>
    </vue-scrollbar>
  </nav>
</div>
</template>
<script>
import VueScrollbar from 'vue2-scrollbar';
import SidebarItem from './SidebarItem';
import {
  mapGetters
} from 'vuex';
export default {
  name: 'sidebar',
  components: {
    VueScrollbar,
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'siderbar_routers'
    ])
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
  .sidebar .sidebar-nav{ overflow: hidden;}
</style>
<style type="text/css" scoped>
@import '/static/css/vue2-scrollbar.css';
@import '/static/css/app.css';
.my-scrollbar {
  width: 100%;
  height: 100%;
}
.sidebar .sidebar-nav {
    overflow: auto!important;
}
.vue-scrollbar__wrapper{ background: none;}

/* .my-scrollbar {
max-height: 100%;
} */

/*The Content*/

.sidebar {
    background: #424f63;
}
.scroll-me {
  width: 100%;
}

.sidebar .nav .nav-item .nav-link, .sidebar .nav .nav-item .navbar .dropdown-toggle {
  background: #20a8d8;
}
.my-scroll-bar .sidebar,.my-scroll-bar .sidebar-nav{ height: auto;}
</style>

<style lang="css">

.nav-link {
    cursor: pointer;
}

.sidebar .sidebar-nav {
    overflow: hidden;
}

</style> <style type="text/css" scoped> @import '/static/css/vue2-scrollbar.css';
@import '/static/css/app.css';
.my-scrollbar {
    width: 100%;
    height: 100%;
}

.sidebar .sidebar-nav {
    overflow: auto!important;
}

.vue-scrollbar__wrapper {
    background: none;
}


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

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-text {
    transition:opacity 0.4s,transform 0.4s
}

.layout-hide-text .layout-text {
    opacity: 0;
    font-size: 0;
    transition:opacity 0.4s,transform 0.4s
}



.layout-menu-left.ivu-col.ivu-col-span-1 li {
    text-align: center;
}

</style>

<template>
<!-- <div class="sidebar">
  <nav class="sidebar-nav">
    <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
      <div class="scroll-me">
        <sidebar-item :routes='siderbar_routers.children'></sidebar-item>
      </div>
    </vue-scrollbar>
  </nav>
</div> -->
<i-col :span="spanLeft" class="layout-menu-left">
	<Menu active-name="1" theme="dark" width="auto">
		<div class="layout-logo-left"></div>
		<Menu-item name="1">
			<Icon type="ios-navigate" :size="iconSize"></Icon>
			<span class="layout-text">选项 1</span>
		</Menu-item>
		<Menu-item name="2">
			<Icon type="ios-keypad" :size="iconSize"></Icon>
			<span class="layout-text">选项 2</span>
		</Menu-item>
		<Menu-item name="3">
			<Icon type="ios-analytics" :size="iconSize"></Icon>
			<span class="layout-text">选项 3</span>
		</Menu-item>
	</Menu>
</i-col>
</template>

<script>
import VueScrollbar from 'vue2-scrollbar';
import SidebarItem from './SidebarItem';
import Sidebar from './Sidebar'
import {
	mapGetters
}
from 'vuex';
export default {
	name: 'sidebar',
	components: {
		VueScrollbar,
		SidebarItem
	},
	props: ['spanLeft', 'spanRight'],
	computed: {
		...mapGetters([
			'siderbar_routers'
		]),
		iconSize() {
			return this.spanLeft === 3 ? 14 : 24;
		}
	},

	methods: {

		// handleClick(e) {
		// 	e.preventDefault()
		// 	e.target.parentElement.classList.toggle('open')
		// }
	}
}
</script>

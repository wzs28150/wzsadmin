<style rel="stylesheet/scss" lang="scss">
.nav-link {
    cursor: pointer;
}

.sidebar .sidebar-nav {
    overflow: hidden;
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import '/static/css/vue2-scrollbar.css';
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
    text-align: center;
    border-radius: 3px;
    margin: 15px auto;
    line-height: 0;
    font-size: 0;
    position: relative;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-text {
    transition: opacity 0.4s, transform 0.4s;
}
.logo_r {
    transition: all 0.4s, transform 0.4s;
    width: 60%;
    position: relative;
    left: -10px;
}
.layout-hide-text {
    .layout-menu-left {
        z-index: 99999999;
        position: relative;
        overflow: visible;
    }

    .layout-text {
        opacity: 0;
        font-size: 0;
        transition: opacity 0.4s, transform 0.4s;
    }
    .logo_r {
        opacity: 0;
        width: 0;
        transition: all 0.4s, transform 0.4s;
    }
    .ivu-icon-ios-arrow-down {
        display: none;
    }
    .ivu-menu-submenu {
        position: relative;
        .ivu-menu {
            position: absolute;
            left: 100%;
            top: 0;
            background-color: #464c5b;
            .ivu-menu-item {
                width: 8em;
                padding-left: 24px;
            }
        }
        &.ivu-menu-opened {
            .ivu-menu-submenu-title {
                background-color: #fff;
                color: #464c5b;
            }

        }

    }

}
.layout-header {
    .ivu-btn-text {
        margin-top: 6px;
    }
}
.layout-menu-left.ivu-col.ivu-col-span-1 li {
    text-align: center;
}

.layout-menu-left.ivu-col.ivu-col-span-1 li i {
    margin-right: 0;
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
	<!-- <Menu active-name="1" theme="dark" width="auto">
		<div class="layout-logo-left">
			<img class="logo_l" src="/static/img/logo_l.png" />
			<img class="logo_r" src="/static/img/logo_r.png" />
		</div>
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
	</Menu> -->
	<Menu active-name="1-2" theme="dark" width="auto" :accordion="true" :open-names="['1']">
		<div class="layout-logo-left">
			<img class="logo_l" src="/static/img/logo_l.png" />
			<img class="logo_r" src="/static/img/logo_r.png" />
		</div>
		<Submenu name="1">
			<template slot="title">
        <Icon type="ios-navigate" :size="iconSize"></Icon>
        <span class="layout-text">导航一</span>
      </template>
			<Menu-item name="1-1">选项 1</Menu-item>
			<Menu-item name="1-2">选项 2</Menu-item>
			<Menu-item name="1-3">选项 3</Menu-item>
		</Submenu>
		<Submenu name="2">
			<template slot="title">
        <Icon type="ios-keypad" :size="iconSize"></Icon>
        <span class="layout-text">导航二</span>
      </template>
			<Menu-item name="2-1">选项 1</Menu-item>
			<Menu-item name="2-2">选项 2</Menu-item>
		</Submenu>
		<Submenu name="3">
			<template slot="title">
        <Icon type="ios-analytics" :size="iconSize"></Icon>
        <span class="layout-text">导航三</span>
      </template>
			<Menu-item name="3-1">选项 1</Menu-item>
			<Menu-item name="3-2">选项 2</Menu-item>
		</Submenu>
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

<style rel="stylesheet/scss" lang="scss">

.nav-link {
    cursor: pointer;
}

.sidebar .sidebar-nav {
    overflow: hidden;
}

</style> <style rel="stylesheet/scss" lang="scss"> @import '/static/css/vue2-scrollbar.css';
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
                padding-left: 24px!important;
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
    <Menu active-name="1" theme="dark" width="auto" :accordion="true" :open-names="['1']" @on-select="onSelect">
        <div class="layout-logo-left">
            <img class="logo_l" src="static/img/logo_l.png" />
            <img class="logo_r" src="static/img/logo_r.png" />
        </div>
        <template v-for="(item,index) in siderbar_routers.children">
            <Submenu :name="index" v-if="!item.hidden&&item.children&&item.children.length>0" ref="submenu">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.name}}</span>
                </template>
                <template v-for="child in item.children" v-if='!child.hidden'>
                    <Menu-item :name="item.path+'/'+child.path">{{ child.name}}</Menu-item>
                </template>
            </Submenu>
            <Menu-item :name="item.path" v-if="!item.hidden&&!item.children">
                <Icon :type="item.icon" :size="iconSize"></Icon>
                <span class="layout-text">{{ item.name}}</span>
            </Menu-item>
        </template>
        <!-- <sidebar-item :routes='siderbar_routers.children' :size="iconSize"></sidebar-item> -->
    </Menu>
</i-col>

</template>

<script>

import VueScrollbar from 'vue2-scrollbar';
// import SidebarItem from './SidebarItem';
import Sidebar from './Sidebar'
import {
    mapGetters
}
from 'vuex';
export default {
    name: 'sidebar',
    components: {
        VueScrollbar,
        // SidebarItem
    },
    props: ['spanLeft', 'spanRight', 'routes'],
    computed: {
        ...mapGetters([
                'siderbar_routers'
            ]),
            iconSize() {
                if (this.spanLeft != 3) {
                    this.closeSub()
                }
                return this.spanLeft === 3 ? 14 : 24;
            }
    },

    methods: {
        onSelect(name) {
                this.$router.push(name);
                this.closeSub()
            },
            closeSub() {
                if (this.$refs.submenu) {
                    for (var i = 0; i < this.$refs.submenu.length; i++) {
                        this.$refs.submenu[i].opened = false
                    }
                }

            }
    },
    mounted() {
        console.log(this.spanLeft)
    }
}

</script>

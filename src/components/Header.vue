<style rel="stylesheet/scss" lang="scss" scoped>

.app-header.navbar {
    background-color: #353f4f;
    a {
        color: #fff;
    }
    .ivu-select-dropdown {
        a {
            color: #495060;
        }
    }
    .img-avatar {
        width: 40px;
        height: 40px;
        border-radius: 40em;
        margin: 0 10px;
    }
}

.dropdown-itemp {
    text-align: left;
    padding: 5px 0;
}

.header-item .ivu-dropdown-item {
    // padding: 15px;
}

.header-item {
    width: 130px;
    /*background-color: #20a8d8;*/
    /*background-color: white;*/
    height: 55px;
}

.header-item a {
    color: white !important;
}
.layout-header{ position: relative; z-index: 999;}
.layout-header a {
    color: #495060;
    font-size: 14px;
}

.app-header.navbar {
    border: 0;
    .navbar-brand {
        border: 0;
    }
}

.layout-header .ivu-avatar {
    margin: 14px 0;
}

</style>

<template>

<div class="layout-nav">
    <Dropdown class="nav-item" trigger="click" style="float:right; width:109px; text-align:center;">
        <a href="javascript:void(0)">
            <span slot="button">
								<Avatar style="background-color: #87d068;margin-right:10px; " icon="person" />
								<span class="d-md-down-none">admin</span>
            </span>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item>
                <p class="dropdown-itemp">
                    <Icon type="alert"></Icon>Updates<span class="badge badge-info">42</span>
                </p>
            </Dropdown-item>
            <Dropdown-item>
                <p class="dropdown-itemp">
                    <Icon type="chatbox-working"></Icon>Messages<span class="badge badge-success">42</span>
                </p>
            </Dropdown-item>
            <Dropdown-item>
                <p class="dropdown-itemp">
                    <Icon type="chatbox-working"></Icon>Messages<span class="badge badge-danger">42</span>
                </p>
            </Dropdown-item>
            <Dropdown-item divided>
                <p class="dropdown-itemp">
                    <Icon type="android-contact"></Icon> Profile
                </p>
            </Dropdown-item>
            <Dropdown-item>
                <p class="dropdown-itemp">
                    <Icon type="android-settings"></Icon> Settings
                </p>
            </Dropdown-item>
            <Dropdown-item>
                <a href="" @click="Logout">
                    <p class="dropdown-itemp">
                        <Icon type="power"></Icon>Logout
                    </p>
                </a>
            </Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
</div>

</template>

<script>

import navbar from './Navbar'

export default {
    name: 'header',
    components: {
        navbar,

    },
    methods: {
        Logout(e) {
                e.preventDefault();
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({
                        path: '/login'
                    });
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            click() {
                // do nothing
            },
            sidebarToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-hidden')
            },
            sidebarMinimize(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-minimized')
            },
            mobileSidebarToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-mobile-show')
            },
            asideToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('aside-menu-hidden')
            }
    }
}

</script>

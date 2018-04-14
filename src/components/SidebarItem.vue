<style rel="stylesheet/scss" lang="scss" scoped>

.wscn-icon {
    margin-right: 10px;
}

.hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
}
.layout-menu-left a{color: rgba(255,255,255,.7); display: block; position: relative;}
</style>

<template>

<div>
    <template v-for="item in routes">
        <router-link tag="li" class="nav-item nav-dropdown" v-if="!item.hidden&&item.children&&item.children.length>0" :to="item.path+''+item.children[0].path" disabled>
            <Submenu name="1">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.name}} </span>
                </template>
                <Menu-item name="1-1" v-for="child in item.children" v-if='!child.hidden' >
                    <router-link :to="item.path+'/'+child.path+'/'+child.children[0].path" class="nav-link" v-if="!child.hidden&&child.children" tag="li">
                        {{ child.name}}
                    </router-link>
                    <router-link :to="item.path+'/'+child.path" class="nav-link" v-else="!child.children" tag="li">
                        {{ child.name}}
                    </router-link>
                </Menu-item>
            </Submenu>
        </router-link>

        <Submenu name="1" v-if="!item.hidden&&!item.children">
            <template slot="title">
                <router-link :to="item.path" class="nav-link" exact>
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.name}} </span>
                </router-link>
            </template>
        </Submenu>

    </template>
</div>

</template>

<script>

export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        },
        iconSize: {
            type: String
        }
    },
    methods: {
        handleClick(e) {
                e.preventDefault()
                e.target.parentElement.classList.toggle('open')
            },
            addActive(e) {
                e.preventDefault()
                e.target.parentElement.parentElement.parentElement.classList.add('open')
            }
    },
    mounted() {
        console.log(this.routes)
    }
}

</script>

<template>
	<el-container class="main el-row">
		<el-aside  :class="[el-col, el-col-4 , isCollapse ? 'is-hidden' : 'is-show' ]" >
				<leftMenu :menuData="menuData" :menu="menu" :isCollapse="isCollapse" ref="leftMenu"></leftMenu>
		</el-aside>
		<el-container class="el-col el-col-20 con-right" :class="[isCollapse ? 'is-hidden' : 'is-show' ]">
			<el-header style="text-align: right; font-size: 12px">
				<el-button type="primary" icon="fa fa-bars" size="20" :class="[isCollapse ? 'vertical' : 'horizontal' ]" class="toggle-btn"  @click="toggleCollapse"></el-button>
				<el-menu
				  class="el-menu-demo"
				  mode="horizontal"
				  background-color="#29a3fe"
				  text-color="#fff"
				  active-text-color="#fff"  >
				  <el-menu-item index="1"  @click="switchTopMenu(menu)" v-for="(menu,index) in topMenu" :class="{'top-active': menu.selected}">{{menu.title}}</el-menu-item>
				</el-menu>
		 		<el-col :span="4" class="pos-rel">
			 		<el-dropdown @command="handleMenu" class="user-menu">
						 <span class="el-dropdown-link c-white" style="cursor: default">
							 {{username}}&nbsp;&nbsp;
							 <img src="../assets/images/photo.jpg" v-if="photo"class="photo">
							 <i class="fa fa-user-circle" aria-hidden="true" v-else ></i>
						 </span>
				 	 	<el-dropdown-menu slot="dropdown">
						 <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
						 <el-dropdown-item command="logout">退出</el-dropdown-item>
				 		</el-dropdown-menu>
			 		</el-dropdown>
				</el-col>
			</el-header>
			<el-scrollbar class="menu-scrollbar">
			 <el-main>
				  <div style="height:60px"></div>
			 		<transition name="fade" mode="out-in" appear>
						<router-view v-loading="showLoading"></router-view>
					</transition>
			 </el-main>
			</el-scrollbar>
		</el-container>
	</el-container>
</template>
<script>
  import leftMenu from './Common/leftMenu.vue'
  import changePwd from './Account/changePwd.vue'
  import http from '../assets/js/http'

  export default {
    data() {
      return {
        username: '',
        topMenu: [],
        childMenu: [],
        menuData: [],
        hasChildMenu: false,
        menu: null,
        module: null,
        img: '',
        title: '',
        logo_type: null,
        isCollapse: false
      }
    },
    methods: {
      logout() {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          _g.openGlobalLoading()
          let data = {
            authkey: Lockr.get('authKey'),
            sessionId: Lockr.get('sessionId')
          }
          this.apiPost('admin/base/logout', data).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              Lockr.rm('menus')
              Lockr.rm('authKey')
              Lockr.rm('rememberKey')
              Lockr.rm('authList')
              Lockr.rm('userInfo')
              Lockr.rm('sessionId')
              Cookies.remove('rememberPwd')
              _g.toastMsg('success', '退出成功')
              setTimeout(() => {
                router.replace('/')
              }, 1500)
            })
          })
        }).catch(() => {

        })
      },
      switchTopMenu(item) {
        item.selected = true
        if (!item.child) {
          router.push(item.url)
        } else {
          if (item.child[0].child) {
            router.push(item.child[0].child[0].url)
          } else {
            router.push(item.child[0].url)
          }
        }
      },
      handleMenu(val) {
        switch (val) {
          case 'logout':
            this.logout()
            break
          case 'changePwd':
            this.changePwd()
            break
        }
      },
      changePwd() {
        this.$refs.changePwd.open()
      },
      getTitleAndLogo() {
        this.apiPost('admin/base/getConfigs').then((res) => {
          this.handelResponse(res, (data) => {
            document.title = data.SYSTEM_NAME
            this.logo_type = data.LOGO_TYPE
            this.title = data.SYSTEM_NAME
            this.img = window.HOST + data.SYSTEM_LOGO
          })
        })
      },
      getUsername() {
        this.username = Lockr.get('userInfo').username
      },
      handleSelect (key, keyPath) {},
      toggleCollapse(e) {
        (this.isCollapse == false) ? this.isCollapse = true : this.isCollapse = false
      }
    },
    created() {
      this.getTitleAndLogo()
      let authKey = Lockr.get('authKey')
      let sessionId = Lockr.get('sessionId')
      if (!authKey || !sessionId) {
        _g.toastMsg('warning', '您尚未登录')
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }
      this.getUsername()
      let menus = Lockr.get('menus')
      this.menu = this.$route.meta.menu
      this.module = this.$route.meta.module
      this.topMenu = menus
      // console.log(this.topMenu)
      _(menus).forEach((res) => {
        // console.log(this.$route)
        if (res.module == this.module) {
          this.menuData = res.child
          res.selected = true
        } else {
          res.selected = false
        }
      })
    },
    computed: {
      routerShow() {
        return store.state.routerShow
      },
      showLeftMenu() {
        this.hasChildMenu = store.state.showLeftMenu
        return store.state.showLeftMenu
      }
    },
    components: {
      leftMenu,
      changePwd
    },
    watch: {
      '$route' (to, from) {
        _(this.topMenu).forEach((res) => {
          if (res.module == to.meta.module) {
            res.selected = true
            if (!to.meta.hideLeft) {
              this.menu = to.meta.menu
              this.menuData = res.child
            }
          } else {
            res.selected = false
          }
        })
      }
    },
    mixins: [http]
  }
</script>
<style scoped>
	.main{
		height: 100%; margin: 0; padding: 0;
	}
	.el-header {
    background-color: #29a3fe;;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
		height: 100%;
		background-color: #23262E;
		position: relative;
		transition:width .4s,transform .4s;
  }
	.el-aside.is-show{ width: 200px!important; }
	.el-aside.is-hidden{ width: 64px!important; }
	.el-main{ overflow: hidden;}
	.con-right{ position: relative;transform:translate(0,0); transition:transform .4s; }
	.menu-scrollbar{ height: 100%; position: absolute; width: 100%;}
	.el-header{ position: fixed; width: 100%; right: 0; top: 0; z-index: 999;}
	.top-active{float: left;}
	.pos-rel{ float: right;}
	.toggle-btn{float: left; margin: 10px 0 10px -10px; padding: 9px 10px; font-size: 20px;	}
	.toggle-btn:hover,.toggle-btn:focus{ background: #409EFF; border-color: #409EFF;}
	.toggle-btn.vertical{ transform: rotate(90deg);}
	.user-menu{ right: 0px; }
	.photo{  width: 30px;height: 30px; vertical-align: middle; text-align: center; line-height: 28px; box-shadow: 0 0 5px #999; border-radius: 100%; overflow: hidden;}
	.fa-user{ width: 28px;height: 28px; vertical-align: middle; text-align: center; line-height: 28px;box-shadow: 0 0 5px #ccc; border-radius: 100%;}
	.fa-user-circle{ font-size: 30px; vertical-align: middle;}
	.el-menu-demo{float: left;}
</style>
<style>
	.el-scrollbar__wrap{ overflow-y: scroll; overflow-x: hidden;}
</style>
<style scoped>
	@media screen and (max-width: 768px) {
		.el-aside.is-show{ width: 200px!important; }
		.el-aside.is-hidden{ width: 0px!important; }
		.toggle-btn.vertical{ transform: rotate(0deg);}
		.el-aside{ position: fixed;  z-index: 9999;}
		.con-right.is-show{ transform: translateX(200px); transition:transform .4s;}
	}
</style>

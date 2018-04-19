<template>
	<el-container class="main el-row">
		<el-aside class="el-col el-col-4" style="width: 200px;">
				<leftMenu :menuData="menuData" :menu="menu" ref="leftMenu"></leftMenu>
		</el-aside>
		<el-container class="el-col el-col-20 con-right">
			<el-header style="text-align: right; font-size: 12px">
				 <el-dropdown>
					 <i class="el-icon-setting" style="margin-right: 15px"></i>
					 <el-dropdown-menu slot="dropdown">
						 <el-dropdown-item>查看</el-dropdown-item>
						 <el-dropdown-item>新增</el-dropdown-item>
						 <el-dropdown-item>删除</el-dropdown-item>
					 </el-dropdown-menu>
				 </el-dropdown>
				 <span>王小虎</span>
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
        logo_type: null
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
        if (!item.child) {
          router.push(item.url)
        } else {
          router.push(item.child[0].child[0].url)
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
      _(menus).forEach((res) => {
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
  }
	.el-main{ overflow: hidden;}
	.con-right{ position: relative;transform:translate(0,0);  }
	.menu-scrollbar{ height: 100%; position: absolute; width: 100%;}
	.el-header{ position: fixed; width: 100%; right: 0; top: 0; z-index: 999;}
</style>
<style>
	.el-scrollbar__wrap{ overflow-y: scroll; overflow-x: hidden;}
</style>

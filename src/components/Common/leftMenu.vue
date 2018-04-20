<template>
	<div style="height:100%;">
		<div class="logo">
			<img src="../../assets/images/logo_l.png" class="logo-l" alt="">
			<img src="../../assets/images/logo_r.png" class="logo-r" alt="">
		</div>
		<el-scrollbar class="menu-scrollbar">
		<el-menu :default-active="this.$route.path" class="el-menu-vertical-aside"  background-color="#23262E" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse" >
			<div style="height:56px"></div>
			<template  >
				<el-submenu :index="secMenu.title" v-for="(secMenu, index) in menuData" :key="index" >
	 			 <template slot="title">
	 				 <i class="el-icon-location"></i>
	 				 <span>{{secMenu.title}}</span>
	 			 </template>
				 <template >
  	 			 	<el-menu-item :index="item.url" v-for="(item, inde) in secMenu.child"  @click="routerChange(item)" :key="inde" >{{item.title}}</el-menu-item>
				 </template>
  	 		</el-submenu>
			</template>
	  </el-menu>
		</el-scrollbar>
		<!-- <div v-for="secMenu in menuData">
			<div class="c-light-gray p-l-10 m-t-15">{{secMenu.title}}</div>
			<div class="h-50" v-for="item in secMenu.child">
				<template v-if="item.menu == menu">
					<div class="w-100p h-50 p-l-40 left-menu pointer c-blue" @click="routerChange(item)">{{item.title}}</div>
				</template>
				<template v-else>
					<div class="w-100p h-50 p-l-40 left-menu pointer c-gra" @click="routerChange(item)">
						{{item.title}}
					</div>
				</template>
			</div>
		</div> -->
	</div>
</template>

<script>
export default {
  props: ['menuData', 'menu', 'isCollapse'],
  data() {
    return {

    }
  },
  methods: {
    routerChange(item) 	{
      // 与当前页面路由相等则刷新页面
      console.log(this.$route)
      if (item.url != this.$route.path) {
        router.push(item.url)
      } else {
        _g.shallowRefresh(this.$route.name)
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
	.el-menu{ border-right: 0; }
	.el-menu-vertical-aside{ height: 100%; }
	.menu-scrollbar{ height: 100%; overflow: hidden;}
	.logo{ overflow: hidden; position: fixed; padding: 15px 20px; left: 0; top: 0; z-index: 1; width: 160px; background-color: #23262E; }
	.logo-l{ height: 26px; display: block;}
	.logo-r{ height: 26px; display: block; position: absolute; right: 20px; top: 15px;}
	.el-aside.is-hidden .logo{ width: 54px; padding: 15px 5px; }
	.el-aside.is-hidden .logo .logo-r{ display: none; }
	.el-aside.is-hidden .logo .logo-l{ margin: 0 auto;}
	.el-menu--collapse>.el-menu-item span, .el-menu--collapse>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: none; opacity: 0;
		transition:all .4s,transform .4s;
	}
	.el-aside.is-hidden .el-menu-vertical-aside>.el-menu-item span,.el-aside.is-hidden .el-menu-vertical-aside>.el-submenu>.el-submenu__title span{ display: none; }
</style>
<style>
	.el-aside .el-menu .el-menu--inline li{ background-color: rgb(67,74,80)!important; padding-left: 53px!important; }
	.el-aside.is-hidden .el-menu-vertical-aside>.el-submenu>ul{ display: none; }
</style>

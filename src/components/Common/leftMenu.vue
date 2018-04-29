<template>
	<div style="height:100%;">
		<div class="logo">
			<img src="../../assets/images/logo_l.png" class="logo-l" alt="">
			<img src="../../assets/images/logo_r.png" class="logo-r" alt="">
		</div>
		<el-scrollbar class="menu-scrollbar">
		<el-menu :default-active="this.$route.path" class="el-menu-vertical-aside"  background-color="#23262E" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"  :collapse="isCollapse" >
			<div style="height:56px"></div>
			<template  >
				<div v-for="(secMenu, index) in menuData" :key="index">
					<div v-if="secMenu.menu_type ===  1">
						<el-submenu :index="secMenu.title"  >
			 			 <template slot="title">
								<i class="fa" :class="[secMenu.icon]" v-if="secMenu.icon"></i>
								<i class="el-icon-location" v-else></i>
			 				 	<span>{{secMenu.title}}</span>
			 			 </template>
						 <template >
		  	 			 	<el-menu-item :index="item.url" v-for="(item, inde) in secMenu.child"  @click="routerChange(item)" :key="inde" >{{item.title}}</el-menu-item>
						 </template>
		  	 		</el-submenu>
					</div>
					<div v-else-if="secMenu.menu_type ===  2">
						<el-menu-item :index="secMenu.title" @click="routerChange(secMenu)">
							<i class="fa" :class="[secMenu.icon]" v-if="secMenu.icon"></i>
							<i class="el-icon-location" v-else></i>
			        <span slot="title">{{secMenu.title}}</span>
			      </el-menu-item>
					</div>
				</div>
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
      // console.log(this.menuData)
      if (item.url != this.$route.path) {
        router.push(item.url)
      } else {
        _g.shallowRefresh(this.$route.name)
      }
    }
  }
}
</script>

<style scoped>
	.el-menu{ border-right: 0; }
	.el-menu-vertical-aside{ height: 100%; transition:width .4s,transform .4s; }
	.menu-scrollbar{ height: 100%; overflow: hidden;}
	.logo{ overflow: hidden; position: fixed; padding: 15px 20px; left: 0; top: 0; z-index: 1; width: 160px; background-color: #23262E; transition:width .4s,padding .4s,transform .4s; overflow: hidden;}
	.logo-l{ height: 26px; display: block; transition:all .4s,transform .4s; position: relative; z-index: 1; }
	.logo-r{ height: 26px; display: block; position: absolute; right: 20px; top: 15px; transition:transform .4s; opacity: 1; }
	.el-aside.is-hidden .logo{ width: 54px; padding: 15px 5px; transition:width .4s,padding .4s,transform .4s; }
	.el-aside.is-hidden .logo .logo-l{ margin: 0 auto; transition:all .4s,transform .4s; }
	.el-aside.is-hidden .logo .logo-r{ visibility: hidden; transform: scale(0.01); opacity: 0; z-index: -1;}
	.el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu>.el-submenu__title span { height: 0;
    width: 0; overflow: hidden; visibility: hidden; display: none; opacity: 0; transition:all .4s,transform .4s; }
	.el-aside.is-hidden .el-menu-vertical-aside .el-menu-item span,.el-aside.is-hidden .el-menu-vertical-aside .el-submenu>.el-submenu__title span{ display: none; }


</style>
<style>
	.el-aside .el-menu .el-menu--inline li{ background-color: rgb(67,74,80)!important; padding-left: 53px!important; }
	.el-aside.is-hidden .el-menu-vertical-aside>.el-submenu>ul{ display: none; }
</style>
<style scoped>
	@media screen and (max-width: 768px) {
		.el-aside.is-hidden .logo{ width: 0; padding: 15px 0; }
	}
</style>

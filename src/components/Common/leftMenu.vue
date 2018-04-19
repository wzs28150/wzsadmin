<template>
	<div style="height:100%;">
		<div class="logo">
			<img src="../../assets/images/logo_l.png" class="logo-l" alt="">
			<img src="../../assets/images/logo_r.png" class="logo-r" alt="">
		</div>
		<el-menu default-active="2" class="el-menu-vertical-aside" @open="handleOpen" @close="handleClose" background-color="#23262E" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" >
			<el-scrollbar class="menu-scrollbar">
			<div style="height:56px"></div>
			<template v-for="secMenu in menuData"  >
				<el-submenu :index="secMenu.id">
	 			 <template slot="title">
	 				 <i class="el-icon-location"></i>
	 				 <span>{{secMenu.title}}</span>
	 			 </template>
	 			 <el-menu-item :index="item.id"  v-for="(item, ind) in secMenu.child" @click="routerChange(item)">{{item.title}}</el-menu-item>
	 		  </el-submenu>
			</template>
			</el-scrollbar>
	 </el-menu>
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
  props: ['menuData', 'menu'],
  data() {
    return {
    }
  },
  methods: {
    routerChange(item) 	{
      // 与当前页面路由相等则刷新页面
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
	.el-menu-vertical-aside{ height: 100%; }
	.menu-scrollbar{ height: 100%; overflow: hidden;}
	.logo{ overflow: hidden; position: fixed; padding: 15px 20px; left: 0; top: 0; z-index: 1; width: 160px; background-color: #23262E; }
	.logo-l{ height: 26px; display: block;}
	.logo-r{ height: 26px; display: block; position: absolute; right: 20px; top: 15px;}
</style>
<style>
	.el-aside .el-menu .el-menu--inline li{ background-color: rgb(67,74,80)!important; padding-left: 53px!important; }
</style>

<template>
<!-- <div>
<el-menu mode="vertical" default-active="/table" class="el-menu-vertical-demo" @select="handleselect" theme="dark" router>
<el-menu-item-group v-for="menu in menuData" :title="menu.title">
<el-menu-item v-for="item in menu.items" :index="item.path">&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}</el-menu-item>
</el-menu-item-group>
</el-menu>
</div> -->

	<div>
		<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" >
		<template v-for="(secMenu, index) in menuData">
			<el-submenu :index="index" >
 			 <template slot="title">
 				 <i class="el-icon-location"></i>
 				 <span>{{secMenu.title}}</span>
 			 </template>
 			 <el-menu-item :index="index-ind" v-for="(item, ind) in secMenu.child" @click="routerChange(item)">{{item.title}}</el-menu-item>
 		  </el-submenu>
		</template>
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

</style>
<style>
	.el-aside .el-menu .el-menu--inline li{ background-color: rgb(67,74,80)!important; }
</style>

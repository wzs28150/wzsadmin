<style scoped>
.layout {
	border: 1px solid #d7dde4;
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
	height: 100%;
}

.layout-breadcrumb {
	padding: 10px 15px 0;
}

.layout-content {
	min-height: 200px;
	margin: 15px;
	overflow: hidden;
	background: #fff;
	border-radius: 4px;
}

.ivu-btn {
	box-shadow: none!important;
}

.layout-content-main {
	padding: 10px;
}

.layout-copy {
	text-align: center;
	padding: 10px 0 20px;
	color: #9ea7b4;
	position: fixed;
	bottom: 0;
	width: 100%;
}

.ivu-row-flex {
	height: 100%
}

.layout-menu-left {
	background: #464c5b;
	overflow: hidden;
}

.layout-header {
	height: 60px;
	background: #fff;
	box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
	width: 90%;
	height: 30px;
	background: #5b6270;
	border-radius: 3px;
	margin: 15px auto;
}

.layout-ceiling-main a {
	color: #9ba7b5;
}

.layout-hide-text .layout-text {
	display: none;
}

.ivu-col {
	transition: all 0.4s, transform 0.4s
}

.ivu-col-span-2 {
	/* width: auto; */
}

.layout-menu-left.ivu-col.ivu-col-span-1 li {
	text-align: center;
}
</style>

<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 3}">
	<Row type="flex">
		<Sidebar ref="Sidebar" :spanLeft="spanLeft" :spanRight="spanRight" />
		<i-col :span="spanRight">
			<div class="layout-header">
				<i-button type="text" @click="toggleClick">
					<Icon type="navicon" size="32"></Icon>
				</i-button>
			</div>
			<div class="layout-breadcrumb">
				<Breadcrumb>
					<Breadcrumb-item href="#">首页</Breadcrumb-item>
					<Breadcrumb-item href="#">应用中心</Breadcrumb-item>
					<Breadcrumb-item>某应用</Breadcrumb-item>
				</Breadcrumb>
			</div>
			<div class="layout-content">
				<div class="layout-content-main">内容区域</div>
			</div>
			<div class="layout-copy">
				2011-2016 &copy; TalkingData
			</div>
		</i-col>
	</Row>
</div>
</div>
</template>

<script>
// import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
// import AppAside from '../components/Aside'
// import AppFooter from '../components/Footer'
// import Breadcrumb from '../components/Breadcrumb'
// require("../../static/css/vue2-scrollbar.css");
// require("../../static/css/app.css");
export default {
	name: 'full',
	components: {
		// AppHeader,
		Sidebar,
		// AppAside,
		// AppFooter,
		// Breadcrumb,
	},
	data() {
		return {
			spanLeft: 3,
			spanRight: 21
		}
	},
	computed: {
		name() {
			this.$refs.Scrollbar.scrollToY(0);
			return this.$route.name
		},
		list() {
			return this.$route.matched
		}
	},
	methods: {
		toggleClick() {
			if (this.spanLeft === 3) {
				this.spanLeft = 1;
				this.spanRight = 23;
			} else {
				this.spanLeft = 3;
				this.spanRight = 21;
			}
		}
	}
}
</script>

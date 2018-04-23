<template>
	<div>
		<div class="m-b-20">
  		<router-link class="btn-link-large add-btn" to="add">
  		  <i class="el-icon-plus"></i>&nbsp;&nbsp;添加菜单
  		</router-link>
		</div>
		<el-tree
      :data="tableData"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
					<el-switch
						v-model="data.status">
					</el-switch>
					<router-link :to="{ name: 'menuEdit', params: { id: data.id }}" class="btn-link edit-btn">
						编辑
					</router-link>
					<el-button
						size="small"
						type="danger"
						@click="confirmDelete(data)">
						删除
						</el-button>
        </span>
      </span>
    </el-tree>
		<div class="pos-rel p-t-20">
			<btnGroup :selectedData="multipleSelection" :type="'menus'"></btnGroup>
		</div>
	</div>
</template>

<script>
  import btnGroup from '../../../Common/btn-group.vue'
  import http from '../../../../assets/js/http'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      selectItem(val) {
        this.multipleSelection = val
      },
      confirmDelete(item) {
        this.$confirm('确认删除该菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiDelete('admin/menus/', item.id).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '删除成功')
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name)
              }, 1500)
            })
          })
        }).catch(() => {
          // handel error
        })
      },
      handleClick(val) {
        console.log(val)
      }
    },
    created() {
      this.apiGet('admin/menus').then((res) => {
        this.handelResponse(res, (data) => {
          this.tableData = data
        })
      })
    },
    computed: {
      addShow() {
        return _g.getHasRule('menus-save')
      },
      editShow() {
        return _g.getHasRule('menus-update')
      },
      deleteShow() {
        return _g.getHasRule('menus-delete')
      }
    },
    components: {
      btnGroup
    },
    mixins: [http]
  }
</script>
<style scoped>
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 8px;
}

</style>
<style media="screen">
.el-tree-node__content {
	height: 40px;
}
</style>

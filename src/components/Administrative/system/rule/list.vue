<template>
	<div>
		<div class="m-b-20">
  		<router-link class="btn-link-large add-btn" to="add">
  		  <i class="el-icon-plus"></i>&nbsp;&nbsp;添加节点
  		</router-link>
		</div>
		<el-tree
      :data="tableData"
      show-checkbox
      node-key="id"
			ref="tree"
      default-expand-all
			highlight-current
      :expand-on-click-node="false"
			@check="selectItem">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="data.class ? isclass : ''">{{ node.label }}</span>
        <span>
					<el-switch
						v-model="data.status"  @change="changeAttrInBtn(data.id,data.status)"> ref="switch"
					</el-switch>
					<router-link :to="{ name: 'ruleEdit', params: { id: data.id }}" class="btn-link edit-btn">
						编辑
					</router-link>
					<el-button
						size="small"
						type="danger" :class="data.class ? isclass : ''"
						@click="confirmDelete(data)">
						删除
						</el-button>
        </span>
      </span>
    </el-tree>
		<div class="pos-rel p-t-20">
			<btnGroup :selectedData="multipleSelection" :type="'rules'"></btnGroup>
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
        this.multipleSelection = this.$refs.tree.getCheckedNodes()
      },
      confirmDelete(item) {
        this.$confirm('确认删除该权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiDelete('admin/rules/', item.id).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '删除成功')
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name)
              }, 1500)
            })
          })
        }).catch(() => {
        // handle error
        })
      }
    },
    created() {
      this.apiGet('admin/rules/?type=tree').then((res) => {
        this.handelResponse(res, (data) => {
          this.tableData = data
        })
      })
    },
    computed: {
      addShow() {
        return _g.getHasRule('rules-save')
      },
      editShow() {
        return _g.getHasRule('rules-update')
      },
      deleteShow() {
        return _g.getHasRule('rules-delete')
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
.el-switch{ margin-right: 25px; }
.caozuo{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    height: 20px; width: 125px;
    vertical-align: middle;
}
.zhuangtai{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    vertical-align: middle;
		margin-right: 25px;
}
</style>

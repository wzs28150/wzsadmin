<template>
	<el-dialog ref="dialog" title="节点列表" custom-class="w-900 h-480 ovf-auto" :visible.sync="dialogTableVisible" :modal-append-to-body="false" :lock-scroll="false">
		<el-scrollbar class="menu-scrollbar">
		<div class="pos-rel h-60">
			<el-input placeholder="请输入内容" v-model="keyword" class="search-btn w-300">
				<el-button slot="append" icon="el-icon-search" @click="searchMsg()"></el-button>
			</el-input>
		</div>
		<div>
			<el-table
			:data="tableData"
			stripe
			style="width: 100%">
				<el-table-column
				prop="title"
				label="规则名称">
				</el-table-column>
				<el-table-column
				prop="name"
				label="规则标识"
				width="180">
				</el-table-column>
				<el-table-column
				label="操作"
				width="100">
				<div slot-scope="scope">
					<el-button size="small" type="danger" @click="selectRule(scope.row)">选择</el-button>
				</div>
				</el-table-column>
			</el-table>
		</div>
		</el-scrollbar>
</el-dialog>

</template>
<style>
.search-btn {
	position: absolute;
	top: 0px;
	right: 0px;
}
</style>
<script>
  import http from '../../../../assets/js/http'

  export default {
    data() {
      return {
        keyword: '',
        tableData: [],
        dialogTableVisible: false
      }
    },
    methods: {
      open() {
        this.dialogTableVisible = true
        this.$refs.dialog.open()
      },
      closeDialog() {
        this.dialogTableVisible = false
        this.$refs.dialog.close()
      },
      selectRule(item) {
        setTimeout(() => {
          this.$parent.form.rule_name = item.title
          this.$parent.form.rule_id = item.id
        }, 0)
        this.closeDialog()
      },
      getRules() {
        this.apiGet('admin/rules').then((res) => {
          this.handelResponse(res, (data) => {
            this.tableDataShow = _(data).forEach((ret) => {
              ret.showInput = false
            })
            this.tableData = this.tableDataShow
          })
        })
      }
    },
    created() {
      let data = store.state.rules
      if (data && data.length) {
        this.tableDataShow = _(data).forEach((res) => {
          res.showInput = false
        })
        this.tableData = this.tableDataShow
      } else {
        this.getRules()
      }
    },
    mixins: [http]
  }
</script>

<template>
	<el-dialog ref="dialog" title="收货地址" :visible.sync="dialogTableVisible" :modal-append-to-body="true">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
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
        dialogTableVisible: false
      }
    },
    methods: {
      open() {
        this.dialogTableVisible = true
        this.$refs.dialog.open()
      },
      closeDialog() {
        this.$refs.dialog.close()
      }
    }
  }
</script>

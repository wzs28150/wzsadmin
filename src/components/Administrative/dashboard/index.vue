<template>
  <div class="">
    dashboard
  </div>
</template>
<script>
import http from '../../../assets/js/http'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    _g.closeGlobalLoading()
  },
  mixins: [http]
}
</script>
<style scoped>
</style>

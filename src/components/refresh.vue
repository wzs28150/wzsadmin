<template>
	<div></div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    if (this.$route.query.name) {
      router.replace({ name: this.$route.query.name })
    } else {
      console.log('refresh fail')
    }
  }
}
</script>

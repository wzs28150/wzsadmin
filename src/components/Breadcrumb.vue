<template>
  <div class="layout-breadcrumb">
      <Breadcrumb>
        <template v-for="(item, index) in list">
          <Breadcrumb-item :href="item.path" v-if="isLast(index)">{{ showName(item) }}</Breadcrumb-item>
          <span v-else-if="item.path!==''">
            <router-link to="#" class="ivu-breadcrumb-item-link">{{ showName(item) }}</router-link>
            <span class="ivu-breadcrumb-item-separator">/</span>
          </span>
          <span v-else-if="item.path===''">
            <router-link :to="{ path: '/' }" class="ivu-breadcrumb-item-link">{{ showName(item) }}</router-link>
            <span class="ivu-breadcrumb-item-separator">/</span>
          </span>
        </template>
      </Breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    separator: String
  },
  methods: {
    isLast (index) {

      return index === this.list.length - 1
    },
    showName (item) {
      console.log(this.list)
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>

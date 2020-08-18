<template>
  <div>
      {{id}}
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      id: this.$route.params.id
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>

</style>

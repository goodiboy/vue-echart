<template>
  <div class="com-page">
    <Trend></Trend>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Trend from '@/components/Trend.vue'

@Component({
  components: {
    Trend
  }
})
export default class TrendPage extends Vue {}
</script>

<style scoped lang="scss"></style>

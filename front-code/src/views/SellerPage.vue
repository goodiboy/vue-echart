<template>
  <div class="com-page">
    <Seller></Seller>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Seller from '@/components/Seller.vue'

@Component({
  components: {
    Seller
  }
})
export default class SellerPage extends Vue {}
</script>

<style scoped lang="scss"></style>

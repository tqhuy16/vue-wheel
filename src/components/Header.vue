<script setup></script>

<template>
  <div class="header">
    <div class="menu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>Spin & Win</div>
    <font-awesome-icon icon="volume-high" />
  </div>
</template>

<style scoped>
@media only screen and (max-width: 576px) {
  .header {
    color: white;
    display: flex;
    justify-content: space-between;
  }
  .menu {
    width: 20px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }
  .menu div {
    height: 2px;
    width: 100%;
    background-color: #ffffff;
  }
}
</style>

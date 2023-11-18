<script setup></script>

<template>
  <div class="header">
    <div class="menu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="game-title">Spin & Win</div>
    <div><img src="@/assets/sound.png" /></div>
  </div>
</template>

<style scoped>
.header {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.game-title {
  font-size: 28px;
  font-weight: 900;
}
@media only screen and (max-width: 375px) {
}
</style>

<script setup></script>

<template>
  <div class="background-modal">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.background-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgb(36, 55, 90, 0.62);
}
.modal {
  width: 355px;
  background-color: #24375a;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 27px;
}
@media only screen and (max-width: 375px) {
}
</style>

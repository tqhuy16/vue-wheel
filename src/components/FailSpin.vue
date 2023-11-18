<script setup>
import Modal from "@/components/Modal.vue";
</script>

<template>
  <Modal>
    <div class="content">
      <img src="@/assets/sad-face.png" class="fail-icon" />
      <div class="fail-title">Oh no</div>
      <div class="content-fail">
        <span class="try-again">Try again.....</span>
        <span>
          Try out our spin and win game to win one of our exciting prizes.</span
        >
      </div>
      <button class="btn-again">TRY AGAIN</button>
    </div>
  </Modal>
</template>

<style scoped>
.content {
  position: relative;
  color: #ffffff;
  padding: 54px 29px 44px;
  text-align: center;
}
.fail-icon {
  margin-bottom: 13px;
}
.fail-title {
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 13px;
}
.content-fail {
  font-size: 14px;
  margin-bottom: 18px;
}
.try-again {
  font-size: 16px;
  font-weight: 600;
}
.btn-again {
  padding: 10px 30px;
  border-radius: 15px;
  font-size: 15px;
  background-color: #ffc721;
  color: #24375a;
  font-weight: 600;
  border: none;
  cursor: pointer;
  height: 35px;
  width: 158px;
}
@media only screen and (max-width: 375px) {
}
</style>

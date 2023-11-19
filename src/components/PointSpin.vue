<script setup>
import Modal from "@/components/Modal.vue";

const props = defineProps(["spin-score"]);
</script>

<template>
  <Modal>
    <div class="content">
      <img src="@/assets/gif.png" class="gif" />
      <div class="congratulations">Congratulations</div>
      <div class="content-point">
        <span class="get-point">You have won {{ props.spinScore }} point </span>
        <span>
          Try out our spin and win game to win one of our exciting prizes.</span
        >
      </div>
      <button
        class="btn-again"
        :disabled="false"
        @click="$emit('nextTime', namePlayer)"
      >
        TRY AGAIN
      </button>
    </div>
  </Modal>
</template>

<style scoped>
.content {
  position: relative;
  color: #ffffff;
  padding: 91px 29px 44px;
  text-align: center;
}
.gif {
  transform: translateX(-50%);
  position: absolute;
  top: -165px;
  left: 50%;
}
.congratulations {
  font-size: 22px;
  font-weight: 900;
}
.content-point {
  font-size: 14px;
  margin-bottom: 27px;
}
.get-point {
  font-size: 16px;
  font-weight: 600;
}
.btn-again {
  padding: 10px 30px;
  border-radius: 15px;
  font-size: 15px;
  color: #24375a;
  font-weight: 600;
  border: none;
  height: 35px;
  width: 158px;
  background-color: #ffc721;
  cursor: pointer;
}
@media only screen and (max-width: 375px) {
}
</style>

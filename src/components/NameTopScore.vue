<script setup>
import { ref } from "vue";

import Modal from "@/components/Modal.vue";

const props = defineProps(["total-score"]);

const namePlayer = ref("");
</script>

<template>
  <Modal>
    <div class="content">
      <div>
        <div class="hight-point">{{ props.totalScore }} Points</div>
        <div class="top-score">You Are on Top Score</div>
        <input
          v-model="namePlayer"
          placeholder="Type Your Name..."
          class="new-top-score-name"
        />
      </div>

      <button class="name-score" @click="$emit('setNameTopScore', namePlayer)">
        DONE
      </button>
    </div>
  </Modal>
</template>

<style scoped>
.content {
  position: relative;
  color: #ffffff;
  padding: 50px 29px 44px;
  text-align: center;
}
.hight-point {
  font-size: 18px;
  font-weight: 600;
  color: #ffc721;
}
.top-score {
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 20px;
}
.new-top-score-name {
  height: 30px;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.name-score {
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

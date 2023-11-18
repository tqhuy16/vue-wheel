<script setup>
import { onMounted, ref, watch } from "vue";

import Header from "@/components/Header.vue";
import PointSpin from "@/components/PointSpin.vue";
import FailSpin from "@/components/FailSpin.vue";
import { setTopScore, getTopScore } from "@/utils/TopScoreStorage";

const isNewScore = ref(false);
const isFail = ref(false);
const yourScore = ref(0);
const timesSpin = ref(0);
const topScore = ref();
const segments = ref([
  { value: 0, color: "#C6479F" },
  { value: 100, color: "#C32605" },
  { value: 200, color: "#EF5716" },
  { value: 300, color: "#F5BE1D" },
  { value: 400, color: "#F0CB46" },
  { value: 500, color: "#A7C411" },
  { value: 600, color: "#36AAC7" },
  { value: 700, color: "#B492F0" },
  { value: 800, color: "#954CDC" },
  { value: 900, color: "#662DA2" },
]);
const handleSpin = () => {
  if (timesSpin.value < 3) {
    const score = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const random = Math.floor(Math.random() * score.length);
    yourScore.value += score[random];
  }
  timesSpin.value += 1;
};

watch(timesSpin, () => {
  const lastTopScore = topScore.value.pop();
  if (
    timesSpin.value === 3 &&
    (!lastTopScore?.score || yourScore.value > lastTopScore?.score)
  )
    isNewScore.value = true;

  if (
    timesSpin.value === 3 &&
    (lastTopScore?.score || yourScore.value < lastTopScore?.score)
  )
    isFail.value = true;
});

onMounted(() => {
  const topScoreStorage = getTopScore() || [];
  topScore.value = [...topScoreStorage];
  console.log("onMounted", topScoreStorage);
});
</script>

<template>
  <Header />
  <div class="guide">
    <span class="lucky">Feeling lucky?{{ yourScore }}</span>
    <span
      >Try out our spin and win game to win one of our exciting prizes.</span
    >
  </div>
  <div class="spin-app">
    <img src="@/assets/union.png" class="arrow" />
    <div class="container">
      <button class="spin" @click="handleSpin">Spin</button>
      <div
        v-for="(seg, index) in segments"
        :key="seg.color"
        :style="{
          transform: `rotate(${index * 36}deg)`,
          'background-color': seg.color,
        }"
      >
        {{ seg.value }}
      </div>
    </div>
  </div>
  <div class="top-score">
    <div v-if="topScore?.length > 0" class="title-score">Leader Board</div>
    <div
      v-for="(top, index) in topScore"
      :key="`${index - top.userName}`"
      class="item-score"
      :class="`${index === 0 ? 'first' : ''}`"
    >
      <div class="user-info">
        <div class="group-info">
          <span class="rank">{{ index + 1 }}.</span>
          <img class="avatar" src="https://picsum.photos/50/50" alt="avatar" />
          <span class="user-name">{{ top.userName }}</span>
        </div>
        <div>
          <span><img src="@/assets/small-star.png" /></span>
          <span><img src="@/assets/big-star.png" /></span>
          <span><img src="@/assets/small-star.png" /></span>
        </div>
      </div>
      <div class="score-info">{{ top.score }}</div>
    </div>
  </div>
  <PointSpin v-if="isNewScore" />
  <FailSpin v-if="isFail" />
</template>

<style scoped>
.guide {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}
.lucky {
  color: #24375a;
  font-size: 20px;
  font-weight: 600;
  margin-right: 5px;
}
.spin-app {
  display: flex;
  justify-content: center;
  position: relative;
}

.container {
  width: 347px;
  height: 347px;
  background-color: #ccc;
  border-radius: 50%;
  border: 10px solid #dde;
  position: relative;
  overflow: hidden;
  transition: 5s;
  margin-top: 35px;
}

.container div {
  height: 50%;
  width: 285px;
  position: absolute;
  clip-path: polygon(70% 0%, 50% 100%, 30% 0%);
  transform-origin: bottom;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  left: 20px;
}

.arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  z-index: 1;
}

.spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: #e2e2e2;
  text-transform: uppercase;
  border: 8px solid #fff;
  font-weight: bold;
  font-size: 20px;
  color: #a2a2a2;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  letter-spacing: 1px;
}

.top-score {
  margin-top: 13px;
  color: #fff;
}
.title-score {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}
.item-score {
  background-color: #fff;
  color: #24375a;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  height: 57px;
}
.item-score:last-child {
  border-radius: 0 0 8px 8px;
}

.item-score:last-child .score-info {
  border-bottom-right-radius: 8px;
}

.first {
  border-radius: 8px 8px 0 0;
}

.first .score-info {
  border-top-right-radius: 8px;
}
.user-info {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  margin-right: 10px;
}
.group-info {
  display: flex;
  align-items: center;
}
.user-name {
  font-size: 13px;
}
.rank {
  font-size: 12px;
}
.score-info {
  width: 105px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #596f93;
}
.avatar {
  border-radius: 50%;
  margin: 0 10px;
  width: 37px;
  height: 37px;
}
/* @media (min-width: 1024px) {
} */
@media only screen and (max-width: 375px) {
}
</style>

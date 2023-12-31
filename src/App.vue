<script setup>
import { computed, onMounted, ref, watch } from "vue";

import Header from "@/components/Header.vue";
import PointSpin from "@/components/PointSpin.vue";
import FailSpin from "@/components/FailSpin.vue";
import NameTopScore from "@/components/NameTopScore.vue";
import { setTopScore, getTopScore } from "@/utils/TopScoreStorage";

const containerRef = ref(null);
const isNewScore = ref(false);
const isFail = ref(false);
const isNameTopScore = ref(false);
const yourSpinScore = ref(0);
const yourTotalScore = ref(0);
const timesSpin = ref(0);
const topScore = ref();
const isSpinning = ref(false);

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
  timesSpin.value += 1;
  isSpinning.value = true;
  if (timesSpin.value < 4) {
    const scoreList = segments.value.map((el) => el.value);
    let number = Math.floor(Math.random() * 10 + 1);

    yourSpinScore.value = scoreList[number - 1];
    yourTotalScore.value += scoreList[number - 1];
    containerRef.value.style.transform = `rotate(${
      -((number - 1) * 36) - 720 * timesSpin.value
    }deg)`;

    setTimeout(() => {
      isNewScore.value = true;
      isSpinning.value = false;
    }, 5000);
  }
};

const newPlayTime = () => {
  timesSpin.value = 0;
  yourSpinScore.value = 0;
  yourTotalScore.value = 0;
  isNewScore.value = false;
  isFail.value = false;
  isNameTopScore.value = false;
  containerRef.value.style.removeProperty("transform");
};

const setNameTopScore = (name) => {
  setTopScore({ userName: name, score: yourTotalScore.value });
  getNewTopScore();
  newPlayTime();
};

const nextTime = () => {
  if (timesSpin.value === 3) {
    const lastTopScore = topScore.value[topScore.value.length - 1];
    if (topScore.value.length < 5) {
      isNameTopScore.value = true;
      return;
    }
    if (yourTotalScore.value < lastTopScore?.score) {
      isFail.value = true;
    } else {
      isNameTopScore.value = true;
    }
  }
  isNewScore.value = false;
};

const tryAgain = () => {
  newPlayTime();
};

const getNewTopScore = () => {
  const topScoreStorage = getTopScore() || [];
  topScore.value = [...topScoreStorage];
};

onMounted(() => {
  getNewTopScore();
});
</script>

<template>
  <Header />
  <div class="guide">
    <span class="lucky">Feeling lucky?</span>
    <span
      >Try out our spin and win game to win one of our exciting prizes.</span
    >
  </div>
  <div class="spin-app">
    <img src="@/assets/union.png" class="arrow" />
    <div class="container" ref="containerRef">
      <button
        class="spin"
        :class="isSpinning && 'running'"
        @click="!isSpinning && handleSpin()"
      >
        {{ !isSpinning ? "spin" : "" }}
      </button>
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
      :class="`${index === 0 ? 'first' : ''} ${
        topScore?.length === 1 ? 'one-top' : ''
      }`"
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
      <div class="score-info">
        <span>{{ top.score }}</span>
      </div>
    </div>
  </div>
  <PointSpin
    v-if="isNewScore"
    @next-time="nextTime"
    :spin-score="yourSpinScore"
  />
  <FailSpin v-if="isFail" @try-again="tryAgain" />
  <NameTopScore
    v-if="isNameTopScore"
    :total-score="yourTotalScore"
    @setNameTopScore="setNameTopScore"
  />
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
  margin-bottom: 13px;
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
  border: 2px solid #fff;
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

.running {
  border: none;
  background-color: black;
}

.top-score {
  color: #fff;
  transform: translateX(-50%);
  left: 50%;
  position: relative;
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
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.item-score:last-child .score-info {
  border-bottom-right-radius: 8px;
}

.first {
  border-radius: 8px 8px 8px 8px;
  transform: scale(1.02);
  background-color: #24375a;
}

.one-top {
  border-radius: 8px 8px 8px 8px;
}

.first .score-info {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #24375a;
}
.first .user-info .group-info .user-name {
  color: #fff;
}
.first .user-info .group-info .rank {
  color: #fff;
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
  color: black;
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
  padding: 0 10px;
}
.score-info span {
  width: 100%;
  background-color: #fff;
  border-radius: 15px;
  text-align: center;
  font-size: 9px;
  font-weight: bold;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  margin: 0 10px;
  width: 37px;
  height: 37px;
}
@media only screen and (min-width: 768px) {
  .top-score {
    max-width: 600px;
  }
}
</style>

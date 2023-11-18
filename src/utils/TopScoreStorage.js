// const listScore = [
//   { userName: "MrHuy", score: 330 },
//   { userName: "Ramsey", score: 530 },
//   { userName: "Persie", score: 220 },
//   { userName: "Cazorla", score: 620 },
//   { userName: "Ben White", score: 470 },
// ];

const setTopScore = (scoreInfo) => {
  const topScoreStorage = getTopScore();
  if (scoreInfo) {
    topScoreStorage.push(scoreInfo);
  }
  console.log("topScoreStorage", topScoreStorage);
  localStorage.setItem("topScore", JSON.stringify(topScoreStorage));
};

const getTopScore = () => {
  const topScore = JSON.parse(localStorage.getItem("topScore"));
  if (topScore?.length) {
    return topScore.sort((a, b) => b.score - a.score).slice(0, 6);
  }
  return [];
};

export { setTopScore, getTopScore };

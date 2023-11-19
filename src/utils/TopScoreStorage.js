const setTopScore = (scoreInfo) => {
  const topScoreStorage = getTopScore();
  if (scoreInfo) {
    topScoreStorage.push(scoreInfo);
  }
  localStorage.setItem("topScore", JSON.stringify(topScoreStorage));
};

const getTopScore = () => {
  const topScore = JSON.parse(localStorage.getItem("topScore"));
  if (topScore?.length) {
    return topScore.sort((a, b) => b.score - a.score).slice(0, 5);
  }
  return [];
};

export { setTopScore, getTopScore };

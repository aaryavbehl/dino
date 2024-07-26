export default class Score {
  score = 0;
  HIGH_SCORE_KEY = "highScore";

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(frameTimeDelta) {
    this.score += frameTimeDelta * 0.01;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px Helvetica`;

    const scoreText = Math.floor(this.score).toString().padStart(6, 0);
    const highScoreText = `HI ${highScore.toString().padStart(6, 0)}`;
    
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;
    const textHeight = fontSize;
    const textWidth = Math.max(
      this.ctx.measureText(scoreText).width,
      this.ctx.measureText(highScoreText).width
    );
    const padding = 10 * this.scaleRatio;
    const backgroundWidth = textWidth + padding * 2;
    const backgroundHeight = textHeight + padding * 2;


    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(highScoreX - padding, y - textHeight - padding, backgroundWidth, backgroundHeight);

    this.ctx.fillStyle = "#FFF";
    this.ctx.fillText(scoreText, scoreX, y);
    this.ctx.fillText(highScoreText, highScoreX, y);
  }
}

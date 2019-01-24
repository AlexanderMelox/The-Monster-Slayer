new Vue({
  el: '#app',
  data: {
    isPlaying: false,
    playerHealth: 100,
    monsterHealth: 100,
  },
  methods: {
    startGame: function () {
      // 1. Turn isPlaying to true to start game
      this.isPlaying = true;
      // 2. Reset values when re-starting a game
      this.reset();
    },
    reset: function () {
      // Sets the player's health back to 100
      this.playerHealth = 100;
      // Sets the monster's health back to 100
      this.monsterHealth = 100;
    },
    attack: function () {
      console.log('ATTACK');
      console.log(this.getRandomNumber(5, 13));
    },
    getRandomNumber: function (min, max) {
      // Get a number between min (inclusive) and max (exclusive)
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
  computed: {
    playerHealthBarStyles: function () {
      return {
        width: this.playerHealth + '%'
      }
    },
    monsterHealthBarStyles: function () {
      return {
        width: this.monsterHealth + '%'
      }
    }
  }
});
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
      this.playerHealth = 100;
      this.monsterHealth = 100;
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
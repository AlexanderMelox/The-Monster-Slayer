new Vue({
  el: '#app',
  data: {
    isPlaying: false,
    playerHealth: 100,
    monsterHealth: 100,
    log: [{
      character: 'player',
      action: 'hits',
      number: 12
    }],
    settings: {
      attack: {
        minDmg: 3,
        maxDmg: 13
      }
    }
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
      // Sets the battle log to an empty array
      this.log = [];
    },
    attack: function () {
      // 1. Generates a random attack number for the player and the monster
      const playerDmg = this.getRandomNumber(this.settings.attack.minDmg, this.settings.attack.maxDmg);
      const monsterDmg = this.getRandomNumber(this.settings.attack.minDmg, this.settings.attack.maxDmg);
      // 2. Reduce the dmg done by the character
      this.playerHealth -= monsterDmg;
      this.monsterHealth -= playerDmg;
      // 3. Update the battle log
      this.updateBattleLog({
        type: 'attack',
        player: playerDmg,
        monster: monsterDmg
      });
    },
    updateBattleLog: function (options) {
      const { type } = options;
      if (type === 'attack') {
        console.log(type);
      }
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
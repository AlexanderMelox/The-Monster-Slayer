new Vue({
  el: '#app',
  data: {
    isPlaying: false,
    playerHealth: 100,
    monsterHealth: 100,
    battleLog: [],
    isGameOver: false,
    settings: {
      attack: {
        minDmg: 3,
        maxDmg: 10
      },
      specialAttack: {
        minDmg: 10,
        maxDmg: 20
      },
      healAmount: 10
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
      this.battleLog = [];
      // Sets isGameOver 
      this.isGameOver = false;
    },
    attack: function () {
      // 1. Generates a random attack number for the player and the monster
      const playerDmg = this.getRandomNumber(this.settings.attack.minDmg, this.settings.attack.maxDmg);
      const monsterDmg = this.getRandomNumber(5, 12);

      // 2. Reduce the dmg done by the character
      this.updateHealth({ playerDmg, monsterDmg });

      // 3. Update the battle log
      this.updateBattleLog({
        type: 'attack',
        playerDmg: playerDmg,
        monsterDmg: monsterDmg
      });

      // 4. Check if any HP is under 0
      this.checkIfGameIsOver();
    },
    specialAttack: function () {
      // 1. Generate a random special attack number for the player and the monster
      const playerDmg = this.getRandomNumber(this.settings.specialAttack.minDmg, this.settings.specialAttack.maxDmg);
      const monsterDmg = this.getRandomNumber(5, 30);

      // 2. Reduce the dmg done by the character
      this.updateHealth({ playerDmg, monsterDmg });

      // 3. Update the battle log
      this.updateBattleLog({
        type: 'attack',
        playerDmg: playerDmg,
        monsterDmg: monsterDmg
      });

      // 4. Check if any HP is under 0
      this.checkIfGameIsOver();
    },
    heal: function () {
      // 1. Generate a monster damage amount while the player heals
      const monsterDmg = this.getRandomNumber(this.settings.attack.minDmg, this.settings.attack.maxDmg);
      const { healAmount } = this.settings;

      // 2. update the health values
      this.updateHealth({ playerDmg: 0, monsterDmg });

      // 3. Heal the player
      this.playerHealth += healAmount;

      // 4. Update the battle log
      this.updateBattleLog({
        type: 'heal',
        playerDmg: 0,
        monsterDmg: monsterDmg
      });

    },
    giveUp: function () {
      const giveUp = confirm('Are you sure?');
      if (giveUp) {
        alert('You lost!');
        this.startGame();
      }
    },
    updateHealth: function ({ playerDmg, monsterDmg }) {
      this.playerHealth -= monsterDmg;
      this.monsterHealth -= playerDmg;
    },
    checkIfGameIsOver: function () {
      if ((this.monsterHealth <= 0 && this.playerHealth <= 0) && this.monsterHealth === this.playerHealth) { // Its a tie!
        const playAgain = confirm('You both died! Try again?');
        playAgain ? this.startGame() : this.isGameOver = true;
      } else if (this.monsterHealth <= 0) { // 1. Check if the monster's health is <= 0
        // 1.1 Checks if the player wants to play again
        const playAgain = confirm('You slain the monster! Play again?');
        // 1.2 If the player confirms then the game starts again, if not sets the game into the game over state
        playAgain ? this.startGame() : this.isGameOver = true;
      } else if (this.playerHealth <= 0) { // 2. Check if the player's health is <= 0
        // 2.1 Checks if the player wants to play again
        const playAgain = confirm('YOU DIED. Try again?');
        // 2.2 If the player confirms then the game starts again, if not sets the game into the game over state
        playAgain ? this.startGame() : this.isGameOver = true;
      }
    },
    updateBattleLog: function ({ type, playerDmg, monsterDmg }) {
      if (type === 'attack') {
        // Creates the log for the monster
        const monsterLog = {
          character: 'monster',
          isAttacking: true,
          number: monsterDmg
        };
        // Creates the log for the player
        const playerLog = {
          character: 'player',
          isAttacking: true,
          number: playerDmg
        };
        // Adds the logs to the list
        this.battleLog.unshift(monsterLog);
        this.battleLog.unshift(playerLog);
      } else if (type === 'heal') {
        // Creates the log for the monster
        const monsterLog = {
          character: 'monster',
          isAttacking: true,
          number: monsterDmg
        };
        // Creates the log for the player
        const playerLog = {
          character: 'player',
          isAttacking: false,
        };
        // Adds the logs to the list
        this.battleLog.unshift(monsterLog);
        this.battleLog.unshift(playerLog);
      }
    },
    playAgain: function (message) {
      const playAgain = confirm(message);
      playAgain ? this.startGame() : this.isGameOver = true;
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

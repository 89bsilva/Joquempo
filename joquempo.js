
var app = new Vue({
   el: '#joquempo',
   data: {
      running: false,
      round: 1,
      finalRound: 1,
      playerName: 'Jogador',
      playerScore: 0,
      playerClass: {
         win: false,
         lose: false
      },
      cpuClass: {
         win: false,
         lose: false
      },
      cpuScore: 0,
      stage: 0,
      resultClass: {
         win: true,
         lose: false
      }
   }
})
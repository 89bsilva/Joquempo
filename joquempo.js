
var app = new Vue({
   el: '#joquempo',
   data: {
      round: {
         final: null,
         current: 1,
         winner: null
      },
      cpu: { 
         score: 0,
         optionChosen: null
      },
      player: {
         name: '',
         score: 0,
         optionChosen: null
      },
      options:  [
         'rock',
         'paper',
         'scissor'
      ],
      rules: {
         rock: {
            win: 'scissor',
            lose: 'paper'
         },
         paper: {
            win: 'rock',
            lose: 'scissor'
         },
         scissor: {
            win: 'paper',
            lose: 'rock'
         }
      },
      stage: 'menu',
      end: false
   },
   watch: {
      // Para impedir que o jogo não termine empatado
      end(newState) {

         if(newState === false) {
            return
         }
         
         this.round.current = this.round.final
         
         if(this.player.score === this.cpu.score) {
            this.end = false
         }
      }
   },
   methods: {
      // Função para formatar o nome inserido no input[v-model="playerName"]
      // Ex.: entrada = "bruNO    siLVa" saída = "Bruno Silva"
      handlePlayerName() {
         const newPlayerName = []
         
         this.player.name.toLowerCase().split(' ').map(name => {
            if (name !== '') {
               newPlayerName.push(name[0].toUpperCase() + name.slice(1))
            }
         })

         this.player.name = newPlayerName.join(' ')
      },
      // Função para garantir tipo inteiro e no mínimo o valor 1 para propriedade finalRound
      handleFinalRound() {
         this.round.final = parseInt(this.round.final) || 1
      },
      toChoiceBoard() {
         this.stage = 'choiceBoard'
      },
      // Sorteia a escolha da cpu, insere a escolha do usuário e chama função para comparar as escolhas
      startFight(option) {
         const cpuOption = this.sortCpuOption()
         
         this.stage = 'loadingFight'
         this.setChosenOption('player', option)
         this.setChosenOption('cpu', cpuOption)
         this.compareOptions()
      },
      // Sorteia um número de 0 a 2
      sortCpuOption() {
         return Math.floor(Math.random() * 3)
      },
      setChosenOption(target, option) {
         this[target].optionChosen = this.options[option]
      },
      // Compara as escolhas, verifica se houve vencedor, se houver vencedor aumenta a pontuação dele.
      // Também chama função para exibir o resultado da comparação
      compareOptions() {
         let winner = false
         
         if(this.player.optionChosen !== this.cpu.optionChosen) {
            const playerOption = this.player.optionChosen
            const cpuOption = this.cpu.optionChosen

            winner = this.rules[playerOption].win === cpuOption ? 'player' : 'cpu'
         }

         this.round.winner = winner || 'nobody'

         setTimeout(() => {
            this.stage = 'fight'

            if(winner) {
               this[winner].score++
               this.round.current++
               this.end = this.round.current > this.round.final
            }

            this.toResult()
         }, 600)
      },
      toResult() {
         this.stage = 'result'
      },
      newGame() {
         this.resetDataGame()
         this.stage = 'menu'
      },
      resetDataGame() {
         this.round = {
            final: null,
            current: 1,
            winner: null
         }
         this.cpu = { 
            score: 0,
            optionChosen: null
         }
         this.player = {
            name: '',
            score: 0,
            optionChosen: null
         }
         this.end = false
      }
   },
   computed: {
      // Habilita o botão iniciar jogo se há valores válidos em finalRound e playerName. Desabilita caso contrário
      allValidData() {
         return this.round.final && this.player.name
      },
      // Indica quem está ganhando
      winning() {
         if(this.player.score === this.cpu.score) {
            return 'nobody'
         }

         return this.player.score > this.cpu.score ? 'player' : 'cpu'
      },
   }
})
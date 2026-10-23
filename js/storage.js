/* ==========================================================================
   storage.js — Salvamento das partidas (por enquanto, no aparelho)
   --------------------------------------------------------------------------
   TODO o salvamento passa por este arquivo. Para usar uma API/banco de dados
   no futuro, troque o corpo das funções abaixo (ex.: fetch('/api/partidas')).
   O resto do jogo só conhece: salvarPartida, atualizarPartida, listarPartidas, limpar.

   Formato de uma partida (JSON padronizado):
   { id, alunoNome, ano, escola, professor, dificuldade, pontos,
     acertos, erros, faseSecretaEncontrada, data, totalPerguntas }
     - acertos: perguntas acertadas de PRIMEIRA
     - erros:   tentativas erradas (somando todas as perguntas)

   LGPD: os dados ficam só neste navegador; nada é enviado pela internet.
   Todos os campos pessoais são opcionais.
   ========================================================================== */
(function (g) {
  'use strict';

  var CHAVE = 'mundoDeFantasia.partidas.v1';
  var MAXIMO = 200;   // guarda no máximo 200 partidas
  var memoria = [];   // plano B se o navegador bloquear o localStorage

  function ler() {
    try {
      var texto = g.localStorage.getItem(CHAVE);
      var lista = texto ? JSON.parse(texto) : [];
      return Array.isArray(lista) ? lista : [];
    } catch (e) {
      return memoria.slice();
    }
  }

  function gravar(lista) {
    memoria = lista.slice();
    try { g.localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch (e) { /* ignora */ }
  }

  g.Armazenamento = {
    /* Salva uma partida nova e devolve o id dela. */
    salvarPartida: function (partida) {
      var lista = ler();
      var nova = Object.assign({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }, partida);
      lista.push(nova);
      if (lista.length > MAXIMO) { lista = lista.slice(-MAXIMO); }
      gravar(lista);
      return nova.id;
    },

    /* Completa dados de uma partida já salva (ex.: aluno que pulou o cadastro e preencheu no fim). */
    atualizarPartida: function (id, campos) {
      var lista = ler();
      lista.forEach(function (p) { if (p.id === id) { Object.assign(p, campos); } });
      gravar(lista);
    },

    listarPartidas: function () { return ler(); },

    /* Ranking local: mais pontos primeiro; empate -> mais acertos de primeira. */
    ranking: function (dificuldade) {
      return ler()
        .filter(function (p) { return !dificuldade || p.dificuldade === dificuldade; })
        .sort(function (a, b) { return (b.pontos - a.pontos) || (b.acertos - a.acertos); });
    },

    limpar: function () { gravar([]); }
  };
})(window);

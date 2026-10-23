/* ==========================================================================
   main.js — Liga as telas e os botões
   Fluxo: Início -> Dados do aluno (pode pular) -> Dificuldade -> Perguntas
          -> (Fase secreta) -> Fim de jogo -> Ranking
   ========================================================================== */
(function () {
  'use strict';

  var $ = UI.$;
  var sessao = { aluno: null, pulou: false };

  /* ------------------------------------------------------------- telas */
  function telaInicio() {
    Jogo.sair();
    UI.mostrarTela('tela-inicio');
    UI.julioPose('feliz');
  }

  function telaDados() {
    UI.mostrarTela('tela-dados');
    UI.fala('Oi! Eu sou o Julio. Qual é o seu nome? Se preferir, é só pular.', 'oi');
  }

  function telaNivel() {
    UI.mostrarTela('tela-nivel');
    UI.fala('Escolha o seu desafio! No fácil, eu ensino tudo passo a passo.', 'feliz');
  }

  var ESTRELAS = { facil: '★', medio: '★★', dificil: '★★★' };

  function montarNiveis() {
    var lista = $('nivel-lista');
    UI.limpar(lista);
    var niveis = Jogo.niveis();
    ['facil', 'medio', 'dificil'].forEach(function (id) {
      var n = niveis[id];
      if (!n) { return; }
      var b = UI.el('button', { classe: 'nivel-card nivel-' + id, type: 'button' }, [
        UI.icone('icone-' + id, 'nivel-icone') || UI.el('span', { classe: 'nivel-estrelas', texto: ESTRELAS[id], 'aria-hidden': 'true' }),
        UI.el('span', { classe: 'nivel-titulo', texto: n.titulo }),
        UI.el('span', { classe: 'nivel-desc', texto: n.descricao })
      ]);
      b.addEventListener('click', function () { Jogo.iniciar(id, sessao.aluno); });
      lista.appendChild(b);
    });
  }

  /* ----------------------------------------------------------- ranking */
  var nomesNivel = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' };

  function desenharRanking(filtro) {
    var corpo = $('rank-corpo');
    UI.limpar(corpo);
    var lista = Armazenamento.ranking(filtro).slice(0, 10);
    $('rank-vazio').hidden = lista.length > 0;
    lista.forEach(function (p, i) {
      var tr = UI.el('tr', {}, [
        UI.el('td', { texto: String(i + 1) }),
        UI.el('td', { texto: p.alunoNome || 'Jogador(a)' }),
        UI.el('td', { texto: p.ano || '—' }),
        UI.el('td', { texto: nomesNivel[p.dificuldade] || '—' }),
        UI.el('td', { texto: String(p.pontos) }),
        UI.el('td', { texto: p.acertos + '/' + (p.totalPerguntas || '?') })
      ]);
      corpo.appendChild(tr);
    });
  }

  function telaRanking() {
    UI.mostrarTela('tela-ranking');
    Array.prototype.forEach.call(document.querySelectorAll('#rank-abas button'), function (b) {
      b.setAttribute('aria-selected', b.getAttribute('data-filtro') === '' ? 'true' : 'false');
    });
    desenharRanking('');
  }

  /* ------------------------------------------------------------- som */
  function atualizarSom() {
    var ok = Voz.disponivel();
    var ligada = Voz.estaLigada();
    var b = $('btn-som');
    b.hidden = !ok;
    UI.limpar(b);
    var ic = UI.icone(ligada ? 'som-ligado' : 'som-desligado', 'som-img');
    if (ic) { b.appendChild(ic); } else { b.textContent = ligada ? '🔊' : '🔇'; }
    b.setAttribute('aria-pressed', ligada ? 'true' : 'false');
    b.setAttribute('aria-label', ligada ? 'Desligar a voz do Julio' : 'Ligar a voz do Julio');
    $('btn-ouvir').hidden = !ok || !ligada;
  }

  /* ------------------------------------------------------------ início */
  function ligarBotoes() {
    $('btn-jogar').addEventListener('click', function () {
      Voz.ativar(); // iOS/Safari: a voz só funciona depois de um toque
      telaDados();
    });
    $('btn-ranking-inicio').addEventListener('click', telaRanking);

    $('form-dados').addEventListener('submit', function (e) {
      e.preventDefault();
      var d = {
        nome: $('d-nome').value.trim(), ano: $('d-ano').value,
        escola: $('d-escola').value.trim(), professor: $('d-prof').value.trim()
      };
      var vazio = !d.nome && !d.ano && !d.escola && !d.professor;
      sessao.aluno = vazio ? null : d;
      sessao.pulou = vazio;
      telaNivel();
    });
    $('btn-pular').addEventListener('click', function () {
      sessao.aluno = null;
      sessao.pulou = true;
      telaNivel();
    });
    $('btn-voltar-nivel').addEventListener('click', telaInicio);

    /* Jogo */
    $('btn-proxima').addEventListener('click', function () { Jogo.avancar(); });
    $('btn-ouvir').addEventListener('click', function () { Jogo.ouvirDeNovo(); });
    $('btn-pausa').addEventListener('click', function () { Jogo.alternarPausa(); });
    $('segredo').addEventListener('click', function () { Jogo.encontrouSegredo(); });
    $('btn-sair-jogo').addEventListener('click', telaInicio);

    /* Fim */
    $('btn-jogar-de-novo').addEventListener('click', telaNivel);
    $('btn-ver-ranking').addEventListener('click', telaRanking);
    $('btn-inicio-fim').addEventListener('click', telaInicio);
    $('form-registro').addEventListener('submit', function (e) {
      e.preventDefault();
      var d = {
        nome: $('r-nome').value.trim(), ano: $('r-ano').value,
        escola: $('r-escola').value.trim(), professor: $('r-prof').value.trim()
      };
      if (!d.nome && !d.ano && !d.escola && !d.professor) { return; }
      Jogo.registrarDepois(d);
      sessao.aluno = d;
      $('form-registro').hidden = true;
      $('fim-salvo').hidden = false;
      UI.fala('Pronto! Seu nome já está no ranking.', 'comemorando', { voz: true });
    });

    /* Ranking */
    $('rank-abas').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) { return; }
      Array.prototype.forEach.call(document.querySelectorAll('#rank-abas button'), function (x) {
        x.setAttribute('aria-selected', x === b ? 'true' : 'false');
      });
      desenharRanking(b.getAttribute('data-filtro'));
    });
    $('btn-voltar-ranking').addEventListener('click', telaInicio);
    $('btn-limpar-ranking').addEventListener('click', function () {
      if (g_confirm('Apagar todo o ranking deste aparelho?')) {
        Armazenamento.limpar();
        desenharRanking('');
      }
    });

    /* Som */
    $('btn-som').addEventListener('click', function () {
      var ligou = Voz.ligarDesligar();
      if (ligou) { Voz.falar('Voz ligada!'); }
    });
    Voz.aoMudar(atualizarSom);

    document.addEventListener('visibilitychange', function () { if (document.hidden) { Voz.parar(); } });
  }

  function g_confirm(msg) { try { return window.confirm(msg); } catch (e) { return false; } }

  /* ------------------------------------------------------------- início */
  function iniciar() {
    document.body.classList.toggle('com-imagens', UI.config.usarImagens);
    UI.montarJulios();
    ligarBotoes();
    atualizarSom();
    Jogo.carregarPerguntas().then(function () {
      montarNiveis();
      $('btn-jogar').disabled = false;
    }).catch(function () {
      UI.fala('Ops! Não consegui carregar as perguntas. Abra o jogo por um servidor local (veja o README).', 'pensando', { voz: false });
    });
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', iniciar); }
  else { iniciar(); }
})();

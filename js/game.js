/* ==========================================================================
   game.js — Regras do jogo
   --------------------------------------------------------------------------
   - Carrega data/questions.json
   - Monta a fila de perguntas de cada dificuldade
   - Três mecânicas: "clicar", "arrastar" e "movimento"
   - Feedback do Julio (história, dicas progressivas, "finge que errou")
   - Pontuação, fase secreta e tela final

   PONTUAÇÃO
     acerto de primeira = 100 pontos | cada tentativa errada tira 25 (mínimo 25)
     x multiplicador da dificuldade (fácil 1, médio 1,5, difícil 2)
     vagalume dourado achado = +50 | fase secreta = +100 (de primeira) ou +50
   ========================================================================== */
(function (g) {
  'use strict';

  var $ = UI.$;
  var Jogo = {};
  var banco = null;     // conteúdo do questions.json
  var estado = null;    // estado da partida em andamento
  var raf = 0;          // id da animação (respostas em movimento)
  var itensMov = [];    // respostas que estão se mexendo
  var pausado = false;

  var TUTORIAL = {
    clicar: 'Para responder, é só tocar na resposta certa.',
    arrastar: 'Agora vamos arrastar! Segure a resposta, leve até o lugar certo e solte.',
    movimento: 'Olha só! As respostas vão se mexer. Acompanhe com os olhos e toque na certa.'
  };
  var ENCORAJAR = [
    'Quase! Tente de novo, você consegue!',
    'Hum, não foi essa. Tente mais uma vez!',
    'Sem problema! Errar faz parte de aprender. Tente de novo!'
  ];
  var ABERTURA_DICA = ['Hum, vamos pensar juntos.', 'Sem problema! Olhe a dica do Julio.', 'Quase lá! Veja esta dica.'];
  // Lugares onde o vagalume dourado (fase secreta) pode se esconder, longe das respostas.
  var ESCONDERIJOS = [
    { x: '3%', y: '16%' }, { x: '94%', y: '26%' }, { x: '6%', y: '90%' },
    { x: '93%', y: '84%' }, { x: '52%', y: '10%' }
  ];

  function sorteia(lista) { return lista[Math.floor(Math.random() * lista.length)]; }

  /* ---------------------------------------------------------------- dados */
  Jogo.carregarPerguntas = function () {
    return fetch('data/questions.json')
      .then(function (r) { if (!r.ok) { throw new Error('http'); } return r.json(); })
      .catch(function () {
        // Plano B: se abriu o index.html direto do computador (file://), usa data/questions.js
        if (g.QUESTIONS_DATA) { return g.QUESTIONS_DATA; }
        throw new Error('sem-perguntas');
      })
      .then(function (dados) {
        banco = dados;
        UI.coresPlaceholder = dados.placeholders || {};
        return dados;
      });
  };

  Jogo.niveis = function () { return banco.niveis; };
  Jogo.estado = function () { return estado; };

  function coletarImagens(lista) {
    var set = {};
    lista.forEach(function (q) {
      (q.imagens || []).forEach(function (i) { set[i] = 1; });
      if (q.zona && q.zona.imagem) { set[q.zona.imagem] = 1; }
      q.opcoes.forEach(function (o) { (o.imagens || []).forEach(function (i) { set[i] = 1; }); });
    });
    set['icones/bau-fechado.svg'] = 1; // lugar padrão para soltar a resposta
    return Object.keys(set);
  }

  /* Perguntas secretas do nível (banco "secretas" do JSON). Não repetem as normais e não têm dicas. */
  function secretasDoNivel(nivelId) {
    return (banco.secretas || []).filter(function (s) { return s.nivel === nivelId; });
  }
  var secretasVistas = {}; // por nível: evita repetir a mesma pergunta secreta enquanto houver outras

  function escolherSecreta() {
    var pool = secretasDoNivel(estado.nivelId);
    if (!pool.length) { return null; }
    var vistas = secretasVistas[estado.nivelId] || [];
    var livres = pool.filter(function (s) { return vistas.indexOf(s.id) < 0; });
    if (!livres.length) { vistas = []; livres = pool; } // viu todas: recomeça o sorteio
    var q = sorteia(livres);
    vistas.push(q.id);
    secretasVistas[estado.nivelId] = vistas;
    return q;
  }

  /* ------------------------------------------------------- iniciar partida */
  Jogo.iniciar = function (nivelId, aluno) {
    var cfg = banco.niveis[nivelId];
    var lista = banco.perguntas.filter(function (p) { return p.nivel === nivelId; });

    // Ordem: primeiro as do tutorial (se houver), depois as outras embaralhadas.
    var inicio = (cfg.ordemInicial || []).map(function (id) {
      return lista.filter(function (p) { return p.id === id; })[0];
    }).filter(Boolean);
    var resto = UI.embaralhar(lista.filter(function (p) { return inicio.indexOf(p) < 0; }));
    var ordem = inicio.concat(resto);

    // Mecânica de cada pergunta. No Fácil, as 3 primeiras ensinam: clicar, arrastar, movimento.
    var fixas = cfg.tutorial ? ['clicar', 'arrastar', 'movimento'] : [];
    var ciclo = UI.embaralhar(['clicar', 'arrastar', 'movimento']);
    var fila = ordem.map(function (q, i) {
      var permitidas = q.mecanicas || ['clicar', 'arrastar', 'movimento'];
      var m = fixas[i] || ciclo[i % 3];
      if (permitidas.indexOf(m) < 0) { m = permitidas[0]; }
      return { q: q, mecanica: m };
    });

    estado = {
      nivelId: nivelId, cfg: cfg, fila: fila, idx: 0, aluno: aluno || null,
      pontos: 0, acertosPrimeira: 0, erros: 0, respondidas: [], mecVistas: {},
      secretaEncontrada: false, secretaPendente: false, secretaFeita: false,
      atual: null, idPartida: null
    };

    UI.mostrarTela('tela-carregando');
    UI.fala('Preparando o mundo de fantasia...', 'feliz', { voz: false });
    var minimo = new Promise(function (ok) { setTimeout(ok, 500); });
    var tudo = lista.concat(secretasDoNivel(nivelId));
    return Promise.all([UI.preCarregar(coletarImagens(tudo)), minimo]).then(mostrarPergunta);
  };

  function nomeCurto() {
    var n = estado && estado.aluno && estado.aluno.nome ? String(estado.aluno.nome).trim().split(/\s+/)[0] : '';
    return n ? ', ' + n : '';
  }

  /* --------------------------------------------------------- uma pergunta */
  function mostrarPergunta() {
    var item = estado.fila[estado.idx];
    var q = item.q;
    estado.atual = { q: q, mecanica: item.mecanica, errosQ: 0, resolvida: false, secreta: false, taps: 0, opcoes: [] };

    UI.mostrarTela('tela-jogo');
    trocarCenario(estado.nivelId);
    $('chip-nivel').textContent = estado.cfg.titulo;
    desenharProgresso();
    atualizarPontos();
    prepararCartao();
    desenharQuestao(q, item.mecanica);
    mostrarSegredo();

    // O Julio conta a historinha e faz a pergunta. No Fácil, explica a mecânica na 1ª vez.
    var partes = [];
    if (estado.cfg.tutorial && !estado.mecVistas[item.mecanica]) {
      partes.push(TUTORIAL[item.mecanica]);
      estado.mecVistas[item.mecanica] = true;
    }
    partes.push(q.intro, q.falar);
    var escrito = partes.join(' ');
    var falado = escrito + (estado.cfg.tutorial ? ' ' + frasesOpcoes(estado.atual.opcoes) : '');
    UI.fala(escrito, 'feliz', { falar: falado });
  }

  function trocarCenario(nome) {
    var t = $('tela-jogo');
    ['facil', 'medio', 'dificil', 'secreta'].forEach(function (n) { t.classList.remove('cenario-' + n); });
    t.classList.add('cenario-' + nome);
  }

  function desenharProgresso() {
    var ol = $('progresso');
    UI.limpar(ol);
    estado.fila.forEach(function (_, i) {
      var cls = 'ponto' + (i < estado.idx ? ' feito' : (i === estado.idx ? ' atual' : ''));
      ol.appendChild(UI.el('li', { classe: cls, 'aria-label': 'Pergunta ' + (i + 1) }));
    });
  }

  function atualizarPontos() { $('pontos-num').textContent = estado.pontos; }

  function prepararCartao() {
    $('btn-proxima').hidden = true;
    $('btn-pausa').hidden = true;
    Array.prototype.forEach.call(document.querySelectorAll('#cartao .recompensa'), function (r) { r.parentNode.removeChild(r); });
  }

  function frasesOpcoes(ops) {
    var nomes = ops.map(function (o) { return o.falar || o.texto; });
    if (nomes.length < 2) { return 'A resposta é: ' + nomes.join(''); }
    return 'As respostas são: ' + nomes.slice(0, -1).join(', ') + ' ou ' + nomes[nomes.length - 1] + '.';
  }

  /* Desenha enunciado + respostas na mecânica escolhida. */
  function desenharQuestao(q, mecanica) {
    pararMovimento();

    var vis = $('p-visual');
    UI.limpar(vis);
    vis.removeAttribute('role'); vis.removeAttribute('aria-label');
    var temImagens = q.imagens && q.imagens.length;
    if (UI.config.usarImagens && temImagens) {
      q.imagens.forEach(function (i) { vis.appendChild(UI.midia(i, 'grande')); });
    } else if (q.visual) {
      vis.appendChild(UI.visual(q.visual));
    } else if (temImagens) {
      q.imagens.forEach(function (i) { vis.appendChild(UI.midia(i, 'grande')); });
    }
    if (vis.firstChild && q.descricao) { vis.setAttribute('role', 'img'); vis.setAttribute('aria-label', q.descricao); }
    vis.hidden = !vis.firstChild;

    $('p-texto').textContent = q.texto;

    var extra = $('p-extra');
    UI.limpar(extra);
    if (q.palavra) { extra.appendChild(UI.el('div', { classe: 'palavra', texto: q.palavra })); }
    if (q.letras) {
      var tiles = UI.el('div', { classe: 'letras', 'aria-label': 'Letras: ' + q.letras.join(', ') });
      q.letras.forEach(function (l) { tiles.appendChild(UI.el('span', { classe: 'letra', texto: l })); });
      extra.appendChild(tiles);
    }

    var area = $('area-resposta');
    UI.limpar(area);
    var ops = UI.embaralhar(q.opcoes);
    estado.atual.opcoes = ops;

    if (mecanica === 'arrastar') { montarArrastar(q, ops, area); }
    else if (mecanica === 'movimento') { montarMovimento(ops, area); }
    else { montarClicar(ops, area); }
    // Celular: leva o cartão ao topo para a zona e as respostas ficarem juntas na tela.
    if (mecanica === 'arrastar' && window.innerWidth < 600) { try { $('cartao').scrollIntoView({ block: 'start' }); } catch (e) {} }
  }

  function criarOpcao(op) {
    var b = UI.el('button', { classe: 'opcao' + (op.imagens && op.imagens.length ? '' : ' so-texto'), type: 'button' });
    if (op.imagens && op.imagens.length) {
      var caixa = UI.el('span', { classe: 'opcao-midias' });
      op.imagens.forEach(function (i) { caixa.appendChild(UI.midia(i)); });
      b.appendChild(caixa);
    }
    b.appendChild(UI.el('span', { classe: 'opcao-texto', texto: op.texto }));
    b._op = op;
    return b;
  }

  /* ------------------------------------------------------ mecânica: clicar */
  function montarClicar(ops, area) {
    var grade = UI.el('div', { classe: 'opcoes n' + ops.length });
    ops.forEach(function (op) {
      var b = criarOpcao(op);
      b.addEventListener('click', function () { responder(op, b); });
      grade.appendChild(b);
    });
    area.appendChild(grade);
  }

  /* ---------------------------------------------------- mecânica: arrastar */
  function montarArrastar(q, ops, area) {
    var zona = UI.el('div', { classe: 'zona', role: 'img', 'aria-label': 'Lugar para soltar a resposta: ' + (q.zona ? q.zona.rotulo : 'aqui') });
    zona.appendChild(UI.midia(q.zona ? q.zona.imagem : 'icones/bau-fechado.svg', 'zona-midia'));
    zona.appendChild(UI.el('span', { classe: 'zona-rotulo', texto: q.zona ? q.zona.rotulo : 'Solte aqui' }));
    var bandeja = UI.el('div', { classe: 'bandeja' });
    ops.forEach(function (op) {
      var card = criarOpcao(op);
      card.classList.add('arrastavel');
      bandeja.appendChild(card);
      ligarArraste(card, op, zona);
    });
    area.appendChild(zona);
    area.appendChild(bandeja);
  }

  function sobre(card, zona) {
    var a = card.getBoundingClientRect(), z = zona.getBoundingClientRect(), m = 16;
    var cx = a.left + a.width / 2, cy = a.top + a.height / 2;
    return cx > z.left - m && cx < z.right + m && cy > z.top - m && cy < z.bottom + m;
  }

  function ligarArraste(card, op, zona) {
    var ini = null;
    var pos = { dx: 0, dy: 0 };

    card.addEventListener('pointerdown', function (e) {
      if (!estado || estado.atual.resolvida || card.disabled) { return; }
      if (e.button > 0) { return; }
      ini = { x: e.clientX, y: e.clientY, moveu: false, id: e.pointerId };
      pos = { dx: 0, dy: 0 };
      try { card.setPointerCapture(e.pointerId); } catch (x) { /* ignora */ }
      card.classList.add('arrastando');
      e.preventDefault();
    });

    card.addEventListener('pointermove', function (e) {
      if (!ini || e.pointerId !== ini.id) { return; }
      pos.dx = e.clientX - ini.x;
      pos.dy = e.clientY - ini.y;
      if (Math.abs(pos.dx) + Math.abs(pos.dy) > 8) { ini.moveu = true; }
      card.style.transform = 'translate(' + pos.dx + 'px,' + pos.dy + 'px) scale(1.06)';
      zona.classList.toggle('alvo', sobre(card, zona));
    });

    function soltar(e) {
      if (!ini || e.pointerId !== ini.id) { return; }
      var moveu = ini.moveu;
      ini = null;
      card.classList.remove('arrastando');
      zona.classList.remove('alvo');
      if (!moveu) { card.style.transform = ''; tocouSemArrastar(card, op); return; }
      if (sobre(card, zona)) {
        // encaixa a resposta no centro do lugar e confere
        var a = card.getBoundingClientRect(), z = zona.getBoundingClientRect();
        pos.dx += (z.left + z.width / 2) - (a.left + a.width / 2);
        pos.dy += (z.top + z.height / 2) - (a.top + a.height / 2);
        card.style.transform = 'translate(' + pos.dx + 'px,' + pos.dy + 'px) scale(.85)';
        responder(op, card);
      } else {
        card.style.transform = '';
      }
    }
    card.addEventListener('pointerup', soltar);
    card.addEventListener('pointercancel', function () { ini = null; card.classList.remove('arrastando'); card.style.transform = ''; zona.classList.remove('alvo'); });
    // Teclado (Enter/Espaço): responde direto, para quem não consegue arrastar.
    card.addEventListener('click', function (e) { if (e.detail === 0) { responder(op, card); } });
  }

  /* Toque sem arrastar: o Julio lembra de arrastar; depois de algumas vezes aceita o toque. */
  function tocouSemArrastar(card, op) {
    var a = estado.atual;
    a.taps++;
    if (a.taps >= 3) { responder(op, card); return; }
    card.classList.add('balanca');
    setTimeout(function () { card.classList.remove('balanca'); }, 500);
    UI.fala('Segure a resposta e arraste até o lugar marcado. Depois é só soltar!', 'dica');
  }

  /* ---------------------------------------------------- mecânica: movimento */
  function montarMovimento(ops, area) {
    var arena = UI.el('div', { classe: 'arena' });
    area.appendChild(arena);
    var cards = ops.map(function (op) {
      var c = criarOpcao(op);
      c.classList.add('flutuante');
      c.addEventListener('click', function () { responder(op, c); });
      arena.appendChild(c);
      return { op: op, c: c };
    });
    var pausa = $('btn-pausa');
    pausa.hidden = false;
    pausado = false;
    pausa.textContent = '⏸ Parar o movimento';
    requestAnimationFrame(function () { iniciarMovimento(arena, cards); });
  }

  function iniciarMovimento(arena, cards) {
    var W = arena.clientWidth, H = arena.clientHeight;
    var vel = estado.cfg.velocidade * (UI.reduzirMovimento() ? 0.4 : 1);
    var coluna = W / cards.length;
    itensMov = cards.map(function (o, i) {
      var w = o.c.offsetWidth, h = o.c.offsetHeight;
      var ang = Math.random() * Math.PI * 2;
      var vx = Math.cos(ang) * vel, vy = Math.sin(ang) * vel;
      if (Math.abs(vy) < vel * 0.25) { vy = (vy < 0 ? -1 : 1) * vel * 0.25; }
      return {
        c: o.c, op: o.op, w: w, h: h, vx: vx, vy: vy, parado: false,
        x: Math.min(Math.max(0, W - w), Math.max(0, coluna * i + (coluna - w) / 2)),
        y: Math.random() * Math.max(1, H - h)
      };
    });
    var ultimo = performance.now();

    function passo(t) {
      var dt = Math.min(0.05, (t - ultimo) / 1000);
      ultimo = t;
      var w = arena.clientWidth, h = arena.clientHeight;
      if (!pausado) {
        itensMov.forEach(function (it) {
          if (it.parado) { return; }
          it.x += it.vx * dt; it.y += it.vy * dt;
          if (it.x < 0) { it.x = 0; it.vx = Math.abs(it.vx); }
          if (it.x > w - it.w) { it.x = Math.max(0, w - it.w); it.vx = -Math.abs(it.vx); }
          if (it.y < 0) { it.y = 0; it.vy = Math.abs(it.vy); }
          if (it.y > h - it.h) { it.y = Math.max(0, h - it.h); it.vy = -Math.abs(it.vy); }
        });
        colisoes();
      }
      itensMov.forEach(function (it) { it.c.style.transform = 'translate(' + it.x.toFixed(1) + 'px,' + it.y.toFixed(1) + 'px)'; });
      raf = requestAnimationFrame(passo);
    }
    itensMov.forEach(function (it) { it.c.style.transform = 'translate(' + it.x + 'px,' + it.y + 'px)'; });
    raf = requestAnimationFrame(passo);
  }

  /* Evita que as respostas passem uma por cima da outra: elas "batem" e desviam. */
  function colisoes() {
    for (var i = 0; i < itensMov.length; i++) {
      for (var j = i + 1; j < itensMov.length; j++) {
        var a = itensMov[i], b = itensMov[j];
        var ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        var oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox > 0 && oy > 0) {
          if (ox < oy) {
            var dx = a.x < b.x ? -1 : 1;
            if (!a.parado) { a.x += dx * ox / 2; a.vx = dx * Math.abs(a.vx); }
            if (!b.parado) { b.x -= dx * ox / 2; b.vx = -dx * Math.abs(b.vx); }
          } else {
            var dy = a.y < b.y ? -1 : 1;
            if (!a.parado) { a.y += dy * oy / 2; a.vy = dy * Math.abs(a.vy); }
            if (!b.parado) { b.y -= dy * oy / 2; b.vy = -dy * Math.abs(b.vy); }
          }
        }
      }
    }
  }

  function pararMovimento() {
    if (raf) { cancelAnimationFrame(raf); }
    raf = 0; itensMov = []; pausado = false;
  }

  Jogo.alternarPausa = function () {
    pausado = !pausado;
    $('btn-pausa').textContent = pausado ? '▶ Continuar o movimento' : '⏸ Parar o movimento';
  };

  /* ------------------------------------------------------------ resposta */
  function responder(op, el) {
    var a = estado && estado.atual;
    if (!a || a.resolvida) { return; }
    if (op.correta) { acertou(op, el); } else { errou(op, el); }
  }

  function acertou(op, el) {
    var a = estado.atual, q = a.q;
    a.resolvida = true;
    pararMovimento();
    $('btn-pausa').hidden = true;

    var ganho;
    if (a.secreta) {
      ganho = a.errosQ === 0 ? 100 : 50;
    } else {
      var base = Math.max(25, 100 - 25 * a.errosQ);
      ganho = Math.round(base * estado.cfg.multiplicador);
      if (a.errosQ === 0) { estado.acertosPrimeira++; }
      estado.respondidas.push(q.id);
    }
    estado.pontos += ganho;
    atualizarPontos();
    UI.flutuar('+' + ganho, $('pontos'));

    Array.prototype.forEach.call(document.querySelectorAll('#area-resposta .opcao'), function (c) {
      c.disabled = true;
      c.classList.remove('brilho');
      if (c === el) { c.classList.add('certa'); }
      else if (!c.classList.contains('errada')) { c.classList.add('apagada'); }
    });
    UI.confete();

    if (a.secreta) { mostrarRecompensa(ganho); return; }

    var nome = nomeCurto(), msg, pose;
    if (a.errosQ === 0) {
      // Acertou de primeira: o Julio finge que tinha errado, elogia e incentiva.
      msg = q.julioErrou + ' Mas você acertou de primeira' + nome + '! Parabéns! ' + q.explicacao;
      pose = 'errando';
    } else {
      msg = 'Isso mesmo' + nome + '! Você conseguiu! ' + q.explicacao + ' Continue assim!';
      pose = 'comemorando';
    }
    UI.fala(msg, pose);
    mostrarProxima();
  }

  function errou(op, el) {
    var a = estado.atual, q = a.q;
    a.errosQ++;
    estado.erros++;
    el.classList.add('errada', 'balanca');
    el.disabled = true;
    el.setAttribute('aria-disabled', 'true');
    setTimeout(function () { el.classList.remove('balanca'); }, 500);
    if (a.mecanica === 'arrastar' && !a.secreta) { el.style.transform = ''; }
    if (a.mecanica === 'movimento') {
      itensMov.forEach(function (it) { if (it.c === el) { it.parado = true; } });
    }

    var msg, pose;
    if (a.secreta) {
      // Na fase secreta NÃO há dicas: o Julio só incentiva a pensar e tentar de novo.
      msg = sorteia(['Hum, não foi essa. Pense com calma e tente de novo!', 'Quase! Aqui dentro não tem dica, mas eu acredito em você!']);
      pose = 'pensando';
    } else {
      // Dicas cada vez mais claras. No Médio e no Difícil a 1ª dica só vem no 2º erro.
      var i = a.errosQ - estado.cfg.dicasDesde;
      if (i < 0) {
        msg = sorteia(ENCORAJAR);
        pose = 'pensando';
      } else {
        msg = sorteia(ABERTURA_DICA) + ' ' + q.dicas[Math.min(i, q.dicas.length - 1)];
        pose = 'dica';
      }
      // Depois de 3 erros a resposta certa ganha um brilhinho: ninguém fica preso.
      if (a.errosQ >= 3) {
        Array.prototype.forEach.call(document.querySelectorAll('#area-resposta .opcao'), function (c) {
          if (c._op && c._op.correta) { c.classList.add('brilho'); }
        });
      }
    }
    UI.fala(msg, pose);
  }

  function mostrarProxima() {
    var a = estado.atual;
    var ultima = estado.idx >= estado.fila.length - 1;
    var b = $('btn-proxima');
    b.hidden = false;
    if (!a.secreta && estado.secretaPendente && !estado.secretaFeita) { b.textContent = 'Entrar na passagem secreta ✨'; }
    else if (ultima) { b.textContent = 'Ver meu resultado'; }
    else { b.textContent = a.secreta ? 'Voltar para a aventura' : 'Próxima pergunta'; }
    try { b.focus(); } catch (e) { /* ignora */ }
  }

  Jogo.avancar = function () {
    if (!estado) { return; }
    var a = estado.atual;
    if (a && !a.secreta && estado.secretaPendente && !estado.secretaFeita) { iniciarSecreta(); return; }
    estado.idx++;
    if (estado.idx >= estado.fila.length) { fim(); } else { mostrarPergunta(); }
  };

  /* --------------------------------------------------------- fase secreta */
  function mostrarSegredo() {
    var b = $('segredo');
    b.hidden = true;
    // Só aparece a partir da 2ª pergunta, uma vez por partida.
    if (estado.idx < 1 || estado.secretaFeita || estado.secretaEncontrada) { return; }
    if (!secretasDoNivel(estado.nivelId).length) { return; } // sem perguntas secretas, sem vagalume
    var s = sorteia(ESCONDERIJOS);
    b.style.left = s.x;
    b.style.top = s.y;
    b.hidden = false;
  }

  Jogo.encontrouSegredo = function () {
    if (!estado || estado.secretaEncontrada) { return; }
    estado.secretaEncontrada = true;
    estado.secretaPendente = true;
    $('segredo').hidden = true;
    estado.pontos += 50;
    atualizarPontos();
    UI.flutuar('+50', $('pontos'));
    UI.confete();
    var a = estado.atual;
    UI.fala(a.resolvida
      ? 'Uau, você achou o vagalume dourado! Aperte o botão para entrar na passagem secreta!'
      : 'Uau, você achou o vagalume dourado! Termine esta pergunta e eu abro a passagem secreta!', 'surpreso');
    if (a.resolvida) { mostrarProxima(); }
  };

  function iniciarSecreta() {
    estado.secretaFeita = true;
    estado.secretaPendente = false;
    // Pergunta exclusiva da fase secreta (nunca uma das perguntas normais) e SEM dicas.
    var q = escolherSecreta();
    if (!q) { Jogo.avancar(); return; } // sem perguntas secretas: segue a aventura
    estado.atual = { q: q, mecanica: 'clicar', errosQ: 0, resolvida: false, secreta: true, taps: 0, opcoes: [] };

    trocarCenario('secreta');
    $('chip-nivel').textContent = 'Fase secreta';
    $('segredo').hidden = true;
    prepararCartao();
    desenharQuestao(q, 'clicar');
    var escrito = 'Você achou a passagem secreta! Aqui dentro as perguntas são bônus e não têm dicas. Vamos ver se você sabe? ' + q.falar;
    UI.fala(escrito, 'surpreso', { falar: escrito + ' ' + frasesOpcoes(estado.atual.opcoes) });
  }

  function mostrarRecompensa(ganho) {
    var q = estado.atual.q;
    var medalha = UI.icone('medalha-1', 'selo-img');
    var r = UI.el('div', { classe: 'recompensa', role: 'status' }, [
      UI.el('span', { classe: 'selo', 'aria-hidden': 'true' }, medalha ? [medalha] : ['★']),
      UI.el('div', {}, [
        UI.el('strong', { texto: 'Explorador secreto! +' + ganho + ' pontos' }),
        UI.el('p', { texto: q.explicacao }),
        UI.el('p', { texto: 'Curiosidade do Julio: ' + q.curiosidade })
      ])
    ]);
    $('cartao').insertBefore(r, $('acoes'));
    UI.fala('Tesouro encontrado! ' + q.explicacao + ' Você ganhou ' + ganho + ' pontos extras. Curiosidade do Julio: ' + q.curiosidade, 'comemorando');
    mostrarProxima();
  }

  /* ---------------------------------------------------------- ouvir de novo */
  Jogo.ouvirDeNovo = function () {
    if (!estado || !estado.atual) { return; }
    var a = estado.atual;
    Voz.falar(a.q.falar + ' ' + frasesOpcoes(a.opcoes));
  };

  /* ------------------------------------------------------------ tela final */
  function fim() {
    pararMovimento();
    var total = estado.fila.length;
    var pct = estado.acertosPrimeira / total;
    var estrelas = pct >= 0.8 ? 3 : (pct >= 0.5 ? 2 : 1);

    if (!estado.idPartida) {
      var al = estado.aluno || {};
      estado.idPartida = Armazenamento.salvarPartida({
        alunoNome: al.nome || '', ano: al.ano || '', escola: al.escola || '', professor: al.professor || '',
        dificuldade: estado.nivelId, pontos: estado.pontos, acertos: estado.acertosPrimeira,
        erros: estado.erros, faseSecretaEncontrada: estado.secretaEncontrada,
        data: new Date().toISOString(), totalPerguntas: total
      });
    }

    UI.mostrarTela('tela-fim');
    $('fim-pontos').textContent = estado.pontos;
    $('fim-acertos').textContent = estado.acertosPrimeira + ' de ' + total;
    $('fim-erros').textContent = estado.erros;
    $('fim-secreta').textContent = estado.secretaEncontrada ? 'Achou o vagalume! ✨' : 'Ainda escondida';
    var est = $('fim-estrelas');
    UI.limpar(est);
    for (var i = 0; i < 3; i++) {
      var ic = UI.icone(i < estrelas ? 'estrela' : 'estrela-vazia', 'estrela-img');
      est.appendChild(ic || UI.el('span', { classe: 'estrela' + (i < estrelas ? ' cheia' : ''), texto: i < estrelas ? '★' : '☆', 'aria-hidden': 'true' }));
    }
    est.setAttribute('role', 'img');
    est.setAttribute('aria-label', estrelas + ' de 3 estrelas');

    // Se pulou o cadastro no começo, oferece de novo aqui.
    var semNome = !(estado.aluno && estado.aluno.nome);
    $('form-registro').hidden = !semNome;
    $('fim-salvo').hidden = true;

    var nome = nomeCurto();
    var fala = estrelas === 3 ? 'Uau' + nome + '! Você foi incrível! Acertou quase tudo de primeira!'
      : estrelas === 2 ? 'Muito bem' + nome + '! Você está aprendendo rápido!'
      : 'Parabéns' + nome + ' por não desistir! Errar faz parte de aprender. Vamos jogar de novo?';
    UI.fala(fala + ' Você fez ' + estado.pontos + ' pontos.', estrelas === 1 ? 'feliz' : 'comemorando');
    UI.confete();
  }

  /* Cadastro feito no fim do jogo (quando foi pulado no começo). */
  Jogo.registrarDepois = function (dados) {
    if (!estado) { return; }
    estado.aluno = dados;
    Armazenamento.atualizarPartida(estado.idPartida, {
      alunoNome: dados.nome || '', ano: dados.ano || '', escola: dados.escola || '', professor: dados.professor || ''
    });
  };

  Jogo.sair = function () {
    pararMovimento();
    Voz.parar();
    estado = null;
  };

  g.Jogo = Jogo;
})(window);

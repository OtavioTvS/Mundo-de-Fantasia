/* ==========================================================================
   ui.js — Ajudantes de tela (criar elementos, trocar de tela, Julio, balão)
   --------------------------------------------------------------------------
   IMAGENS: com UI.config.usarImagens = true o jogo usa os SVGs de assets/images/.
   Se algum arquivo faltar, aparece a COR CHAPADA no lugar (e o Julio feito em CSS),
   então nada quebra. Para voltar à versão só com cores, troque para false.
   ========================================================================== */
(function (g) {
  'use strict';

  var UI = {};

  UI.config = {
    usarImagens: true,               // true = usa as imagens | false = só cores chapadas
    pastaImagens: 'assets/images/'
  };

  /* Mapa "caminho da imagem" -> cor chapada (vem de data/questions.json > placeholders). */
  UI.coresPlaceholder = {};

  /* Cria um elemento: UI.el('div', { classe:'x', texto:'oi', onclick:fn }, [filhos]) */
  UI.el = function (tag, props, filhos) {
    var e = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      var v = props[k];
      if (k === 'classe') { e.className = v; }
      else if (k === 'texto') { e.textContent = v; }
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') { e.addEventListener(k.slice(2), v); }
      else { e.setAttribute(k, v); }
    });
    (filhos || []).forEach(function (f) {
      e.appendChild(typeof f === 'string' ? document.createTextNode(f) : f);
    });
    return e;
  };

  UI.limpar = function (e) { while (e && e.firstChild) { e.removeChild(e.firstChild); } };

  UI.$ = function (id) { return document.getElementById(id); };

  /* Mostra só uma tela. Também cala a voz (não acumular falas ao trocar de tela). */
  UI.mostrarTela = function (id) {
    Voz.parar();
    Array.prototype.forEach.call(document.querySelectorAll('.tela'), function (t) {
      var ativa = t.id === id;
      t.hidden = !ativa;
      t.classList.toggle('ativa', ativa);
    });
    g.scrollTo(0, 0);
  };

  /* ---------- Julio (feito só com CSS por enquanto) ---------- */
  var POSES = ['feliz', 'pensando', 'errando', 'comemorando', 'dica', 'surpreso', 'oi'];
  UI.poses = POSES;

  UI.montarJulios = function () {
    Array.prototype.forEach.call(document.querySelectorAll('.julio-slot'), function (slot) {
      if (slot.firstChild) { return; }
      var julio = UI.el('div', { classe: 'julio', 'data-pose': 'feliz', 'aria-hidden': 'true' }, [
        UI.el('span', { classe: 'j-chifre e' }),
        UI.el('span', { classe: 'j-chifre d' }),
        UI.el('span', { classe: 'j-corpo' }, [
          UI.el('span', { classe: 'j-barriga' }),
          UI.el('span', { classe: 'j-olho e' }),
          UI.el('span', { classe: 'j-olho d' }),
          UI.el('span', { classe: 'j-boca' })
        ]),
        UI.el('span', { classe: 'j-braco e' }),
        UI.el('span', { classe: 'j-braco d' }),
        UI.el('span', { classe: 'j-lampada' })
      ]);
      slot.appendChild(julio);
      // Com imagens: o Julio desenhado (assets/images/julio/julio-<pose>.svg). O de CSS fica de plano B.
      if (UI.config.usarImagens) {
        slot.classList.add('usa-img');
        var img = UI.el('img', { classe: 'julio-img', alt: '', decoding: 'async' });
        img.addEventListener('error', function () { slot.classList.add('sem-imagem'); });
        img.src = caminhoJulio('feliz');
        slot.appendChild(img);
      }
    });
  };

  function caminhoJulio(pose) { return UI.config.pastaImagens + 'julio/julio-' + pose + '.svg'; }

  UI.julioPose = function (pose) {
    if (POSES.indexOf(pose) < 0) { pose = 'feliz'; }
    Array.prototype.forEach.call(document.querySelectorAll('.julio'), function (j) {
      j.setAttribute('data-pose', pose);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.julio-img'), function (img) {
      var novo = caminhoJulio(pose);
      if (img.getAttribute('data-pose') !== pose) { img.setAttribute('data-pose', pose); img.src = novo; }
    });
  };

  /* Ícone pequeno (assets/images/icones/<nome>.svg). Devolve null se as imagens estiverem desligadas. */
  UI.icone = function (nome, classe) {
    if (!UI.config.usarImagens) { return null; }
    var i = new Image();
    i.alt = '';
    i.decoding = 'async';
    i.className = 'icone ' + (classe || '');
    i.src = UI.config.pastaImagens + 'icones/' + nome + '.svg';
    return i;
  };

  /* ---------- Balão do Julio: tudo que ele fala também aparece escrito ---------- */
  /* opcoes: { falar: 'texto para a voz, se for diferente do escrito', voz: false (só escrever) } */
  UI.fala = function (texto, pose, opcoes) {
    opcoes = opcoes || {};
    var alvo = document.querySelector('.tela.ativa .balao-texto');
    if (alvo) { alvo.textContent = texto; }
    if (pose) { UI.julioPose(pose); }
    if (opcoes.voz !== false) { Voz.falar(opcoes.falar || texto, { aoTerminar: opcoes.aoTerminar }); }
  };

  /* ---------- Mídia: imagem de verdade OU cor chapada ---------- */
  function bloco(caminho, classe) {
    var d = document.createElement('span');
    d.className = 'midia bloco ' + (classe || '');
    d.style.backgroundColor = UI.coresPlaceholder[caminho] || '#C9D6EA';
    d.setAttribute('aria-hidden', 'true');
    return d;
  }

  UI.midia = function (caminho, classe) {
    if (!UI.config.usarImagens) { return bloco(caminho, classe); }
    var img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.className = 'midia ' + (classe || '');
    img.onerror = function () { if (img.parentNode) { img.parentNode.replaceChild(bloco(caminho, classe), img); } };
    img.src = UI.config.pastaImagens + caminho;
    return img;
  };

  /* Desenho feito com formas simples de CSS (bolinhas, quadrados...), definido no JSON em "visual". */
  UI.visual = function (formas) {
    var caixa = UI.el('div', { classe: 'visual', 'aria-hidden': 'true' });
    formas.forEach(function (f) {
      var s = UI.el('span', { classe: 'forma ' + f.forma });
      s.style.width = f.tam + 'px';
      s.style.height = f.tam + 'px';
      if (f.cor) { s.style.backgroundColor = f.cor; }
      caixa.appendChild(s);
    });
    return caixa;
  };

  /* Pré-carrega as imagens da fase (só faz algo quando usarImagens = true). */
  UI.preCarregar = function (caminhos) {
    if (!UI.config.usarImagens) { return Promise.resolve(); }
    var tarefas = caminhos.map(function (c) {
      return new Promise(function (ok) {
        var i = new Image();
        i.onload = i.onerror = function () { ok(); };
        i.src = UI.config.pastaImagens + c;
      });
    });
    var limite = new Promise(function (ok) { setTimeout(ok, 4000); }); // não trava se a internet estiver lenta
    return Promise.race([Promise.all(tarefas), limite]);
  };

  /* "+100" subindo e sumindo */
  UI.flutuar = function (texto, referencia) {
    var r = (referencia || document.body).getBoundingClientRect();
    var e = UI.el('div', { classe: 'flutuante-pontos', texto: texto, 'aria-hidden': 'true' });
    e.style.left = (r.left + r.width / 2) + 'px';
    e.style.top = (r.top + r.height / 2) + 'px';
    document.body.appendChild(e);
    setTimeout(function () { if (e.parentNode) { e.parentNode.removeChild(e); } }, 1400);
  };

  /* Chuva de confete de cores chapadas */
  UI.confete = function () {
    var cores = ['#FFD54A', '#F06465', '#3B82F6', '#35B76B', '#8E6CF2', '#FF9FB5'];
    var caixa = UI.el('div', { classe: 'confete', 'aria-hidden': 'true' });
    for (var i = 0; i < 28; i++) {
      var p = UI.el('i');
      p.style.left = Math.round(Math.random() * 100) + '%';
      p.style.background = cores[i % cores.length];
      p.style.animationDelay = (Math.random() * 0.4).toFixed(2) + 's';
      p.style.animationDuration = (1.2 + Math.random() * 1).toFixed(2) + 's';
      caixa.appendChild(p);
    }
    document.body.appendChild(caixa);
    setTimeout(function () { if (caixa.parentNode) { caixa.parentNode.removeChild(caixa); } }, 2600);
  };

  UI.embaralhar = function (lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  UI.reduzirMovimento = function () {
    return !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };

  g.UI = UI;
})(window);

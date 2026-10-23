/* ==========================================================================
   voz.js — Voz do Julio (Web Speech API / SpeechSynthesis)
   --------------------------------------------------------------------------
   Módulo ISOLADO. O resto do jogo só usa:
     Voz.falar(texto, { aoTerminar: fn })   -> lê o texto em voz alta
     Voz.parar()                            -> cala a voz na hora
     Voz.ligarDesligar()                    -> liga/desliga o som (devolve true se ligou)
     Voz.estaLigada(), Voz.disponivel(), Voz.ativar(), Voz.aoMudar(fn)

   Para trocar por áudios gravados no futuro, basta reescrever o corpo dessas
   funções (ex.: tocar "audio/<id>.mp3"); o restante do jogo não muda.
   ========================================================================== */
(function (g) {
  'use strict';

  var sintese = ('speechSynthesis' in g && 'SpeechSynthesisUtterance' in g) ? g.speechSynthesis : null;
  var ligada = true;          // preferência do som (guardada no aparelho)
  var voz = null;             // voz escolhida (pt-BR de preferência)
  var listaCarregada = false; // true quando o navegador já entregou a lista de vozes
  var token = 0;              // identifica a fala atual (ignora falas antigas)
  var atual = null;           // guarda a fala atual (evita o coletor de lixo do Chrome apagá-la)
  var ouvintes = [];

  try { if (g.localStorage.getItem('mf_voz') === '0') { ligada = false; } } catch (e) { /* sem localStorage: segue */ }

  /* As vozes carregam de forma assíncrona: só escolhemos quando a lista existir. */
  function escolherVoz() {
    if (!sintese) { return; }
    var lista = sintese.getVoices() || [];
    if (!lista.length) { return; }
    listaCarregada = true;
    var norm = function (v) { return String(v.lang || '').replace('_', '-').toLowerCase(); };
    var ptBR = lista.filter(function (v) { return norm(v) === 'pt-br'; });
    var pt = lista.filter(function (v) { return norm(v).indexOf('pt') === 0; });
    voz = ptBR[0] || pt[0] || null; // 1º pt-BR; senão qualquer português; senão nenhuma
    avisar();
  }

  if (sintese) {
    escolherVoz();
    if (sintese.addEventListener) { sintese.addEventListener('voiceschanged', escolherVoz); }
    else { sintese.onvoiceschanged = escolherVoz; }
  }

  function avisar() { ouvintes.forEach(function (fn) { try { fn(); } catch (e) { /* ignora */ } }); }

  /* Há como falar? (existe a API e, se a lista já carregou, existe voz em português) */
  function disponivel() {
    if (!sintese) { return false; }
    if (listaCarregada && !voz) { return false; }
    return true;
  }

  /* Divide textos longos em frases curtas: o Chrome corta falas muito compridas. */
  function dividir(texto) {
    var limpo = String(texto).replace(/\s+/g, ' ').trim();
    var partes = limpo.match(/[^.!?…;:]+[.!?…;:]*/g) || [limpo];
    var saida = [];
    partes.forEach(function (p) {
      p = p.trim();
      while (p.length > 140) {
        var i = p.lastIndexOf(',', 140);
        if (i < 40) { i = p.lastIndexOf(' ', 140); }
        if (i < 1) { i = 140; }
        saida.push(p.slice(0, i + 1).trim());
        p = p.slice(i + 1).trim();
      }
      if (p) { saida.push(p); }
    });
    return saida;
  }

  function falar(texto, opcoes) {
    opcoes = opcoes || {};
    if (!texto || !ligada || !disponivel()) {
      if (opcoes.aoTerminar) { setTimeout(opcoes.aoTerminar, 0); }
      return;
    }
    var meu = ++token;
    var frases = dividir(texto);
    var ocupado = sintese.speaking || sintese.pending;
    sintese.cancel(); // cancela a fala anterior para não acumular

    function falarFrase(i) {
      if (meu !== token) { return; } // chegou uma fala mais nova: para por aqui
      if (i >= frases.length) { if (opcoes.aoTerminar) { opcoes.aoTerminar(); } return; }
      var u = new g.SpeechSynthesisUtterance(frases[i]);
      u.lang = 'pt-BR';
      if (voz) { u.voice = voz; }
      u.rate = 0.9;   // um pouco mais devagar
      u.pitch = 1.1;  // um pouco mais agudo (voz de mascote)
      u.volume = 1;
      u.onend = function () { falarFrase(i + 1); };
      u.onerror = function () { falarFrase(i + 1); };
      atual = u;
      sintese.speak(u);
    }

    // Logo depois de cancel() alguns navegadores engolem a próxima fala: espera um tiquinho.
    if (ocupado) { setTimeout(function () { falarFrase(0); }, 80); }
    else { falarFrase(0); }
  }

  function parar() {
    token++;
    if (sintese) { sintese.cancel(); }
  }

  /* iOS/Safari só liberam a voz depois de um toque: chamamos isto no botão "Jogar". */
  function ativar() {
    if (!sintese) { return; }
    try {
      var u = new g.SpeechSynthesisUtterance(' ');
      u.volume = 0;
      sintese.speak(u);
    } catch (e) { /* ignora */ }
  }

  function ligarDesligar() {
    ligada = !ligada;
    try { g.localStorage.setItem('mf_voz', ligada ? '1' : '0'); } catch (e) { /* ignora */ }
    if (!ligada) { parar(); }
    avisar();
    return ligada;
  }

  g.Voz = {
    falar: falar,
    parar: parar,
    ligarDesligar: ligarDesligar,
    ativar: ativar,
    estaLigada: function () { return ligada; },
    disponivel: disponivel,
    aoMudar: function (fn) { ouvintes.push(fn); }
  };
})(window);

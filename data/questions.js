/* GERADO a partir de questions.json — plano B para abrir o jogo direto do computador (file://).
   Se você editar questions.json, gere este arquivo de novo (comando no README). */
window.QUESTIONS_DATA = {
 "versao": 1,
 "_comoEditar": "Cada pergunta tem: id, nivel (facil|medio|dificil), tema, texto (na tela), falar (lido pelo Julio), intro (historinha antes da pergunta), opcoes, dicas (3, cada vez mais claras), julioErrou (acertou de primeira), explicacao, curiosidade. As PERGUNTAS SECRETAS ficam em 'secretas': são perguntas exclusivas da fase secreta, NÃO repetem as normais e NÃO têm dicas. Veja o README.md.",
 "niveis": {
  "facil": {
   "titulo": "Fácil",
   "descricao": "O Julio ensina como jogar, passo a passo.",
   "velocidade": 40,
   "multiplicador": 1,
   "dicasDesde": 1,
   "tutorial": true,
   "ordemInicial": [
    "f-grama",
    "f-fazenda",
    "f-ceu"
   ]
  },
  "medio": {
   "titulo": "Médio",
   "descricao": "Mais respostas, mais movimento e menos dicas.",
   "velocidade": 75,
   "multiplicador": 1.5,
   "dicasDesde": 2,
   "tutorial": false,
   "ordemInicial": []
  },
  "dificil": {
   "titulo": "Difícil",
   "descricao": "Respostas rápidas e perguntas bem desafiadoras.",
   "velocidade": 115,
   "multiplicador": 2,
   "dicasDesde": 2,
   "tutorial": false,
   "ordemInicial": []
  }
 },
 "placeholders": {
  "itens/cor-verde.svg": "#2FB34E",
  "itens/cor-azul.svg": "#2F7BEA",
  "itens/cor-vermelho.svg": "#E5383B",
  "itens/cor-roxo.svg": "#8E44C8",
  "itens/cor-laranja.svg": "#FF9A1F",
  "itens/cor-amarelo.svg": "#FFD93B",
  "itens/cor-rosa.svg": "#FF8FB8",
  "itens/cor-azul-marinho.svg": "#14285E",
  "itens/cor-verde-limao.svg": "#A8E02B",
  "itens/vaca.svg": "#F4A259",
  "itens/tubarao.svg": "#F4A259",
  "itens/leao.svg": "#F4A259",
  "itens/elefante.svg": "#F4A259",
  "itens/rato.svg": "#F4A259",
  "itens/camelo.svg": "#F4A259",
  "itens/golfinho.svg": "#F4A259",
  "itens/pinguim.svg": "#F4A259",
  "itens/baleia.svg": "#F4A259",
  "itens/passarinho.svg": "#FFD54A",
  "itens/urso-polar.svg": "#F4A259",
  "itens/flamingo-sombra.svg": "#9AA5B8",
  "itens/celeiro.svg": "#E04F4F",
  "itens/deserto.svg": "#F2D08A",
  "itens/fundo-mar.svg": "#4FA3E0",
  "itens/ninho-arvore.svg": "#7BC67B",
  "itens/debaixo-terra.svg": "#9A6B43",
  "itens/floresta-tropical.svg": "#2E9E6B",
  "itens/gelo.svg": "#CFE8F7",
  "itens/quintal.svg": "#7BC67B",
  "itens/floresta.svg": "#3E8E5A",
  "itens/bola.svg": "#F5F5F5",
  "itens/folha-papel.svg": "#FFFFFF",
  "itens/caneta.svg": "#2F7BEA",
  "itens/tijolo.svg": "#C8553D",
  "itens/aviao.svg": "#DDE6F2",
  "itens/pessoa-andando.svg": "#F2B48C",
  "itens/grama-contorno.svg": "#FFFFFF",
  "icones/bau-fechado.svg": "#B9772F",
  "itens/bolinha-gude.svg": "#2FB6A6",
  "itens/semaforo.svg": "#3B4558",
  "itens/quad-p.svg": "#3B82F6",
  "itens/quad-m.svg": "#3B82F6",
  "itens/quad-g.svg": "#3B82F6"
 },
 "perguntas": [
  {
   "id": "f-grama",
   "nivel": "facil",
   "tema": "cores",
   "texto": "Qual é a cor da grama?",
   "falar": "Qual é a cor da grama?",
   "intro": "O Julio foi passear no campo encantado e viu um tapete de grama bem macio.",
   "imagens": [
    "itens/grama-contorno.svg"
   ],
   "descricao": "Desenho de um tufo de grama para pintar",
   "opcoes": [
    {
     "id": "a",
     "texto": "Verde",
     "falar": "Verde",
     "imagens": [
      "itens/cor-verde.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Vermelho",
     "falar": "Vermelho",
     "imagens": [
      "itens/cor-vermelho.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Azul",
     "falar": "Azul",
     "imagens": [
      "itens/cor-azul.svg"
     ]
    }
   ],
   "dicas": [
    "Olhe para o chão do parque, cheio de grama. Que cor você vê?",
    "Pense nas folhinhas das plantas. A grama tem a mesma cor delas!",
    "Vermelho é a cor do tomate e azul é a cor do céu. Escolha a cor das folhinhas!"
   ],
   "julioErrou": "Eu tinha dito que a grama era vermelha! Ai, ai, preciso estudar mais!",
   "explicacao": "A grama é verde, da cor das folhinhas das plantas.",
   "curiosidade": "As plantas têm uma tintinha verde natural que ajuda a usar a luz do sol para crescer."
  },
  {
   "id": "f-ceu",
   "nivel": "facil",
   "tema": "cores",
   "texto": "Qual é a cor do céu em um dia de sol bem bonito?",
   "falar": "Qual é a cor do céu em um dia de sol bem bonito?",
   "intro": "O Julio deitou na grama e olhou para cima.",
   "opcoes": [
    {
     "id": "a",
     "texto": "Vermelho",
     "falar": "Vermelho",
     "imagens": [
      "itens/cor-vermelho.svg"
     ]
    },
    {
     "id": "b",
     "texto": "Azul",
     "falar": "Azul",
     "imagens": [
      "itens/cor-azul.svg"
     ],
     "correta": true
    },
    {
     "id": "c",
     "texto": "Roxo",
     "falar": "Roxo",
     "imagens": [
      "itens/cor-roxo.svg"
     ]
    }
   ],
   "dicas": [
    "Deite na grama e olhe para cima, num dia sem chuva.",
    "O céu tem a mesma cor do mar visto de longe, num dia de sol.",
    "Não é cor de morango e nem de uva. É a mesma cor do mar!"
   ],
   "julioErrou": "Eu tinha dito que o céu era roxo! Será que eu estava com sono? Preciso estudar mais!",
   "explicacao": "Em um dia de sol, o céu é azul.",
   "curiosidade": "O céu parece azul porque a luz do sol se espalha pelo ar, e o azul se espalha mais que as outras cores."
  },
  {
   "id": "f-fazenda",
   "nivel": "facil",
   "tema": "animais",
   "texto": "Qual animal vive na fazenda?",
   "falar": "Qual animal vive na fazenda?",
   "intro": "O Julio foi visitar uma fazenda com um celeiro bem grande.",
   "zona": {
    "rotulo": "Fazenda",
    "imagem": "itens/celeiro.svg"
   },
   "opcoes": [
    {
     "id": "a",
     "texto": "Vaca",
     "falar": "Vaca",
     "imagens": [
      "itens/vaca.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Tubarão",
     "falar": "Tubarão",
     "imagens": [
      "itens/tubarao.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Leão",
     "falar": "Leão",
     "imagens": [
      "itens/leao.svg"
     ]
    }
   ],
   "dicas": [
    "Pense em quem dá o leite que a gente toma.",
    "Esse animal faz muuu!",
    "O tubarão vive no mar e o leão vive na savana. Escolha o animal que faz muuu!"
   ],
   "julioErrou": "Eu tinha dito que o tubarão vivia na fazenda! Ele nem consegue sair da água! Preciso estudar mais!",
   "explicacao": "A vaca vive na fazenda. Ela dá leite.",
   "curiosidade": "As vacas passam muitas horas do dia comendo capim."
  },
  {
   "id": "f-passarinho",
   "nivel": "facil",
   "tema": "animais",
   "texto": "Onde o passarinho costuma construir a sua casa para cuidar dos ovos?",
   "falar": "Onde o passarinho costuma construir a sua casa para cuidar dos ovos?",
   "intro": "O Julio ouviu um passarinho cantando bem alto.",
   "imagens": [
    "itens/passarinho.svg"
   ],
   "descricao": "Um passarinho",
   "opcoes": [
    {
     "id": "a",
     "texto": "No fundo do mar",
     "falar": "No fundo do mar",
     "imagens": [
      "itens/fundo-mar.svg"
     ]
    },
    {
     "id": "b",
     "texto": "Em um ninho na árvore",
     "falar": "Em um ninho na árvore",
     "imagens": [
      "itens/ninho-arvore.svg"
     ],
     "correta": true
    },
    {
     "id": "c",
     "texto": "Debaixo da terra",
     "falar": "Debaixo da terra",
     "imagens": [
      "itens/debaixo-terra.svg"
     ]
    }
   ],
   "dicas": [
    "Os passarinhos têm asas e gostam de lugares altos.",
    "A casinha do passarinho é feita de gravetos e folhas, e fica nos galhos.",
    "Não é no mar e nem embaixo da terra. Olhe para o alto, onde ficam os galhos!"
   ],
   "julioErrou": "Eu tinha dito que o passarinho morava no fundo do mar! Glub, glub! Preciso estudar mais!",
   "explicacao": "O passarinho faz o ninho na árvore para cuidar dos ovinhos.",
   "curiosidade": "Alguns passarinhos usam gravetos, folhas e até pelinhos para fazer o ninho."
  },
  {
   "id": "f-bola",
   "nivel": "facil",
   "tema": "letras",
   "texto": "Qual é a primeira letra de BOLA?",
   "falar": "Qual é a primeira letra da palavra bola?",
   "intro": "O Julio encontrou uma bola nova e quer aprender a escrever o nome dela.",
   "imagens": [
    "itens/bola.svg"
   ],
   "descricao": "Uma bola de futebol",
   "palavra": "BOLA",
   "opcoes": [
    {
     "id": "a",
     "texto": "B",
     "falar": "bê",
     "correta": true
    },
    {
     "id": "b",
     "texto": "M",
     "falar": "ême"
    },
    {
     "id": "c",
     "texto": "P",
     "falar": "pê"
    }
   ],
   "dicas": [
    "Diga bola bem devagar: bo, la. Com que som ela começa?",
    "A primeira letra de bola faz o som bê, de boca fechadinha: bê, bê, bê.",
    "A letra tem uma linha reta e duas barriguinhas. Ela faz o mesmo som do começo de bola: bê!"
   ],
   "julioErrou": "Eu tinha dito que bola começava com a letra pê! Preciso estudar mais!",
   "explicacao": "Bola começa com a letra B.",
   "curiosidade": "A palavra bola começa com o mesmo som de bala, bebê e barco."
  },
  {
   "id": "f-elefante",
   "nivel": "facil",
   "tema": "grandezas",
   "texto": "Qual é maior?",
   "falar": "Qual é maior?",
   "intro": "O Julio encontrou um elefante e um ratinho conversando.",
   "opcoes": [
    {
     "id": "a",
     "texto": "Elefante",
     "falar": "Elefante",
     "imagens": [
      "itens/elefante.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Rato",
     "falar": "Rato",
     "imagens": [
      "itens/rato.svg"
     ]
    }
   ],
   "dicas": [
    "Pense em qual animal precisa de uma porta bem grande para passar.",
    "Um deles cabe na palma da sua mão. O outro é enorme!",
    "O ratinho é bem pequenininho. O maior é o animal que tem tromba!"
   ],
   "julioErrou": "Eu tinha dito que o ratinho era maior que o elefante! Preciso estudar mais!",
   "explicacao": "O elefante é bem maior que o rato.",
   "curiosidade": "O elefante é o maior animal que vive em terra firme."
  },
  {
   "id": "f-bolinha",
   "nivel": "facil",
   "tema": "grandezas",
   "texto": "Se você colocar uma bola de futebol e uma bolinha de gude lado a lado, qual é a MENOR?",
   "falar": "Se você colocar uma bola de futebol e uma bolinha de gude lado a lado, qual é a menor?",
   "intro": "O Julio guardou uma bola de futebol e uma bolinha de gude na mesma caixa.",
   "visual": [
    {
     "forma": "circulo",
     "tam": 110,
     "cor": "#FFFFFF"
    },
    {
     "forma": "circulo",
     "tam": 26,
     "cor": "#2F7BEA"
    }
   ],
   "imagens": [
    "itens/bola.svg",
    "itens/bolinha-gude.svg"
   ],
   "descricao": "Uma bola de futebol grande e uma bolinha de gude pequena, lado a lado",
   "opcoes": [
    {
     "id": "a",
     "texto": "A bola de futebol",
     "falar": "A bola de futebol"
    },
    {
     "id": "b",
     "texto": "A bolinha de gude",
     "falar": "A bolinha de gude",
     "correta": true
    },
    {
     "id": "c",
     "texto": "As duas são do mesmo tamanho",
     "falar": "As duas são do mesmo tamanho"
    }
   ],
   "dicas": [
    "Imagine as duas na sua mão. Uma delas cabe entre dois dedos.",
    "A bola de futebol precisa de duas mãos para segurar. A outra é bem pequenininha.",
    "Menor quer dizer pequenininha. A bolinha de gude é a que cabe entre os dedos!"
   ],
   "julioErrou": "Eu tinha dito que as duas eram do mesmo tamanho! Preciso estudar mais!",
   "explicacao": "A bolinha de gude é menor que a bola de futebol.",
   "curiosidade": "Muitas bolinhas de gude são feitas de vidro."
  },
  {
   "id": "m-mistura",
   "nivel": "medio",
   "tema": "cores",
   "texto": "Se misturarmos azul e amarelo, que cor aparece?",
   "falar": "Se misturarmos azul e amarelo, que cor aparece?",
   "intro": "O Julio ganhou tintas mágicas de presente. Ele pingou uma gota azul e uma gota amarela na mesma folha.",
   "visual": [
    {
     "forma": "circulo",
     "tam": 80,
     "cor": "#2F7BEA"
    },
    {
     "forma": "circulo",
     "tam": 80,
     "cor": "#FFD93B"
    }
   ],
   "descricao": "Duas gotas de tinta: uma azul e uma amarela",
   "opcoes": [
    {
     "id": "a",
     "texto": "Verde",
     "falar": "Verde",
     "imagens": [
      "itens/cor-verde.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Laranja",
     "falar": "Laranja",
     "imagens": [
      "itens/cor-laranja.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Roxo",
     "falar": "Roxo",
     "imagens": [
      "itens/cor-roxo.svg"
     ]
    },
    {
     "id": "d",
     "texto": "Vermelho",
     "falar": "Vermelho",
     "imagens": [
      "itens/cor-vermelho.svg"
     ],
     "extra": true
    }
   ],
   "dicas": [
    "Pense na cor das folhas das árvores. Elas parecem ter um pouquinho de azul e um pouquinho de amarelo.",
    "O resultado é a cor da grama que o Julio viu no campo.",
    "Não é laranja, não é roxo e não é vermelho. É a cor da grama!"
   ],
   "julioErrou": "Eu tinha dito que azul e amarelo davam roxo! Preciso estudar mais!",
   "explicacao": "Azul mais amarelo dá verde.",
   "curiosidade": "Azul, amarelo e vermelho são chamadas de cores primárias. Com elas dá para fazer muitas outras cores!",
   "imagens": [
    "itens/cor-azul.svg",
    "itens/cor-amarelo.svg"
   ]
  },
  {
   "id": "m-semaforo",
   "nivel": "medio",
   "tema": "cores",
   "texto": "No semáforo de trânsito, qual cor avisa que o carro precisa PARAR?",
   "falar": "No semáforo de trânsito, qual cor avisa que o carro precisa parar?",
   "intro": "O Julio estava de carona e chegou em um cruzamento.",
   "visual": [
    {
     "forma": "circulo",
     "tam": 56,
     "cor": "#E5383B"
    },
    {
     "forma": "circulo",
     "tam": 56,
     "cor": "#FFD93B"
    },
    {
     "forma": "circulo",
     "tam": 56,
     "cor": "#2FB34E"
    }
   ],
   "descricao": "As três luzes de um semáforo",
   "opcoes": [
    {
     "id": "a",
     "texto": "Verde",
     "falar": "Verde",
     "imagens": [
      "itens/cor-verde.svg"
     ]
    },
    {
     "id": "b",
     "texto": "Amarelo",
     "falar": "Amarelo",
     "imagens": [
      "itens/cor-amarelo.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Vermelho",
     "falar": "Vermelho",
     "imagens": [
      "itens/cor-vermelho.svg"
     ],
     "correta": true
    }
   ],
   "dicas": [
    "Pense na hora de atravessar a rua com um adulto. Quando os carros esperam, o semáforo mostra uma cor bem forte.",
    "É a mesma cor do morango maduro.",
    "Verde é para seguir e amarelo é para ter atenção. Escolha a cor do morango!"
   ],
   "julioErrou": "Eu tinha dito que o carro parava no verde! Que confusão! Preciso estudar mais!",
   "explicacao": "No semáforo, a luz vermelha avisa que o carro precisa parar.",
   "curiosidade": "O vermelho é usado para mandar parar porque é fácil de ver de longe.",
   "imagens": [
    "itens/semaforo.svg"
   ]
  },
  {
   "id": "m-deserto",
   "nivel": "medio",
   "tema": "animais",
   "mecanicas": [
    "arrastar"
   ],
   "texto": "Qual animal vive no deserto?",
   "falar": "Qual animal vive no deserto? Arraste o animal certo até o deserto.",
   "intro": "O Julio pegou um tapete mágico e voou até um lugar bem quente, cheio de areia.",
   "zona": {
    "rotulo": "Deserto",
    "imagem": "itens/deserto.svg"
   },
   "opcoes": [
    {
     "id": "a",
     "texto": "Camelo",
     "falar": "Camelo",
     "imagens": [
      "itens/camelo.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Golfinho",
     "falar": "Golfinho",
     "imagens": [
      "itens/golfinho.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Pinguim",
     "falar": "Pinguim",
     "imagens": [
      "itens/pinguim.svg"
     ]
    },
    {
     "id": "d",
     "texto": "Urso-polar",
     "falar": "Urso polar",
     "imagens": [
      "itens/urso-polar.svg"
     ],
     "extra": true
    }
   ],
   "dicas": [
    "No deserto faz muito calor e tem pouca água. Qual animal aguenta isso?",
    "Esse animal tem corcovas nas costas, onde guarda gordurinha para passar muitos dias sem comer.",
    "O golfinho vive no mar, e o pinguim e o urso-polar vivem no frio. O animal com corcovas é o do deserto!"
   ],
   "julioErrou": "Eu tinha dito que o golfinho vivia no deserto! Ele ia ficar sem água! Preciso estudar mais!",
   "explicacao": "O camelo vive no deserto. Ele aguenta bastante calor.",
   "curiosidade": "O camelo consegue ficar muitos dias sem beber água."
  },
  {
   "id": "m-urso",
   "nivel": "medio",
   "tema": "animais",
   "texto": "O urso-polar tem uma capa de gordura e pelos bem grossos. Onde é a casa dele?",
   "falar": "O urso polar tem uma capa de gordura e pelos bem grossos. Onde é a casa dele?",
   "intro": "O Julio encontrou um livro de histórias sobre um urso branquinho.",
   "imagens": [
    "itens/urso-polar.svg"
   ],
   "descricao": "Um urso-polar",
   "opcoes": [
    {
     "id": "a",
     "texto": "Em uma floresta tropical bem quente",
     "falar": "Em uma floresta tropical bem quente",
     "imagens": [
      "itens/floresta-tropical.svg"
     ]
    },
    {
     "id": "b",
     "texto": "No polo norte, onde é tudo cheio de gelo e neve",
     "falar": "No polo norte, onde é tudo cheio de gelo e neve",
     "imagens": [
      "itens/gelo.svg"
     ],
     "correta": true
    },
    {
     "id": "c",
     "texto": "No quintal de casa",
     "falar": "No quintal de casa",
     "imagens": [
      "itens/quintal.svg"
     ]
    }
   ],
   "dicas": [
    "Gordura e pelos grossos servem para proteger do frio ou do calor?",
    "Quem usa um casaco bem grosso procura um lugar bem gelado, com neve.",
    "Floresta quente e quintal são lugares sem gelo. O urso-polar mora onde tudo é branquinho de neve!"
   ],
   "julioErrou": "Eu tinha dito que o urso-polar morava numa floresta quentinha! Ele ia derreter de calor! Preciso estudar mais!",
   "explicacao": "O urso-polar mora no polo norte, onde tem muito gelo e neve.",
   "curiosidade": "O urso-polar nada muito bem e é ótimo para caçar na água gelada."
  },
  {
   "id": "m-palavra",
   "nivel": "medio",
   "tema": "letras",
   "texto": "Qual palavra tem mais letras?",
   "falar": "Qual palavra tem mais letras?",
   "intro": "O Julio está aprendendo a contar as letrinhas das palavras.",
   "opcoes": [
    {
     "id": "a",
     "texto": "SOL",
     "falar": "sol"
    },
    {
     "id": "b",
     "texto": "ELEFANTE",
     "falar": "elefante",
     "correta": true
    },
    {
     "id": "c",
     "texto": "GATO",
     "falar": "gato",
     "extra": true
    }
   ],
   "dicas": [
    "Conte nos dedos: quantas letras tem cada palavra?",
    "Sol tem três letras e gato tem quatro. Agora conte as letras de elefante.",
    "Elefante é a palavra mais comprida de todas. Ela tem oito letras!"
   ],
   "julioErrou": "Eu tinha dito que a palavra sol era a mais comprida! Preciso estudar mais!",
   "explicacao": "Elefante tem oito letras. É a palavra com mais letras.",
   "curiosidade": "Quando a gente separa em pedacinhos, e, le, fan, te, a palavra elefante tem quatro sílabas."
  },
  {
   "id": "m-pesado",
   "nivel": "medio",
   "tema": "grandezas",
   "texto": "Imagine que você vai segurar esses objetos. Qual deles é o mais PESADO de todos?",
   "falar": "Imagine que você vai segurar esses objetos. Qual deles é o mais pesado de todos?",
   "intro": "O Julio está ajudando a arrumar o ateliê mágico.",
   "opcoes": [
    {
     "id": "a",
     "texto": "Uma folha de papel",
     "falar": "Uma folha de papel",
     "imagens": [
      "itens/folha-papel.svg"
     ]
    },
    {
     "id": "b",
     "texto": "Uma caneta azul",
     "falar": "Uma caneta azul",
     "imagens": [
      "itens/caneta.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Um tijolo de construção",
     "falar": "Um tijolo de construção",
     "imagens": [
      "itens/tijolo.svg"
     ],
     "correta": true
    }
   ],
   "dicas": [
    "Pesado quer dizer difícil de levantar. Qual deles você levantaria com dois dedinhos?",
    "A folha e a caneta são levinhas. Um dos objetos é usado para construir paredes.",
    "O tijolo é usado para construir casas e é bem duro e pesado!"
   ],
   "julioErrou": "Eu tinha dito que a folha de papel era a mais pesada! Preciso estudar mais!",
   "explicacao": "O tijolo é o mais pesado dos três.",
   "curiosidade": "Muitas casas são construídas com tijolos empilhados, um em cima do outro."
  },
  {
   "id": "d-sequencia",
   "nivel": "dificil",
   "tema": "cores",
   "texto": "Qual cor deveria aparecer depois?",
   "falar": "Veja o colar: azul, verde, azul, verde. Qual cor deveria aparecer depois?",
   "intro": "O Julio fez um colar mágico com bolinhas coloridas, mas faltou a última bolinha.",
   "visual": [
    {
     "forma": "circulo",
     "tam": 64,
     "cor": "#2F7BEA"
    },
    {
     "forma": "circulo",
     "tam": 64,
     "cor": "#2FB34E"
    },
    {
     "forma": "circulo",
     "tam": 64,
     "cor": "#2F7BEA"
    },
    {
     "forma": "circulo",
     "tam": 64,
     "cor": "#2FB34E"
    },
    {
     "forma": "vazio",
     "tam": 64
    }
   ],
   "descricao": "Colar de bolinhas: azul, verde, azul, verde e um espaço vazio",
   "opcoes": [
    {
     "id": "a",
     "texto": "Azul",
     "falar": "Azul",
     "imagens": [
      "itens/cor-azul.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Verde",
     "falar": "Verde",
     "imagens": [
      "itens/cor-verde.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Vermelho",
     "falar": "Vermelho",
     "imagens": [
      "itens/cor-vermelho.svg"
     ]
    },
    {
     "id": "d",
     "texto": "Amarelo",
     "falar": "Amarelo",
     "imagens": [
      "itens/cor-amarelo.svg"
     ],
     "extra": true
    }
   ],
   "dicas": [
    "Diga as cores em voz alta, uma depois da outra: azul, verde, azul, verde. Você percebe o padrão?",
    "As cores se repetem de duas em duas. A última que apareceu foi o verde.",
    "Depois do verde, a sequência volta para o começo! Qual foi a primeira cor do colar?"
   ],
   "julioErrou": "Eu tinha dito que depois vinha o vermelho! Mas o vermelho nem estava no colar! Preciso estudar mais!",
   "explicacao": "A sequência é azul, verde, azul, verde, azul. As cores se repetem.",
   "curiosidade": "Quando as cores ou as formas se repetem na mesma ordem, isso se chama padrão."
  },
  {
   "id": "d-roxo",
   "nivel": "dificil",
   "tema": "cores",
   "texto": "Qual destas cores é formada pela mistura de vermelho e azul?",
   "falar": "Qual destas cores é formada pela mistura de vermelho e azul?",
   "intro": "O Julio abriu a caixa de tintas e misturou uma gota vermelha com uma gota azul.",
   "visual": [
    {
     "forma": "circulo",
     "tam": 80,
     "cor": "#E5383B"
    },
    {
     "forma": "circulo",
     "tam": 80,
     "cor": "#2F7BEA"
    }
   ],
   "descricao": "Duas gotas de tinta: uma vermelha e uma azul",
   "opcoes": [
    {
     "id": "a",
     "texto": "Roxo",
     "falar": "Roxo",
     "imagens": [
      "itens/cor-roxo.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Verde",
     "falar": "Verde",
     "imagens": [
      "itens/cor-verde.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Laranja",
     "falar": "Laranja",
     "imagens": [
      "itens/cor-laranja.svg"
     ]
    },
    {
     "id": "d",
     "texto": "Amarelo",
     "falar": "Amarelo",
     "imagens": [
      "itens/cor-amarelo.svg"
     ],
     "extra": true
    }
   ],
   "dicas": [
    "Pense na cor da uva e da berinjela.",
    "Vermelho e azul juntos fazem a cor do suco de uva.",
    "Verde vem de azul com amarelo e laranja vem de vermelho com amarelo. Falta a cor da uva!"
   ],
   "julioErrou": "Eu tinha dito que vermelho com azul dava laranja! Preciso estudar mais!",
   "explicacao": "Vermelho mais azul dá roxo.",
   "curiosidade": "Antigamente a cor roxa era muito difícil de fazer e era usada por reis e rainhas.",
   "imagens": [
    "itens/cor-vermelho.svg",
    "itens/cor-azul.svg"
   ]
  },
  {
   "id": "d-flamingo",
   "nivel": "dificil",
   "tema": "cores",
   "texto": "Qual é a cor dos flamingos, aquelas aves elegantes que adoram ficar em uma perna só?",
   "falar": "Qual é a cor dos flamingos, aquelas aves elegantes que adoram ficar em uma perna só?",
   "intro": "O Julio chegou em um lago e viu uma sombra de ave descansando em uma perna só.",
   "imagens": [
    "itens/flamingo-sombra.svg"
   ],
   "descricao": "A sombra de um flamingo em uma perna só",
   "opcoes": [
    {
     "id": "a",
     "texto": "Cor-de-rosa",
     "falar": "Cor de rosa",
     "imagens": [
      "itens/cor-rosa.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Azul-marinho",
     "falar": "Azul marinho",
     "imagens": [
      "itens/cor-azul-marinho.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Verde-limão",
     "falar": "Verde limão",
     "imagens": [
      "itens/cor-verde-limao.svg"
     ]
    }
   ],
   "dicas": [
    "Pense em um algodão-doce. Os flamingos têm uma cor parecida!",
    "Não é uma cor escura como a noite e nem uma cor de limão. É uma cor suave e bonitinha.",
    "Misture vermelho com branco e você consegue a cor dos flamingos: cor de rosa!"
   ],
   "julioErrou": "Eu tinha dito que os flamingos eram verde-limão! Eles iam parecer uma salada de frutas! Preciso estudar mais!",
   "explicacao": "Os flamingos são cor-de-rosa.",
   "curiosidade": "Os flamingos ficam cor-de-rosa por causa dos alimentos que eles comem, como camarõezinhos."
  },
  {
   "id": "d-dupla",
   "nivel": "dificil",
   "tema": "animais",
   "texto": "Qual dupla está correta?",
   "falar": "Qual dupla está correta?",
   "intro": "O Julio quer ligar cada bichinho ao lugar onde ele vive.",
   "opcoes": [
    {
     "id": "a",
     "texto": "Camelo e deserto",
     "falar": "Camelo e deserto",
     "imagens": [
      "itens/camelo.svg",
      "itens/deserto.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Pinguim e deserto",
     "falar": "Pinguim e deserto",
     "imagens": [
      "itens/pinguim.svg",
      "itens/deserto.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Baleia e floresta",
     "falar": "Baleia e floresta",
     "imagens": [
      "itens/baleia.svg",
      "itens/floresta.svg"
     ]
    }
   ],
   "dicas": [
    "Olhe cada dupla e pense: esse animal consegue viver nesse lugar?",
    "A baleia precisa de muita água, e o pinguim gosta de frio. O deserto é quente e seco.",
    "Qual animal aguenta o calor e vive onde quase não chove? O camelo!"
   ],
   "julioErrou": "Eu tinha dito que a baleia vivia na floresta! Que dupla estranha! Preciso estudar mais!",
   "explicacao": "O camelo vive no deserto. A dupla certa é camelo e deserto.",
   "curiosidade": "A baleia respira o ar, por isso sobe até a superfície do mar."
  },
  {
   "id": "d-pinguim",
   "nivel": "dificil",
   "tema": "animais",
   "texto": "O pinguim é uma ave, mas ele não voa no ar. O que ele faz muito bem no seu habitat?",
   "falar": "O pinguim é uma ave, mas ele não voa no ar. O que ele faz muito bem no seu habitat?",
   "intro": "O Julio viu um pinguim todo arrumadinho andando na neve.",
   "imagens": [
    "itens/pinguim.svg"
   ],
   "descricao": "Um pinguim",
   "opcoes": [
    {
     "id": "a",
     "texto": "Corre tão rápido quanto um cavalo",
     "falar": "Corre tão rápido quanto um cavalo"
    },
    {
     "id": "b",
     "texto": "Nada e mergulha incrivelmente bem na água gelada",
     "falar": "Nada e mergulha incrivelmente bem na água gelada",
     "correta": true
    },
    {
     "id": "c",
     "texto": "Sobe em árvores muito altas",
     "falar": "Sobe em árvores muito altas"
    }
   ],
   "dicas": [
    "O pinguim tem asas curtinhas, que parecem nadadeiras.",
    "Ele vive em lugares gelados, perto do mar. O que será que ele faz na água?",
    "Pinguins não sobem em árvores e não correm como cavalos. Eles deslizam e mergulham no mar!"
   ],
   "julioErrou": "Eu tinha dito que o pinguim subia em árvores bem altas! Que pinguim acrobata! Preciso estudar mais!",
   "explicacao": "O pinguim nada e mergulha muito bem na água gelada.",
   "curiosidade": "O pinguim usa as asinhas como nadadeiras para nadar bem rápido."
  },
  {
   "id": "d-casa",
   "nivel": "dificil",
   "tema": "letras",
   "texto": "Organize as letras para formar uma palavra:",
   "falar": "Organize as letras para formar uma palavra: a, esse, cê, a.",
   "intro": "O Julio embaralhou as letras de uma palavra bem especial.",
   "letras": [
    "A",
    "S",
    "C",
    "A"
   ],
   "opcoes": [
    {
     "id": "a",
     "texto": "CASA",
     "falar": "casa",
     "correta": true
    },
    {
     "id": "b",
     "texto": "SACA",
     "falar": "saca"
    },
    {
     "id": "c",
     "texto": "ACAS",
     "falar": "acas"
    },
    {
     "id": "d",
     "texto": "CAAS",
     "falar": "caas",
     "extra": true
    }
   ],
   "dicas": [
    "Pense no lugar onde você mora. Que palavra é essa?",
    "A palavra começa com a letra cê e termina com a letra a.",
    "Casa: cê, a, esse, a. Procure a palavra que começa com cê!"
   ],
   "julioErrou": "Eu tinha dito que a palavra era saca! Será que o Julio mora numa saca? Preciso estudar mais!",
   "explicacao": "As letras formam a palavra CASA.",
   "curiosidade": "A palavra casa tem duas letras A, uma em cada pedacinho: ca e sa."
  },
  {
   "id": "d-segundo",
   "nivel": "dificil",
   "tema": "grandezas",
   "texto": "Qual objeto é o segundo maior?",
   "falar": "Qual objeto é o segundo maior?",
   "intro": "O Julio colocou três caixas mágicas em fila.",
   "visual": [
    {
     "forma": "quadrado",
     "tam": 40,
     "cor": "#4C8DF6"
    },
    {
     "forma": "quadrado",
     "tam": 110,
     "cor": "#4C8DF6"
    },
    {
     "forma": "quadrado",
     "tam": 75,
     "cor": "#4C8DF6"
    }
   ],
   "descricao": "Três quadrados azuis de tamanhos diferentes: um pequeno, um grande e um médio",
   "opcoes": [
    {
     "id": "a",
     "texto": "Pequeno",
     "falar": "Pequeno"
    },
    {
     "id": "b",
     "texto": "Médio",
     "falar": "Médio",
     "correta": true
    },
    {
     "id": "c",
     "texto": "Grande",
     "falar": "Grande"
    }
   ],
   "dicas": [
    "Primeiro, ache o maior de todos. Depois, procure o próximo.",
    "O maior é o grande e o menor é o pequeno. Sobrou um!",
    "O segundo maior fica no meio: nem o maior e nem o menor. É o médio!"
   ],
   "julioErrou": "Eu tinha dito que o segundo maior era o pequeno! Preciso estudar mais!",
   "explicacao": "O segundo maior é o médio, que fica entre o grande e o pequeno.",
   "curiosidade": "Colocar as coisas do maior para o menor se chama ordenar.",
   "imagens": [
    "itens/quad-p.svg",
    "itens/quad-g.svg",
    "itens/quad-m.svg"
   ]
  },
  {
   "id": "d-aviao",
   "nivel": "dificil",
   "tema": "grandezas",
   "texto": "Se uma pessoa vai a pé caminhando e outra vai de avião voando, quem chega mais LONGE bem mais rápido?",
   "falar": "Se uma pessoa vai a pé caminhando e outra vai de avião voando, quem chega mais longe bem mais rápido?",
   "intro": "O Julio precisa fazer uma viagem muito comprida.",
   "imagens": [
    "itens/pessoa-andando.svg",
    "itens/aviao.svg"
   ],
   "descricao": "Uma pessoa caminhando e um avião voando",
   "opcoes": [
    {
     "id": "a",
     "texto": "A pessoa que vai a pé",
     "falar": "A pessoa que vai a pé"
    },
    {
     "id": "b",
     "texto": "A pessoa que vai de avião",
     "falar": "A pessoa que vai de avião",
     "correta": true
    },
    {
     "id": "c",
     "texto": "As duas chegam juntas",
     "falar": "As duas chegam juntas"
    }
   ],
   "dicas": [
    "Pense em uma viagem muito longa, de uma cidade até outra bem distante.",
    "Caminhar é devagarzinho. Voar é bem veloz!",
    "O avião voa no céu e anda muito mais rápido que uma pessoa a pé. Quem chega primeiro?"
   ],
   "julioErrou": "Eu tinha dito que as duas chegavam juntas! Será que o avião esperava a pessoa? Preciso estudar mais!",
   "explicacao": "O avião é muito mais rápido, por isso chega mais longe em menos tempo.",
   "curiosidade": "O avião pode voar bem alto, acima das nuvens."
  }
 ],
 "secretas": [
  {
   "id": "s-sol",
   "nivel": "facil",
   "tema": "cores",
   "texto": "Qual é a cor do sol que brilha no céu?",
   "falar": "Qual é a cor do sol que brilha no céu?",
   "opcoes": [
    {
     "id": "a",
     "texto": "Amarelo",
     "falar": "Amarelo",
     "imagens": [
      "itens/cor-amarelo.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Azul",
     "falar": "Azul",
     "imagens": [
      "itens/cor-azul.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Verde",
     "falar": "Verde",
     "imagens": [
      "itens/cor-verde.svg"
     ]
    }
   ],
   "explicacao": "O sol é desenhado de amarelo, a cor da luz e do calor.",
   "curiosidade": "O sol é uma estrela bem grande que dá luz e calor para a Terra."
  },
  {
   "id": "s-tromba",
   "nivel": "facil",
   "tema": "animais",
   "texto": "Qual destes animais tem uma tromba comprida?",
   "falar": "Qual destes animais tem uma tromba comprida?",
   "opcoes": [
    {
     "id": "a",
     "texto": "Elefante",
     "falar": "Elefante",
     "imagens": [
      "itens/elefante.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Golfinho",
     "falar": "Golfinho",
     "imagens": [
      "itens/golfinho.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Pinguim",
     "falar": "Pinguim",
     "imagens": [
      "itens/pinguim.svg"
     ]
    }
   ],
   "explicacao": "O elefante tem uma tromba comprida.",
   "curiosidade": "O elefante usa a tromba para beber água, pegar comida e até para tomar banho."
  },
  {
   "id": "s-letra-sol",
   "nivel": "facil",
   "tema": "letras",
   "texto": "Qual é a primeira letra de SOL?",
   "falar": "Qual é a primeira letra da palavra sol?",
   "palavra": "SOL",
   "opcoes": [
    {
     "id": "a",
     "texto": "S",
     "falar": "esse",
     "correta": true
    },
    {
     "id": "b",
     "texto": "B",
     "falar": "bê"
    },
    {
     "id": "c",
     "texto": "M",
     "falar": "ême"
    }
   ],
   "explicacao": "Sol começa com a letra S.",
   "curiosidade": "A letra S parece uma cobrinha deitada."
  },
  {
   "id": "s-pesado",
   "nivel": "facil",
   "tema": "grandezas",
   "texto": "Qual é mais pesado?",
   "falar": "Qual é mais pesado?",
   "opcoes": [
    {
     "id": "a",
     "texto": "Elefante",
     "falar": "Elefante",
     "imagens": [
      "itens/elefante.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Passarinho",
     "falar": "Passarinho",
     "imagens": [
      "itens/passarinho.svg"
     ]
    }
   ],
   "explicacao": "O elefante é muito mais pesado que o passarinho.",
   "curiosidade": "Um elefante grande pesa mais do que alguns carros pequenos juntos."
  },
  {
   "id": "s-laranja",
   "nivel": "medio",
   "tema": "cores",
   "texto": "Se misturarmos amarelo e vermelho, que cor aparece?",
   "falar": "Se misturarmos amarelo e vermelho, que cor aparece?",
   "imagens": [
    "itens/cor-amarelo.svg",
    "itens/cor-vermelho.svg"
   ],
   "descricao": "Duas gotas de tinta: uma amarela e uma vermelha",
   "visual": [
    {
     "forma": "circulo",
     "tam": 80,
     "cor": "#FFD93B"
    },
    {
     "forma": "circulo",
     "tam": 80,
     "cor": "#E5383B"
    }
   ],
   "opcoes": [
    {
     "id": "a",
     "texto": "Laranja",
     "falar": "Laranja",
     "imagens": [
      "itens/cor-laranja.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Verde",
     "falar": "Verde",
     "imagens": [
      "itens/cor-verde.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Roxo",
     "falar": "Roxo",
     "imagens": [
      "itens/cor-roxo.svg"
     ]
    }
   ],
   "explicacao": "Amarelo mais vermelho dá laranja.",
   "curiosidade": "A cor laranja ganhou esse nome por causa da fruta laranja."
  },
  {
   "id": "s-ovos",
   "nivel": "medio",
   "tema": "animais",
   "texto": "Qual destes animais bota ovos?",
   "falar": "Qual destes animais bota ovos?",
   "opcoes": [
    {
     "id": "a",
     "texto": "Passarinho",
     "falar": "Passarinho",
     "imagens": [
      "itens/passarinho.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Vaca",
     "falar": "Vaca",
     "imagens": [
      "itens/vaca.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Elefante",
     "falar": "Elefante",
     "imagens": [
      "itens/elefante.svg"
     ]
    }
   ],
   "explicacao": "O passarinho bota ovos e cuida deles no ninho.",
   "curiosidade": "Os filhotes ficam dentro do ovo até estarem prontos para sair."
  },
  {
   "id": "s-mesa",
   "nivel": "medio",
   "tema": "letras",
   "texto": "Qual palavra começa com a letra M?",
   "falar": "Qual palavra começa com a letra ême?",
   "opcoes": [
    {
     "id": "a",
     "texto": "MESA",
     "falar": "mesa",
     "correta": true
    },
    {
     "id": "b",
     "texto": "PATO",
     "falar": "pato"
    },
    {
     "id": "c",
     "texto": "SAPO",
     "falar": "sapo"
    }
   ],
   "explicacao": "Mesa começa com a letra M.",
   "curiosidade": "A letra M parece duas montanhinhas juntas."
  },
  {
   "id": "s-escura",
   "nivel": "dificil",
   "tema": "cores",
   "texto": "Qual destas cores é a mais escura?",
   "falar": "Qual destas cores é a mais escura?",
   "opcoes": [
    {
     "id": "a",
     "texto": "Azul-marinho",
     "falar": "Azul marinho",
     "imagens": [
      "itens/cor-azul-marinho.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Amarelo",
     "falar": "Amarelo",
     "imagens": [
      "itens/cor-amarelo.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Rosa",
     "falar": "Rosa",
     "imagens": [
      "itens/cor-rosa.svg"
     ]
    }
   ],
   "explicacao": "O azul-marinho é a mais escura das três.",
   "curiosidade": "Quando a gente mistura preto em uma cor, ela fica mais escura."
  },
  {
   "id": "s-mamifero",
   "nivel": "dificil",
   "tema": "animais",
   "texto": "Qual destes animais é um mamífero que vive no mar?",
   "falar": "Qual destes animais é um mamífero que vive no mar?",
   "opcoes": [
    {
     "id": "a",
     "texto": "Golfinho",
     "falar": "Golfinho",
     "imagens": [
      "itens/golfinho.svg"
     ],
     "correta": true
    },
    {
     "id": "b",
     "texto": "Tubarão",
     "falar": "Tubarão",
     "imagens": [
      "itens/tubarao.svg"
     ]
    },
    {
     "id": "c",
     "texto": "Pinguim",
     "falar": "Pinguim",
     "imagens": [
      "itens/pinguim.svg"
     ]
    }
   ],
   "explicacao": "O golfinho é um mamífero. Ele respira ar e a mamãe golfinho dá leite ao filhote.",
   "curiosidade": "Os golfinhos conseguem dar pulos incríveis para fora da água."
  },
  {
   "id": "s-quatro",
   "nivel": "dificil",
   "tema": "letras",
   "texto": "Qual palavra tem exatamente quatro letras?",
   "falar": "Qual palavra tem exatamente quatro letras?",
   "opcoes": [
    {
     "id": "a",
     "texto": "BOLA",
     "falar": "bola",
     "correta": true
    },
    {
     "id": "b",
     "texto": "SOL",
     "falar": "sol"
    },
    {
     "id": "c",
     "texto": "ELEFANTE",
     "falar": "elefante"
    },
    {
     "id": "d",
     "texto": "CASAS",
     "falar": "casas",
     "extra": true
    }
   ],
   "explicacao": "Bola tem quatro letras.",
   "curiosidade": "Contando as letras, a gente descobre o tamanho de cada palavra."
  },
  {
   "id": "s-numero",
   "nivel": "dificil",
   "tema": "grandezas",
   "texto": "Qual é o maior número?",
   "falar": "Qual é o maior número?",
   "opcoes": [
    {
     "id": "a",
     "texto": "3",
     "falar": "três"
    },
    {
     "id": "b",
     "texto": "8",
     "falar": "oito",
     "correta": true
    },
    {
     "id": "c",
     "texto": "5",
     "falar": "cinco"
    }
   ],
   "explicacao": "Oito é maior que três e maior que cinco.",
   "curiosidade": "Os números vão crescendo um por um: um, dois, três, e assim por diante."
  }
 ]
};

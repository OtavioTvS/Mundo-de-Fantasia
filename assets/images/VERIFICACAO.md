# Verificação visual das imagens

Todas as imagens foram desenhadas em SVG (sem texto dentro) e **olhadas uma a uma em folhas de contato**
renderizadas no navegador (Chromium), em 23/10/2026. Além disso, o jogo completo foi jogado de ponta a ponta
(Fácil, Médio e Difícil, em tela de computador 1280×800 e de celular 390×800): nenhum erro de console e
nenhuma imagem com erro 404.

Legenda: **aprovada** = vi e conferi; **corrigida** = tinha defeito, foi refeita e revista; **sem uso** = existe na
pasta, mas o jogo não usa (não conferi para uso).

## Julio (consistência: mesmo corpo roxo, chifres amarelos, barriga creme com estrela, rabo)

| Imagem | Onde é usada | Itens conferidos | Problemas | Status |
|---|---|---|---|---|
| julio/julio-feliz.svg | todas as telas (pose padrão) | corpo, chifres, estrela, olhos, boca | nenhum | aprovada |
| julio/julio-pensando.svg | erro/ dica leve, carregando | mão no queixo, balões de pensamento | nenhum | aprovada |
| julio/julio-errando.svg | quando o Julio "erra" de propósito | gota de suor, língua | braço levantado encosta na cabeça (aceitável, lê-se como "coçar a cabeça") | aprovada |
| julio/julio-comemorando.svg | acerto, fim de jogo | braços para cima, confete, estrela | nenhum | aprovada |
| julio/julio-dica.svg | dicas | lâmpada acesa | nenhum | aprovada |
| julio/julio-surpreso.svg | fase secreta | olhos grandes, boca "o", estrelas | sobrancelhas coladas na 1ª versão; refeitas separadas e mais altas | corrigida |
| julio/julio-oi.svg | tela de dados | braço acenando | nenhum | aprovada |

## Cenários (fundo; o jogo usa `cover`, então as bordas podem ser cortadas)

| Imagem | Onde é usada | Itens conferidos | Problemas | Status |
|---|---|---|---|---|
| cenarios/inicio.svg | início, dados, nível, carregando | arco-íris, castelo, árvores, cogumelos | nenhum | aprovada |
| cenarios/facil.svg | perguntas do Fácil | campo, nuvens, sol, árvores | nenhum | aprovada |
| cenarios/medio.svg | perguntas do Médio | castelo ao pôr do sol, colinas | nenhum | aprovada |
| cenarios/dificil.svg | perguntas do Difícil | montanhas, noite, cristais | nenhum | aprovada |
| cenarios/secreta.svg | fase secreta | céu estrelado, cristais | nenhum | aprovada |
| cenarios/ranking.svg | fim de jogo e ranking | confete, colinas | nenhum | aprovada |

## Ícones

| Imagem | Onde é usada | Itens conferidos | Problemas | Status |
|---|---|---|---|---|
| icones/bau-fechado.svg | zona de soltar (arrastar) | tampa, fecho | nenhum | aprovada |
| icones/estrela.svg / estrela-vazia.svg | estrelas do fim de jogo | cheia × vazia (cinza) | nenhum | aprovada |
| icones/icone-facil.svg / icone-medio.svg / icone-dificil.svg | cartões de dificuldade (broto, estrela, diamante) | formas distintas | nenhum | aprovada |
| icones/som-ligado.svg / som-desligado.svg | botão de voz | alto-falante com ondas × com "x" | nenhum | aprovada |
| icones/vagalume.svg | vagalume secreto | corpo, asas, brilho | nenhum | aprovada |
| icones/medalha-1.svg | recompensa da fase secreta | fita e medalha | nenhum | aprovada |
| icones/bau-aberto.svg, brilhos.svg, casa.svg, sair.svg, trofeu.svg, medalha-2.svg, medalha-3.svg | **sem uso** | vistos na folha | `brilhos.svg` quase some em fundo claro | sem uso |

## Itens das perguntas (conferidos: o desenho é o que o nome diz e não entrega a resposta por texto)

| Imagem | Onde é usada | Itens conferidos | Problemas | Status |
|---|---|---|---|---|
| itens/cor-*.svg (amarelo, azul, azul-marinho, laranja, rosa, roxo, verde, verde-limao, vermelho) | respostas de cores | cor corresponde ao nome | nenhum | aprovada |
| itens/grama.svg, ceu.svg, flamingo.svg, iguais.svg | **sem uso** (o JSON não aponta para eles) | vistos na folha | nenhum | sem uso |
| itens/grama-contorno.svg | f-grama (enunciado) | só contorno, branco | feita de propósito sem cor, para não entregar "verde" | corrigida |
| itens/vaca.svg, leao.svg, tubarao.svg, golfinho.svg, baleia.svg, pinguim.svg, camelo.svg, elefante.svg, passarinho.svg, rato.svg | animais | espécie reconhecível, patas/olhos no lugar | vaca com chifre e orelha pequenos, mas reconhecível | aprovada |
| itens/urso-polar.svg | m-urso | corpo branco, 4 patas, focinho | pernas fora do corpo na 1ª versão; reposicionadas | corrigida |
| itens/flamingo-sombra.svg | d-flamingo (enunciado) | silhueta cinza | cinza de propósito, para não entregar "rosa" | aprovada |
| itens/celeiro.svg, quintal.svg, deserto.svg, gelo.svg, fundo-mar.svg, debaixo-terra.svg, floresta.svg, ninho-arvore.svg | lugares (habitats) | cenas simples, sem texto | nenhum | aprovada |
| itens/floresta-tropical.svg | habitats | palmeiras e flores | palmeiras saíam do quadro na 1ª versão; corrigidas | corrigida |
| itens/bola.svg, bolinha-gude.svg | f-bolinha, f-bola | bola de futebol × gude | gude pequena **de propósito** (é a menor) | aprovada |
| itens/elefante.svg, rato.svg | f-elefante | elefante grande × rato pequeno | tamanhos diferentes **de propósito** | aprovada |
| itens/quad-p.svg, quad-m.svg, quad-g.svg | d-segundo | pequeno, médio, grande | nenhum | aprovada |
| itens/semaforo.svg | m-semaforo | 3 luzes: vermelho, amarelo, verde | nenhum | aprovada |
| itens/aviao.svg, pessoa-andando.svg | d-aviao | avião, pessoa a pé | nenhum | aprovada |
| itens/folha-papel.svg, tijolo.svg, caneta.svg | m-pesado | objetos reconhecíveis | nenhum | aprovada |

## O que NÃO foi verificado

- Não testei em celular ou tablet físicos, só em tela simulada (390×800) no Chromium.
- A voz (Web Speech) depende do aparelho; não pude ouvir as falas, só conferi o texto e o fluxo.
- `d-sequencia` não tem imagem: usa formas desenhadas em CSS.
- Daltonismo: as cores principais também aparecem escritas ao lado (Roxo, Vermelho...), mas não testei com simulador.

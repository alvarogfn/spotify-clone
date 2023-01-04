# Front-end

## Antes de Rodar o Projeto

Você precisa configurar quais serão os endpoints que a aplicação irá consumir do backend e do BFF:

![Captura de tela de 2022-10-03 12-26-42](https://user-images.githubusercontent.com/62889807/193616278-d3761e79-c272-47a1-b34e-ae38df804de4.png)

1. A endpointForAuth se refere ao endpoint no backend responsável pela autenticação oauth e redirect.
2. A endpointForResources se refere ao BFF, onde a aplicação buscará os dados a serem usados.


## Design

O design do menu lateral esquerdo, das músicas recentemente tocadas e do player seguem o design atual do Spotify.
O design das playlists segue o vídeo no tema, apesar de certa diferença no cabeçalho da playlist e ícones.

## Issues

### Você precisa estar com o Spotify já rodando algum outro dispositivo

Talvez seja necessário que você inicie a aplicação do spotify e coloque alguma música para tocar em outro dispositivo antes de abrir o site, referente a essa issue: 
https://github.com/spotify/web-api/issues/1325

### O tocadas recentemente é referente as músicas, não aos contextos

Eu tentei implementar o recentemente tocadas semelhante ao spotify normal, mas eu descobri que eles não possuiam exatamente isso na API pública deles, e eu só conseguiria chegar nesse resultado através da API de músicas tocadas recentemente. Porém, depois de alguns testes e pesquisas, eu descobri que o endpoint de músicas tocadas recentemente as vezes não retornava o contexto que as músicas foram tocadas.

https://community.spotify.com/t5/Spotify-for-Developers/Context-is-null-on-recently-played-tracks-requests-from-Spotify/td-p/5355464

Eu também descobri que a API do spotify só considera que uma música foi tocada se ela for até o final da sua reprodução, sem manter um histórico das músicas que realmente foram tocadas.

https://stackoverflow.com/questions/73011653/spotify-api-player-currently-playing-enpoint-is-not-return-currently-playing-s

### O vue com typescript não suporta interfaces externas na definição de props dos componentes

Apesar disso, eu descobri [na issue desse problema](https://github.com/vuejs/core/issues/4294) atraves desse [comentario aqui](https://github.com/vuejs/core/issues/4294#issuecomment-942838354) que quando você renomeia a interface, o compilador acaba aceitando as interfaces externas. Por isso, em alguns locais da aplicação eu acabei usando esse meio.

## Rodando o Projeto

```sh
npm install
```

### Compilação e Hot-reload para o desenvolvimento

```sh
npm run dev
```

### Checagem de tipos, compilação e minificação para produção.

```sh
npm run build
```

### Lint com [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Vídeos

### Loading

[Gravação de tela de 03-10-2022 15:25:03.webm](https://user-images.githubusercontent.com/62889807/193651110-d89006d1-1f52-4fbf-88ed-e4338734fab4.webm)

### Tocados Recentemente 

![ezgif com-gif-maker](https://user-images.githubusercontent.com/62889807/193653132-cbe87f96-b35a-47ee-ae34-4f5b076013f0.gif)

### Tracker

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/62889807/193653924-56eeb087-08fd-497b-a8a9-d578a82f952e.gif)

### Playlist 

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/62889807/193654873-1eff8db4-aa8f-440c-9d4b-b892eded89c1.gif)

### Se movendo entre playlists

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/62889807/193657054-3cfd7b3a-2af4-4f26-8de2-bda5462116c2.gif)


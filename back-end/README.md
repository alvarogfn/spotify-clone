# BACK-END TEMA 27

Esse é o back-end do Projeto. Recomendo que seja configurado primeiro, antes do BFF e do Front-end.

## ANTES DE INICIAR O PROJETO

Algumas configurações de variaveis de ambiente são necessárias para que a aplicação funcione. Também será preciso criar um aplicativo no Spotify para que o nosso aplicativo possa se conectar com o Spotify.

### Autenticação com o Spotify

A primeira etapa antes da configuração do projeto é configurar a sua conta no Spotify com as configurações de Desenvolvedor. Elas são importante pois permitirão que os usuários no front-end se conectem com a autenticação oauth do aplicativo.

Aqui um passo a passo de como habilitar:

1. [Entre aqui](https://developer.spotify.com/dashboard/) e logue com a sua conta no Spotify;

![Captura de tela de 2022-09-30 09-00-31](https://user-images.githubusercontent.com/62889807/193265066-ec7394d0-8813-45f5-8182-bbfa8743326b.png)

2. Dentro da dashboard, na parte de Aplicações, clique em `Create an App`;

![Captura de tela de 2022-09-30 09-01-03](https://user-images.githubusercontent.com/62889807/193265149-196f1e39-99ce-413a-999c-9ba805e42b04.png)

3. Depois que o App for criado, você deve ir até as configurações do spotify em `EDIT SETTINGS`;

![Captura de tela de 2022-09-30 09-02-08](https://user-images.githubusercontent.com/62889807/193265541-de0f9665-fab4-42e4-a7bb-9c7c96b4038e.png)

4. Você precisa configurar a permissão de redirect URIs para a URL do seu Backend (Por padrão, a URL a ser preenchida é `http://localhost:3000/callback/`), isso permitirá que o spotify chame o aplicativo de volta após o token de permissão for concedido. (Se essa parte não for configurada corretamente, o spotify retornará `INVALID URI`);

![Captura de tela de 2022-09-30 09-04-18](https://user-images.githubusercontent.com/62889807/193265672-342a0466-f6b2-427e-8243-fbe16fd4a4c8.png)

### Configure as variáveis de Ambiente do Projeto

Na pasta example.env temos listadas as variaveis de ambiente que precisamos configurar.

**Recomendo fortemente** que você mantenha as variáveis hostname e port como localhost e 3000, respectivamente. Toda a aplicação está configurada por padrão para essas configurações, e altera-las vai requerer que você as altere no BFF, Front-end e no Spotify, o tutorial a seguir também sera dado com essas configurações como exemplo.

1. Preencha os campos `HOSTNAME` e `PORT` como localhost e 3000;

![Captura de tela de 2022-09-30 09-05-55](https://user-images.githubusercontent.com/62889807/193265951-505d04a6-d0c4-46fb-8bc6-2e6b19cf1398.png)


2. Preencha o campo `APPLICATION_WEBSITE` com a URL e Path Login do Aplicativo. Essa parte é importante, pois o endpoint de `callback` chamará essa URL com o Token de Acesso nos parametros para acessar as funcionalidades do Spotify após a autenticação.

![Captura de tela de 2022-09-30 09-07-49](https://user-images.githubusercontent.com/62889807/193266298-e9f7bd66-b0c7-446c-a4d7-2234e3eba3a9.png)


3. As variáveis `SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET` devem ser preenchidas conforme a sua aplicação criada no [spotify](https://developer.spotify.com/dashboard/applications).

![Captura de tela de 2022-09-30 09-08-35](https://user-images.githubusercontent.com/62889807/193266426-291f803e-00a3-47dc-b70a-3c6b08b0fab9.png)

![Captura de tela de 2022-09-30 09-10-02](https://user-images.githubusercontent.com/62889807/193266670-1cc386a8-1230-4d5f-8cb5-2c4e7b86dafc.png)

### Instale as dependencias do Projeto

Você pode instalar as dependencias do projeto com o comando no terminal:

```bash
  npm install
```

## Rodando o Projeto

Você pode rodar o projeto em modo desenvolvedor com o comando no terminal:

```bash
  npm run dev
```

## Com essa parte configurada, você pode seguir para a configuração do BFF

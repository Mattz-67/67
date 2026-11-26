# 🤝 NósDois — Como publicar na internet (grátis)

Depois de publicado, qualquer pessoa abre o seu link, cria a sala e te manda o código.
**Importante:** câmera/microfone só funcionam em sites com cadeado **HTTPS** — as opções abaixo já dão HTTPS grátis automaticamente.

---

## Opção 1 — Render (mais fácil, recomendada) ⭐

1. Crie uma conta grátis em **github.com** e faça upload desta pasta `nos-dois`
   (botão **Add file → Upload files**, arraste os arquivos — pode pular a pasta `node_modules`).
2. Crie uma conta grátis em **render.com** e clique em **New + → Web Service**.
3. Conecte o repositório do GitHub que você criou.
4. Preencha:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Clique em **Create Web Service** e aguarde ~2 minutos.
6. Pronto! Seu site ganha um endereço tipo `https://nos-dois.onrender.com` 🎉

> 💡 Este projeto já inclui o arquivo `render.yaml`, então no passo 2 você também pode usar **New + → Blueprint** e ele configura tudo sozinho.
> ⚠️ No plano grátis o site "dorme" após 15 min sem uso e demora ~30s para acordar no primeiro acesso.

## Opção 2 — Railway

1. Conta grátis em **railway.app** → **New Project → Deploy from GitHub repo**.
2. Selecione o repositório. Ele detecta o Node sozinho e usa o `npm start`.
3. Em **Settings → Networking**, clique em **Generate Domain** para ganhar o link público.

## Opção 3 — Testar rápido na sua rede (sem publicar)

No seu computador, dentro da pasta do projeto:

```bash
npm install
npm start
```

- No **mesmo computador**: abra `http://localhost:3000`
- Câmera em outro aparelho exige HTTPS — para testes rápidos use a Opção 1, ou um túnel como o **Cloudflare Tunnel** (`cloudflared tunnel --url http://localhost:3000`).

---

## Como funciona depois de publicado

1. Você abre o link, digita seu nome e clica em **Criar sala**.
2. Copia o link/código e manda para a outra pessoa (WhatsApp, etc.).
3. Ela abre, digita o nome e entra. Simples assim — a sala aceita **no máximo 2 pessoas**.

## Limitações honestas

- A conexão de vídeo é direta entre os navegadores (WebRTC). Em redes muito restritivas (Wi-Fi de empresa/escola), pode ser necessário um servidor TURN — me peça que eu adiciono.
- A gravação é feita no **seu navegador** e baixada como arquivo `.webm` ao parar de gravar (nada fica salvo no servidor).
- O fundo desfocado usa uma IA que roda no navegador (MediaPipe) e precisa de internet na primeira vez que é ativado.

# EcoAzul

Site em React + Vite, com várias páginas, tema claro/escuro e vinheta interativa.

## Como rodar

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a pasta dist para publicar
```

## Onde fica cada coisa

```
index.html                     título, fontes e script que aplica o tema salvo
src/
├── main.jsx                   liga o React e o roteador (não precisa mexer)
├── App.jsx                    vinheta + lista de rotas (não precisa mexer)
├── routes.js                  ★ LISTA DE PÁGINAS: adicione/remova páginas aqui
├── index.css                  ★ CORES dos temas claro e escuro (variáveis --accent, --bg ...)
│
├── layout/                    parte que se repete em TODAS as páginas
│   ├── Layout.jsx             cabeçalho (menu), rodapé, barra de progresso
│   └── Layout.css             estilos de botões, cabeçalho, rodapé, seções
│
├── components/                peças reutilizáveis
│   ├── intro/Intro.jsx|css    vinheta preta com "EcoAzul"
│   ├── ThemeToggle.jsx        botão de tema claro/escuro
│   ├── HeroCanvas.jsx         rede de pontos do início
│   └── Reveal.jsx             animação de "aparecer ao rolar"
│
├── data/
│   └── Pacotes.js             ★ DADOS dos pacotes (nome, preço, descrição)
│
└── pages/                     ★ UMA PASTA POR PÁGINA (código + estilo juntos)
    ├── home/        Home.jsx, Home.css, ReserveDialog.jsx      →  /
    ├── pacotes/     Pacotes.jsx, Pacotes.css                   →  /pacotes
    ├── sobre/       Sobre.jsx, Sobre.css                       →  /sobre
    ├── contato/     Contato.jsx, Contato.css                   →  /contato
    ├── NaoEncontrada.jsx                                        →  qualquer endereço inexistente
    └── _modelo/     Modelo.jsx, Modelo.css                     →  molde para páginas novas
```

## Criar uma página nova (4 passos)

1. Copie `src/pages/_modelo` e renomeie a pasta (ex.: `galeria`).
2. Renomeie `Modelo.jsx`/`Modelo.css` (ex.: `Galeria.jsx`/`Galeria.css`) e troque o nome dentro deles.
3. Em `src/routes.js`, importe e adicione uma linha:
   `{ path: '/galeria', rotulo: 'Galeria', pagina: Galeria, menu: true }`
4. Pronto: aparece no menu e no rodapé sozinha. Escreva seu código dentro do arquivo da página e seus estilos no `.css` dela.

## Regras para os estilos

- Use sempre cores por variável (`var(--accent)`, `var(--text)`, `var(--surface)`...) e o site troca de tema sozinho.
- Para mudar a paleta, edite só `src/index.css`.
- Classes prontas: `.btn .btn-primary .btn-ghost`, `.section`, `.section-head`, `.eyebrow`, `.glow-card`, `.offers/.offer`, `.field`, `.chip`.

## Publicação

Como as páginas usam endereços como `/pacotes`, o servidor precisa devolver `index.html` para qualquer endereço
(Netlify: arquivo `public/_redirects` com `/* /index.html 200`; Vercel faz isso sozinho).
// =========================================================
// LISTA DE PÁGINAS DO SITE
// Para criar uma página nova: importe o componente e adicione uma linha.
//   path   -> endereço na barra do navegador (ex.: '/contato')
//   rotulo -> texto que aparece no menu
//   pagina -> o componente da página
//   menu   -> true = aparece no menu do topo | false = fica escondida
// =========================================================
import Home from './pages/home/Home.jsx'
import Pacotes from './pages/pacotes/Pacotes.jsx'
import Sobre from './pages/sobre/Sobre.jsx'
import Contato from './pages/contato/Contato.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'

export const rotas = [
  { path: '/', rotulo: 'Início', pagina: Home, menu: true },
  { path: '/pacotes', rotulo: 'Pacotes', pagina: Pacotes, menu: true },
  { path: '/sobre', rotulo: 'Sobre', pagina: Sobre, menu: true },
  { path: '/contato', rotulo: 'Contato', pagina: Contato, menu: true },
]

// Página mostrada quando o endereço não existe
export const paginaNaoEncontrada = NaoEncontrada
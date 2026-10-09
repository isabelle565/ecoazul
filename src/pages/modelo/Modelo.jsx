// =========================================================
// MODELO DE PÁGINA NOVA  (copie esta pasta inteira)
//
// COMO USAR:
// 1. Copie a pasta  src/pages/_modelo  e renomeie, ex.:  src/pages/galeria
// 2. Renomeie os arquivos:  Modelo.jsx -> Galeria.jsx   |   Modelo.css -> Galeria.css
// 3. Dentro deles troque o nome:  Modelo -> Galeria   e   pagina-modelo -> pagina-galeria
// 4. Abra src/routes.js, importe a página e adicione uma linha:
//      { path: '/galeria', rotulo: 'Galeria', pagina: Galeria, menu: true },
//    Pronto: ela já aparece no menu e no rodapé.
//
// Esta pasta (_modelo) não está ligada ao site; serve só de molde.
// =========================================================
import './Modelo.css'
import Reveal from '../../components/Reveal.jsx'

function Modelo() {
  return (
    <main className="pagina pagina-modelo">
      {/* Título da página */}
      <header className="pagina-topo">
        <span className="eyebrow mono">Etiqueta</span>
        <h1>Título da página</h1>
        <p>Uma frase explicando o que tem aqui.</p>
      </header>

      {/* Uma seção. Copie este bloco para criar outras. */}
      <section className="section">
        <Reveal className="modelo-bloco glow-card">
          <h2>Título da seção</h2>
          <p>Cole seu conteúdo aqui.</p>
        </Reveal>
      </section>
    </main>
  )
}

export default Modelo
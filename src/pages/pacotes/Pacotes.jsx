// =========================================================
// PÁGINA: PACOTES   (endereço: /pacotes)
// Arquivos desta página: Pacotes.jsx (estrutura) + Pacotes.css (estilo)
// Este é um exemplo funcionando: lista os pacotes de src/data/Pacotes.js.
// Troque ou acrescente o que quiser.
// =========================================================
import './Pacotes.css'
import Reveal from '../../components/Reveal.jsx'
import { pacotes, reais } from '../../data/Pacotes.js'

function Pacotes() {
  return (
    <main className="pagina pagina-pacotes">
      {/* Título da página */}
      <header className="pagina-topo">
        <span className="eyebrow mono">Pacotes</span>
        <h1>Escolha sua experiência</h1>
        <p>Viagens de observação e o programa de adoção de ninhos.</p>
      </header>

      {/* Conteúdo da página */}
      <section className="section">
        <div className="offers">
          {pacotes.map((p, i) => (
            <Reveal as="article" className="offer glow-card" key={p.id} delay={i * 90}>
              <span className="offer-badge">{p.selo}</span>
              <h3>{p.nome}</h3>
              <p className="offer-local">{p.local}</p>
              <p className="offer-foco">{p.foco}</p>
              <strong className="pacote-preco">a partir de {reais(p.precoMin)}</strong>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Pacotes
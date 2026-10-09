// =========================================================
// PÁGINA: SOBRE   (endereço: /sobre)
// Arquivos desta página: Sobre.jsx (estrutura) + Sobre.css (estilo)
// Escreva seus textos nos blocos abaixo.
// =========================================================
import './Sobre.css'
import Reveal from '../../components/Reveal.jsx'

function Sobre() {
  return (
    <main className="pagina pagina-sobre">
      <header className="pagina-topo">
        <span className="eyebrow mono">Sobre</span>
        <h1>Sobre a EcoAzul</h1>
        <p>Conte aqui quem somos e por que protegemos a arara-azul.</p>
      </header>

      <section className="section">
        <Reveal className="sobre-bloco glow-card">
          <h2>Nossa missão</h2>
          <p>
            {/* ESCREVA SEU TEXTO AQUI */}A EcoAzul leva você até as araras-azuis, com guias
            especializados e acesso a áreas preservadas, e permite apadrinhar um ninho monitorado.
          </p>
        </Reveal>
      </section>
    </main>
  )
}

export default Sobre
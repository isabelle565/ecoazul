// =========================================================
// PÁGINA: CONTATO   (endereço: /contato)
// Arquivos desta página: Contato.jsx (estrutura) + Contato.css (estilo)
// O formulário só mostra uma mensagem de confirmação (não envia nada de verdade).
// =========================================================
import { useState } from 'react'
import './Contato.css'

function Contato() {
  const [enviado, setEnviado] = useState(false)

  const enviar = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <main className="pagina pagina-contato">
      <header className="pagina-topo">
        <span className="eyebrow mono">Contato</span>
        <h1>Fale com a gente</h1>
        <p>Tire dúvidas sobre pacotes e sobre a adoção de ninhos.</p>
      </header>

      <section className="section">
        {enviado ? (
          <div className="contato-ok glow-card">
            <h2>Mensagem recebida</h2>
            <p>Em um site real, a equipe da EcoAzul responderia por e-mail.</p>
          </div>
        ) : (
          <form className="contato-form glow-card" onSubmit={enviar}>
            <label className="field">
              Nome
              <input required name="nome" autoComplete="name" />
            </label>
            <label className="field">
              E-mail
              <input required type="email" name="email" autoComplete="email" />
            </label>
            <label className="field">
              Mensagem
              <textarea required name="mensagem" rows="5" />
            </label>
            <button type="submit" className="btn btn-primary">
              Enviar mensagem
            </button>
          </form>
        )}
      </section>
    </main>
  )
}

export default Contato
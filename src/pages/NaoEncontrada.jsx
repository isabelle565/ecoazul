import { Link } from 'react-router-dom'

// Aparece quando o endereço digitado não existe (erro 404)
function NaoEncontrada() {
  return (
    <main className="pagina">
      <header className="pagina-topo">
        <span className="eyebrow mono">404</span>
        <h1>Página não encontrada</h1>
        <p>O endereço que você abriu não existe.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>
          Voltar ao início
        </Link>
      </header>
    </main>
  )
}

export default NaoEncontrada
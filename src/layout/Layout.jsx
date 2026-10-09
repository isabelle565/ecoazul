import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import './Layout.css'

import ThemeToggle from '../components/ThemeToggle.jsx'
import { rotas } from '../Routes.js'

// Começa no topo ao trocar de página (ou vai até a seção, se o link tiver #)
function VoltarAoTopo() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // links como /#ninho: espera a página montar e rola até a seção
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 80)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Logo({ ...props }) {
  return (
    <Link to="/" className="wordmark" aria-label="EcoAzul, início" {...props}>
      <span className="wordmark-dot" aria-hidden="true" />
      Eco<span>Azul</span>
    </Link>
  )
}

function Layout() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const barraRef = useRef(null)

  // barra de progresso + cabeçalho com fundo ao rolar
  useEffect(() => {
    const aoRolar = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (barraRef.current) barraRef.current.style.width = `${pct}%`
      setRolou(window.scrollY > 12)
    }
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const itensMenu = rotas.filter((r) => r.menu)

  return (
    <div className="site">
      <VoltarAoTopo />

      <div className="progress" aria-hidden="true">
        <div className="progress-bar" ref={barraRef} />
      </div>

      {/* ---------- cabeçalho (igual em todas as páginas) ---------- */}
      <header className={`header ${rolou ? 'is-scrolled' : ''}`}>
        <Logo onClick={() => setMenuAberto(false)} />

        <nav className={`header-nav ${menuAberto ? 'is-open' : ''}`} aria-label="Principal">
          {itensMenu.map((r) => (
            <NavLink key={r.path} to={r.path} end onClick={() => setMenuAberto(false)}>
              {r.rotulo}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Link to="/contato" className="btn btn-primary btn-small header-cta">
            Fale conosco
          </Link>
          <button
            type="button"
            className="burger"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ---------- aqui entra a página da rota atual ---------- */}
      <Outlet />

      {/* ---------- rodapé (igual em todas as páginas) ---------- */}
      <footer className="footer">
        <div className="footer-cols">
          <div>
            <Logo />
            <p>Turismo de observação e conservação da arara-azul.</p>
          </div>
          <div>
            <h4>Navegue</h4>
            {itensMenu.map((r) => (
              <Link key={r.path} to={r.path}>
                {r.rotulo}
              </Link>
            ))}
          </div>
          <div>
            <h4>Programa</h4>
            <Link to="/#ninho">Adote um ninho</Link>
            <Link to="/#faq">Dúvidas</Link>
          </div>
          <div>
            <h4>EcoAzul</h4>
            <span>Parceria: Instituto Arara Azul</span>
          </div>
        </div>
        <p className="footer-legal">
          © {new Date().getFullYear()} EcoAzul. Projeto escolar; preços e pacotes ilustrativos.
        </p>
      </footer>
    </div>
  )
}

export default Layout
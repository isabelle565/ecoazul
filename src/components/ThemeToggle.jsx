import { useEffect, useState } from 'react'

// Lê o tema que o script do index.html já aplicou
const temaInicial = () => document.documentElement.getAttribute('data-theme') || 'dark'

function ThemeToggle() {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    try {
      localStorage.setItem('ecoazul-tema', tema)
    } catch {
      /* navegação privada: tudo bem, só não salva */
    }
  }, [tema])

  const escuro = tema === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${escuro ? 'is-dark' : 'is-light'}`}
      onClick={() => setTema(escuro ? 'light' : 'dark')}
      aria-label={escuro ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      aria-pressed={escuro}
      title={escuro ? 'Tema claro' : 'Tema escuro'}
    >
      <span className="theme-track">
        {/* sol */}
        <svg className="theme-icon theme-sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
        </svg>
        {/* lua */}
        <svg className="theme-icon theme-moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
        </svg>
        <span className="theme-thumb" />
      </span>
    </button>
  )
}

export default ThemeToggle
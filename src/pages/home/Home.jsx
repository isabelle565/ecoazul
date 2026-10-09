import { useEffect, useRef, useState } from 'react'
import './Home.css'

import { pacotes, reais } from '../../data/Pacotes.js'
import Reveal from '../../components/Reveal.jsx'
import HeroCanvas from '../../components/HeroCanvas.jsx'
import ReserveDialog from './ReserveDialog.jsx'

// ============================================================
// DADOS ESTÁTICOS DA PÁGINA
// ============================================================

const beneficios = [
  {
    titulo: 'Guias especializados',
    texto: 'Acompanhamento de quem conhece as araras e os ninhos de perto.',
    icone: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5Z',
  },
  {
    titulo: 'Hospedagem de ecoturismo',
    texto: 'Pousadas e glamping dentro do Pantanal, com traslados e entradas.',
    icone: 'M3 20V9l9-6 9 6v11h-6v-6H9v6H3Z',
  },
  {
    titulo: 'Apadrinhe um ninho',
    texto: 'Ajude a proteger a espécie mesmo sem viajar, a partir de R$ 300 por ano.',
    icone: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z',
  },
]

const estatisticas = [
  { valor: 15, sufixo: '%', rotulo: 'da população da espécie vive no Perigara' },
  { valor: 3, sufixo: '', rotulo: 'experiências para viver ou apoiar' },
  { valor: 300, prefixo: 'R$ ', rotulo: 'por ano para apadrinhar um ninho' },
  { valor: 5, sufixo: ' dias', rotulo: 'de imersão na expedição mais longa' },
]

const abasArara = [
  {
    id: 'habitat',
    rotulo: 'Habitat',
    titulo: 'Pantanal, Cerrado e Amazônia',
    texto:
      'A arara-azul-grande vive em regiões abertas do Brasil central. No Pantanal ela nidifica principalmente em cavidades de árvores antigas, como o manduvi.',
  },
  {
    id: 'dieta',
    rotulo: 'Dieta',
    titulo: 'Especialista em palmeiras',
    texto:
      'Seu bico poderoso abre os cocos duros de palmeiras como o acuri e a bocaiúva, base da alimentação da espécie.',
  },
  {
    id: 'ameacas',
    rotulo: 'Ameaças',
    titulo: 'Tráfico e perda de habitat',
    texto:
      'A captura para o comércio ilegal e a perda de árvores com ninhos levaram a espécie perto da extinção. O monitoramento de ninhos ajudou na recuperação.',
  },
  {
    id: 'ajuda',
    rotulo: 'Como ajudar',
    titulo: 'Turismo responsável e padrinhos',
    texto:
      'Visitar com guias especializados e apadrinhar ninhos gera renda local e financia o acompanhamento das famílias de araras.',
  },
]

const faq = [
  {
    p: 'Preciso de experiência para participar das expedições?',
    r: 'Não. Os guias acompanham o grupo o tempo todo. As trilhas do Pantanal Sul são leves e a expedição do Perigara é feita em ritmo de observação e fotografia.',
  },
  {
    p: 'O que está incluso nos pacotes?',
    r: 'Hospedagem, traslados, guias especializados e entradas. No Perigara há ainda glamping de luxo, mentorias de fotografia e acesso a áreas restritas.',
  },
  {
    p: 'Como funciona a adoção de um ninho?',
    r: 'Você escolhe o valor anual, apadrinha um ninho monitorado por 1 ano e recebe um certificado digital de padrinho.',
  },
  {
    p: 'Os preços são reais?',
    r: 'Este é um projeto escolar: preços e pacotes são ilustrativos e nenhuma reserva é cobrada.',
  },
]

// ============================================================
// PEQUENOS HOOKS / COMPONENTES DE INTERAÇÃO
// ============================================================

// Número que "sobe" até o valor final quando aparece na tela
function Contador({ valor, prefixo = '', sufixo = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      if (reduz) return setN(valor)
      const ini = performance.now()
      const dur = 1400
      const passo = (t) => {
        const k = Math.min((t - ini) / dur, 1)
        setN(Math.round(valor * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(passo)
      }
      raf = requestAnimationFrame(passo)
    })
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [valor])

  return (
    <span ref={ref}>
      {prefixo}
      {n}
      {sufixo}
    </span>
  )
}

// Faz o brilho seguir o mouse dentro de cards (usa variáveis CSS)
const seguirMouse = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

// Gera um código "de ninho" a partir do nome (só para o certificado)
const codigoNinho = (nome) => {
  let h = 0
  for (const c of nome || 'arara') h = (h * 31 + c.charCodeAt(0)) % 9000
  return `NINHO-${String(h + 1000).padStart(4, '0')}`
}

// ============================================================
// HOME
// ============================================================

function Home() {
  const [aba, setAba] = useState('pacotes')
  const [destino, setDestino] = useState('todos')
  const [filtro, setFiltro] = useState('todos')
  const [reserva, setReserva] = useState(null)

  // viajantes escolhidos em cada card
  const [viajantes, setViajantes] = useState({ 'pantanal-sul': 2, perigara: 2 })

  // mapa
  const [pinoAtivo, setPinoAtivo] = useState('perigara')

  // aba "A arara"
  const [abaArara, setAbaArara] = useState('habitat')

  // adoção
  const [valorNinho, setValorNinho] = useState(500)
  const [nomePadrinho, setNomePadrinho] = useState('')

  // FAQ
  const [faqAberta, setFaqAberta] = useState(0)

  // inclinação 3D do cartão do hero
  const fichaRef = useRef(null)

  const irPara = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const buscar = (e) => {
    e.preventDefault()
    setFiltro(aba === 'pacotes' ? destino : 'ninho')
    irPara('pacotes')
  }

  const visiveis = pacotes.filter(
    (p) => filtro === 'todos' || p.id === filtro || (filtro !== 'ninho' && p.tipo === 'ninho'),
  )

  const chips = [
    { id: 'todos', rotulo: 'Todos' },
    { id: 'pantanal-sul', rotulo: 'Pantanal Sul' },
    { id: 'perigara', rotulo: 'Perigara' },
    { id: 'ninho', rotulo: 'Adote um ninho' },
  ]

  const ajustarViajantes = (id, delta) =>
    setViajantes((v) => ({ ...v, [id]: Math.min(12, Math.max(1, (v[id] ?? 2) + delta)) }))

  const inclinar = (e) => {
    const el = fichaRef.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`)
  }
  const soltar = () => {
    fichaRef.current.style.setProperty('--rx', '0deg')
    fichaRef.current.style.setProperty('--ry', '0deg')
  }

  const pino = pacotes.find((p) => p.id === pinoAtivo)
  const ninhoPacote = pacotes.find((p) => p.tipo === 'ninho')
  const nivelPadrinho = valorNinho >= 800 ? 'Protetor' : valorNinho >= 500 ? 'Guardião' : 'Padrinho'

  return (
    <main className="home" id="inicio">
      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid" />
          <HeroCanvas />
        </div>

        <div className="hero-inner">
          <div className="hero-text">
            <span className="tag">
              <i className="tag-pulse" /> Pantanal · Observação de arara-azul
            </span>
            <h1>
              Veja a <em>arara-azul</em> de perto, no Pantanal.
            </h1>
            <p>
              Pacotes de ecoturismo e expedições fotográficas, com guias especializados e
              hospedagem na natureza. Ou apadrinhe um ninho sem sair de casa.
            </p>
            <div className="hero-cta">
              <a href="#pacotes" className="btn btn-primary">
                Explorar pacotes
              </a>
              <a href="#ninho" className="btn btn-ghost">
                Adotar um ninho
              </a>
            </div>
          </div>

          {/* ficha técnica com inclinação 3D */}
          <div
            className="ficha-wrap"
            onPointerMove={inclinar}
            onPointerLeave={soltar}
          >
            <article className="ficha" ref={fichaRef}>
              <header className="ficha-head">
                <span className="mono">FICHA · 001</span>
                <span className="ficha-status">
                  <i /> Vulnerável (IUCN)
                </span>
              </header>
              <h2>Arara-azul-grande</h2>
              <p className="mono ficha-sci">Anodorhynchus hyacinthinus</p>

              <div className="ficha-bird" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="gArara" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="var(--accent-2)" />
                      <stop offset="1" stopColor="var(--accent-3)" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gArara)"
                    d="M92 14c-18-4-36 6-44 22-6 12-4 24-14 36-6 8-16 10-22 10 10 6 24 6 36-2 6 10 18 14 28 8 12-8 16-26 12-42 4-2 8-6 10-12-4 0-8-2-10-6 2-4 2-10 4-14Z"
                  />
                  <circle cx="82" cy="30" r="3" fill="var(--bg)" />
                  <path d="M96 24c8 2 10 8 6 14-2-6-6-10-6-14Z" fill="#ffd54a" />
                </svg>
              </div>

              <dl className="ficha-dados">
                <div>
                  <dt>Comprimento</dt>
                  <dd>~ 100 cm</dd>
                </div>
                <div>
                  <dt>Envergadura</dt>
                  <dd>~ 120 cm</dd>
                </div>
                <div>
                  <dt>Maior papagaio</dt>
                  <dd>do mundo</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- busca ---------- */}
      <div className="search-wrap">
        <form className="search" onSubmit={buscar}>
          <div className="search-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={aba === 'pacotes'}
              onClick={() => setAba('pacotes')}
            >
              Pacotes de viagem
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={aba === 'ninho'}
              onClick={() => setAba('ninho')}
            >
              Adote um ninho
            </button>
          </div>

          <div className="search-fields">
            {aba === 'pacotes' ? (
              <>
                <label className="field field-wide">
                  Destino
                  <select value={destino} onChange={(e) => setDestino(e.target.value)}>
                    <option value="todos">Todos os destinos</option>
                    <option value="pantanal-sul">Pantanal Sul (MS)</option>
                    <option value="perigara">Fazenda Perigara (MT)</option>
                  </select>
                </label>
                <label className="field">
                  Data de ida
                  <input type="date" />
                </label>
                <label className="field">
                  Viajantes
                  <input type="number" min="1" max="12" defaultValue="2" />
                </label>
                <button type="submit" className="btn btn-primary">
                  Buscar pacotes
                </button>
              </>
            ) : (
              <>
                <p className="search-note">
                  Escolha o valor do apadrinhamento e receba um certificado digital do seu ninho.
                </p>
                <label className="field">
                  Valor por ano
                  <select defaultValue="500">
                    <option value="300">R$ 300</option>
                    <option value="500">R$ 500</option>
                    <option value="1000">R$ 1.000</option>
                  </select>
                </label>
                <button type="submit" className="btn btn-primary">
                  Ver programa
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* ---------- números ---------- */}
      <section className="stats" aria-label="EcoAzul em números">
        {estatisticas.map((s, i) => (
          <Reveal className="stat" key={s.rotulo} delay={i * 80}>
            <strong>
              <Contador valor={s.valor} prefixo={s.prefixo} sufixo={s.sufixo} />
            </strong>
            <span>{s.rotulo}</span>
          </Reveal>
        ))}
      </section>

      {/* ---------- benefícios ---------- */}
      <section className="benefits">
        {beneficios.map((b, i) => (
          <Reveal className="benefit glow-card" key={b.titulo} delay={i * 90} onPointerMove={seguirMouse}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={b.icone} />
            </svg>
            <div>
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ---------- pacotes ---------- */}
      <section className="section" id="pacotes">
        <Reveal className="section-head">
          <span className="eyebrow mono">01 / Pacotes</span>
          <h2>Pacotes para ver a arara-azul</h2>
          <p>Valores por pessoa. Ajuste o número de viajantes e veja a estimativa na hora.</p>
        </Reveal>

        <div className="chips" role="group" aria-label="Filtrar pacotes">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip-btn ${filtro === c.id ? 'is-active' : ''}`}
              aria-pressed={filtro === c.id}
              onClick={() => setFiltro(c.id)}
            >
              {c.rotulo}
            </button>
          ))}
        </div>

        <div className="offers">
          {visiveis.map((p, i) => {
            const ninho = p.tipo === 'ninho'
            const n = viajantes[p.id] ?? 2
            return (
              <Reveal
                as="article"
                className="offer glow-card"
                key={p.id}
                delay={i * 90}
                onPointerMove={seguirMouse}
              >
                <div className="offer-top">
                  <span className="offer-badge">{p.selo}</span>
                  <span className="mono offer-coord">{p.coord}</span>
                </div>

                <h3>{p.nome}</h3>
                <p className="offer-local">{p.local}</p>
                <span className="chip">{p.duracao}</span>
                <p className="offer-foco">{p.foco}</p>

                {!ninho && (
                  <div className="meters" aria-label="Perfil da experiência">
                    {Object.entries(p.nivel).map(([nome, v]) => (
                      <div className="meter" key={nome}>
                        <span>{nome}</span>
                        <div className="meter-track">
                          <i style={{ '--v': `${v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <details className="offer-details">
                  <summary>Ver detalhes</summary>
                  <ul>
                    {p.atracoes.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Público:</strong> {p.publico}
                  </p>
                  <p>
                    <strong>Inclui:</strong> {p.inclui.join(', ')}
                  </p>
                </details>

                <div className="offer-foot">
                  <div className="offer-price">
                    <span>{ninho ? 'por ano, a partir de' : 'por pessoa, a partir de'}</span>
                    <strong>{reais(p.precoMin)}</strong>
                    <small>até {reais(p.precoMax)}</small>
                  </div>

                  {ninho ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => irPara('ninho')}
                      type="button"
                    >
                      Personalizar
                    </button>
                  ) : (
                    <div className="calc">
                      <div className="stepper" role="group" aria-label="Número de viajantes">
                        <button
                          type="button"
                          onClick={() => ajustarViajantes(p.id, -1)}
                          aria-label="Menos um viajante"
                        >
                          −
                        </button>
                        <span aria-live="polite">{n}</span>
                        <button
                          type="button"
                          onClick={() => ajustarViajantes(p.id, 1)}
                          aria-label="Mais um viajante"
                        >
                          +
                        </button>
                      </div>
                      <div className="calc-total">
                        <span>
                          {n} {n === 1 ? 'viajante' : 'viajantes'} · estimativa
                        </span>
                        <strong>
                          {reais(p.precoMin * n)} – {reais(p.precoMax * n)}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                {!ninho && (
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    onClick={() => setReserva({ pacote: p, viajantes: n })}
                  >
                    Reservar
                  </button>
                )}
              </Reveal>
            )
          })}
        </div>

        {filtro !== 'todos' && (
          <button className="link" type="button" onClick={() => setFiltro('todos')}>
            Mostrar todos os pacotes
          </button>
        )}
      </section>

      {/* ---------- radar / mapa ---------- */}
      <section className="section" id="mapa">
        <Reveal className="section-head">
          <span className="eyebrow mono">02 / Mapa</span>
          <h2>Radar do Pantanal</h2>
          <p>Toque em um ponto para ver o destino. Posições ilustrativas.</p>
        </Reveal>

        <Reveal className="radar-layout">
          <div className="radar" role="group" aria-label="Radar com os destinos">
            <div className="radar-sweep" aria-hidden="true" />
            <div className="radar-ring r1" aria-hidden="true" />
            <div className="radar-ring r2" aria-hidden="true" />
            <div className="radar-ring r3" aria-hidden="true" />
            <div className="radar-cross" aria-hidden="true" />
            <span className="mono radar-n" aria-hidden="true">
              N
            </span>

            {pacotes
              .filter((p) => p.mapa)
              .map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`pin ${pinoAtivo === p.id ? 'is-active' : ''}`}
                  style={{ left: `${p.mapa.x}%`, top: `${p.mapa.y}%` }}
                  onClick={() => setPinoAtivo(p.id)}
                  aria-label={p.nome}
                  aria-pressed={pinoAtivo === p.id}
                >
                  <i />
                  <span className="mono">{p.id === 'perigara' ? 'MT' : 'MS'}</span>
                </button>
              ))}
          </div>

          <aside className="radar-info" aria-live="polite">
            <span className="mono eyebrow">{pino.coord}</span>
            <h3>{pino.nome}</h3>
            <p className="offer-local">{pino.local}</p>
            <p>{pino.foco}</p>
            <ul className="radar-facts">
              <li>
                <span>Duração</span>
                <strong>{pino.duracao}</strong>
              </li>
              <li>
                <span>A partir de</span>
                <strong>{reais(pino.precoMin)}</strong>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setFiltro(pino.id)
                irPara('pacotes')
              }}
            >
              Ver este pacote
            </button>
          </aside>
        </Reveal>
      </section>

      {/* ---------- conheça a arara ---------- */}
      <section className="section" id="arara">
        <Reveal className="section-head">
          <span className="eyebrow mono">03 / Conhecimento</span>
          <h2>Conheça a arara-azul</h2>
          <p>Por que ela merece ser vista de perto, e protegida.</p>
        </Reveal>

        <Reveal className="learn">
          <div className="learn-tabs" role="tablist" aria-label="Sobre a arara-azul">
            {abasArara.map((a) => (
              <button
                key={a.id}
                role="tab"
                type="button"
                aria-selected={abaArara === a.id}
                onClick={() => setAbaArara(a.id)}
              >
                {a.rotulo}
              </button>
            ))}
          </div>
          {abasArara
            .filter((a) => a.id === abaArara)
            .map((a) => (
              <div className="learn-panel" key={a.id} role="tabpanel">
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
              </div>
            ))}
        </Reveal>
      </section>

      {/* ---------- adote um ninho ---------- */}
      <section className="section" id="ninho">
        <Reveal className="section-head">
          <span className="eyebrow mono">04 / Apadrinhe</span>
          <h2>Adote um ninho</h2>
          <p>Escolha o valor, digite seu nome e veja seu certificado digital ganhar forma.</p>
        </Reveal>

        <Reveal className="adopt">
          <div className="adopt-form glow-card" onPointerMove={seguirMouse}>
            <label className="field">
              Seu nome
              <input
                value={nomePadrinho}
                onChange={(e) => setNomePadrinho(e.target.value)}
                placeholder="Como aparecerá no certificado"
                maxLength={32}
                autoComplete="name"
              />
            </label>

            <label className="field">
              <span className="range-label">
                Valor por ano <strong>{reais(valorNinho)}</strong>
              </span>
              <input
                type="range"
                min="300"
                max="1000"
                step="50"
                value={valorNinho}
                onChange={(e) => setValorNinho(Number(e.target.value))}
                style={{ '--pct': `${((valorNinho - 300) / 700) * 100}%` }}
              />
              <span className="range-scale mono">
                <span>R$ 300</span>
                <span>R$ 1.000</span>
              </span>
            </label>

            <p className="adopt-level">
              Nível <strong>{nivelPadrinho}</strong>
            </p>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() =>
                setReserva({ pacote: ninhoPacote, valor: valorNinho, nome: nomePadrinho })
              }
            >
              Adotar este ninho
            </button>
          </div>

          <div className="cert" aria-label="Pré-visualização do certificado">
            <div className="cert-inner">
              <span className="mono cert-top">CERTIFICADO DIGITAL</span>
              <p className="cert-small">A EcoAzul certifica que</p>
              <p className="cert-name">{nomePadrinho.trim() || 'Seu nome aqui'}</p>
              <p className="cert-small">é {nivelPadrinho.toLowerCase()} de um ninho de arara-azul</p>
              <div className="cert-row">
                <div>
                  <span className="mono">CÓDIGO</span>
                  <strong className="mono">{codigoNinho(nomePadrinho)}</strong>
                </div>
                <div>
                  <span className="mono">APOIO</span>
                  <strong className="mono">{reais(valorNinho)}/ano</strong>
                </div>
                <div>
                  <span className="mono">VALIDADE</span>
                  <strong className="mono">1 ano</strong>
                </div>
              </div>
              <span className="cert-seal" aria-hidden="true">
                ✦
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- faq ---------- */}
      <section className="section section-narrow" id="faq">
        <Reveal className="section-head">
          <span className="eyebrow mono">05 / Dúvidas</span>
          <h2>Perguntas frequentes</h2>
        </Reveal>

        <Reveal className="faq">
          {faq.map((f, i) => {
            const aberta = faqAberta === i
            return (
              <div className={`faq-item ${aberta ? 'is-open' : ''}`} key={f.p}>
                <button
                  type="button"
                  aria-expanded={aberta}
                  onClick={() => setFaqAberta(aberta ? -1 : i)}
                >
                  {f.p}
                  <span aria-hidden="true">+</span>
                </button>
                <div className="faq-body">
                  <p>{f.r}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </section>

      {/* ---------- destaque ---------- */}
      <section className="spotlight" id="sobre">
        <Reveal className="spotlight-inner">
          <p className="spotlight-fact">
            Cerca de 15% de todas as araras-azuis do mundo vivem na Fazenda São Francisco do
            Perigara.
          </p>
          <p className="spotlight-text">
            A EcoAzul leva você até elas, com guias especializados e acesso a áreas preservadas, e
            também permite apadrinhar um ninho monitorado, em parceria com centros de preservação
            como o Instituto Arara Azul.
          </p>
          <a href="#pacotes" className="btn btn-primary">
            Escolher meu pacote
          </a>
        </Reveal>
      </section>

      <ReserveDialog dados={reserva} onClose={() => setReserva(null)} />
    </main>
  )
}

export default Home
import { useEffect, useRef, useState } from 'react'

// Mostra o elemento com animação quando ele entra na tela
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...resto }) {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)
  const [pronto, setPronto] = useState(false) // depois da entrada, remove o atraso (não atrapalha o hover)

  useEffect(() => {
    if (!visivel) return
    const t = setTimeout(() => setPronto(true), delay + 900)
    return () => clearTimeout(t)
  }, [visivel, delay])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visivel ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: pronto ? '0ms' : `${delay}ms` }}
      {...resto}
    >
      {children}
    </Tag>
  )
}

export default Reveal
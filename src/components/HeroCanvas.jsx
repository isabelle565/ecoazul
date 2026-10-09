import { useEffect, useRef } from 'react'

// Rede de pontos que reage ao mouse. A cor vem do tema (--particle).
function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const pai = canvas.parentElement
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let pontos = []
    let raf = 0
    let visivel = true
    const mouse = { x: -9999, y: -9999 }

    const corAtual = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--particle').trim() || '56,169,255'
    let cor = corAtual()

    const montar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = pai.clientWidth
      h = pai.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const qtd = Math.round(Math.min(110, (w * h) / 12000))
      pontos = Array.from({ length: qtd }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
    }

    const desenhar = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pontos) {
        if (!reduz) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        // mouse atrai levemente
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < 160 && d > 1) {
          p.x += (dx / d) * 0.6
          p.y += (dy / d) * 0.6
        }
      }
      // linhas entre pontos próximos (e entre pontos e o mouse)
      for (let i = 0; i < pontos.length; i++) {
        const a = pontos[i]
        for (let j = i + 1; j < pontos.length; j++) {
          const b = pontos[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.strokeStyle = `rgba(${cor}, ${(1 - d / 120) * 0.35})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < 170) {
          ctx.strokeStyle = `rgba(${cor}, ${(1 - dm / 170) * 0.7})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
        ctx.fillStyle = `rgba(${cor}, 0.85)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const quadro = () => {
      if (visivel) desenhar()
      raf = requestAnimationFrame(quadro)
    }

    const mover = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const sair = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    montar()
    raf = requestAnimationFrame(quadro)

    // pausa quando o hero sai da tela
    const obs = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
    })
    obs.observe(pai)

    // reage à troca de tema
    const mut = new MutationObserver(() => {
      cor = corAtual()
    })
    mut.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    pai.addEventListener('pointermove', mover)
    pai.addEventListener('pointerleave', sair)
    window.addEventListener('resize', montar)

    return () => {
      cancelAnimationFrame(raf)
      obs.disconnect()
      mut.disconnect()
      pai.removeEventListener('pointermove', mover)
      pai.removeEventListener('pointerleave', sair)
      window.removeEventListener('resize', montar)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}

export default HeroCanvas
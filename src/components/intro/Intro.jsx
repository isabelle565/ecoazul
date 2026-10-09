import { useEffect, useRef, useState } from 'react'
import './Intro.css'

const PALAVRA = 'EcoAzul'
const COR = '159, 220, 255' // azul clarinho (rgb)
const SAIR_EM = 9000 // sai sozinha depois de 9s
const FADE = 700

function Intro({ onFinish }) {
  const canvasRef = useRef(null)
  const [saindo, setSaindo] = useState(false)

  // trava a rolagem enquanto a vinheta está aberta
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // saída (automática ou pelo botão)
  useEffect(() => {
    if (!saindo) return
    const t = setTimeout(onFinish, FADE)
    return () => clearTimeout(t)
  }, [saindo, onFinish])

  useEffect(() => {
    const t = setTimeout(() => setSaindo(true), SAIR_EM)
    return () => clearTimeout(t)
  }, [])

  // ---------- animação das partículas ----------
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let largura = 0
    let altura = 0
    let dpr = 1
    let particulas = []
    let raf = 0
    let cancelado = false
    const ponteiro = { x: -9999, y: -9999, ativo: false }
    const ondas = [] // ondas de choque criadas pelo clique

    // lê os pixels da palavra desenhada fora da tela e vira pontos
    const montar = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      largura = window.innerWidth
      altura = window.innerHeight
      canvas.width = largura * dpr
      canvas.height = altura * dpr
      canvas.style.width = `${largura}px`
      canvas.style.height = `${altura}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const tamanhoFonte = Math.min(largura * 0.2, 230)
      const off = document.createElement('canvas')
      off.width = largura
      off.height = altura
      const o = off.getContext('2d')
      o.fillStyle = '#fff'
      o.textAlign = 'center'
      o.textBaseline = 'middle'
      o.font = `800 ${tamanhoFonte}px "Bricolage Grotesque", system-ui, sans-serif`
      o.fillText(PALAVRA, largura / 2, altura / 2)

      const passo = largura < 600 ? 3 : 3
      const dados = o.getImageData(0, 0, largura, altura).data
      const alvos = []
      for (let y = 0; y < altura; y += passo) {
        for (let x = 0; x < largura; x += passo) {
          if (dados[(y * largura + x) * 4 + 3] > 128) alvos.push([x, y])
        }
      }

      // reaproveita partículas existentes (ao redimensionar) ou cria novas
      particulas = alvos.map(([tx, ty], i) => {
        const antiga = particulas[i]
        const lado = Math.random() * Math.PI * 2
        const raio = Math.max(largura, altura) * (0.6 + Math.random() * 0.5)
        return {
          x: antiga ? antiga.x : reduzMovimento ? tx : largura / 2 + Math.cos(lado) * raio,
          y: antiga ? antiga.y : reduzMovimento ? ty : altura / 2 + Math.sin(lado) * raio,
          vx: 0,
          vy: 0,
          tx,
          ty,
          r: 1.1 + Math.random() * 0.7,
          a: 0.8 + Math.random() * 0.2,
          fase: Math.random() * Math.PI * 2,
        }
      })
    }

    const quadro = (tempo) => {
      ctx.clearRect(0, 0, largura, altura)
      const raioPonteiro = Math.max(70, Math.min(largura, altura) * 0.12)

      for (let i = ondas.length - 1; i >= 0; i--) {
        ondas[i].r += 14
        if (ondas[i].r > Math.max(largura, altura)) ondas.splice(i, 1)
      }

      for (const p of particulas) {
        // mola em direção ao ponto da letra
        p.vx += (p.tx - p.x) * 0.045
        p.vy += (p.ty - p.y) * 0.045

        // o cursor / dedo empurra as partículas
        if (ponteiro.ativo) {
          const dx = p.x - ponteiro.x
          const dy = p.y - ponteiro.y
          const d2 = dx * dx + dy * dy
          if (d2 < raioPonteiro * raioPonteiro && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const forca = (1 - d / raioPonteiro) * 5
            p.vx += (dx / d) * forca
            p.vy += (dy / d) * forca
          }
        }

        // ondas de choque (clique)
        for (const w of ondas) {
          const dx = p.x - w.x
          const dy = p.y - w.y
          const d = Math.sqrt(dx * dx + dy * dy) || 1
          if (Math.abs(d - w.r) < 26) {
            p.vx += (dx / d) * 4
            p.vy += (dy / d) * 4
          }
        }

        p.vx *= 0.84
        p.vy *= 0.84
        p.x += p.vx
        p.y += p.vy

        // brilho "respirando"
        const pulso = 0.8 + 0.2 * Math.sin(tempo / 700 + p.fase)
        ctx.fillStyle = `rgba(${COR}, ${p.a * pulso})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(quadro)
    }

    // espera a fonte carregar antes de medir a palavra
    const iniciar = () => {
      if (cancelado) return
      montar()
      raf = requestAnimationFrame(quadro)
    }
    if (document.fonts && document.fonts.load) {
      Promise.race([
        document.fonts.load('800 100px "Bricolage Grotesque"'),
        new Promise((r) => setTimeout(r, 1200)),
      ]).then(iniciar, iniciar)
    } else {
      iniciar()
    }

    const mover = (e) => {
      ponteiro.x = e.clientX
      ponteiro.y = e.clientY
      ponteiro.ativo = true
    }
    const sair = () => {
      ponteiro.ativo = false
    }
    const clicar = (e) => {
      ondas.push({ x: e.clientX, y: e.clientY, r: 0 })
    }
    const redimensionar = () => montar()

    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerdown', mover)
    window.addEventListener('pointerdown', clicar)
    window.addEventListener('pointerup', sair)
    window.addEventListener('pointerleave', sair)
    window.addEventListener('resize', redimensionar)

    return () => {
      cancelado = true
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerdown', mover)
      window.removeEventListener('pointerdown', clicar)
      window.removeEventListener('pointerup', sair)
      window.removeEventListener('pointerleave', sair)
      window.removeEventListener('resize', redimensionar)
    }
  }, [])

  return (
    <section className={`intro ${saindo ? 'intro-saindo' : ''}`} aria-label="Vinheta EcoAzul">
      <h1 className="intro-sr">{PALAVRA}</h1>
      <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />

      <button
        type="button"
        className="intro-entrar"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => setSaindo(true)}
      >
        entrar
        <span aria-hidden="true"> →</span>
      </button>
    </section>
  )
}

export default Intro
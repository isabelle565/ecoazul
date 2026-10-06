import { useEffect, useState } from 'react'
import './Intro.css'

import logoEcoAzul from '../../assets/logo-ecoazul.png'

const LEAVE_AT = 4200 // começa a sair
const END_AT = 5000 // some da tela

function Bird({ className }) {
  return (
    <svg
      className={`intro-flock ${className}`}
      viewBox="0 0 60 24"
      aria-hidden="true"
    >
      <path d="M0 14 Q15 0 30 12 Q45 0 60 14 Q45 8 30 18 Q15 8 0 14Z" />
    </svg>
  )
}

function Intro() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  // trava a rolagem enquanto a vinheta está aberta e libera quando ela some
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), LEAVE_AT)
    const endTimer = setTimeout(() => setVisible(false), END_AT)

    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(endTimer)
    }
  }, [])

  const skipIntro = () => {
    setLeaving(true)
    setTimeout(() => setVisible(false), 600)
  }

  if (!visible) {
    return null
  }

  return (
    <section className={`intro ${leaving ? 'intro-leaving' : ''}`}>

      {/* FUNDO EM CAMADAS */}
      <div className="intro-background">
        <div className="intro-sun" />
        <div className="intro-rays" />
        <div className="intro-mountain intro-mountain-one" />
        <div className="intro-mountain intro-mountain-two" />
        <div className="intro-mist" />
        <div className="intro-forest" />
      </div>

      {/* BANDO DE ARARAS ATRAVESSANDO */}
      <Bird className="flock-1" />
      <Bird className="flock-2" />
      <Bird className="flock-3" />

      {/* CONTEÚDO */}
      <div className="intro-stage">
        <div className="intro-glow" />

        <img
          className="intro-logo"
          src={logoEcoAzul}
          alt="EcoAzul"
        />

        <p className="intro-tagline">
          Viva a natureza. Preserve o futuro.
        </p>
      </div>

      <button
        className="skip-intro"
        onClick={skipIntro}
        type="button"
      >
        <span>Pular vinheta</span>
        <span className="skip-arrow">→</span>
      </button>

      <div className="intro-progress">
        <div className="intro-progress-bar" />
      </div>

    </section>
  )
}

export default Intro
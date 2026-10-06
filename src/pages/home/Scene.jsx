// Ilustrações simples de cada experiência (substituíveis por fotos reais)
function Scene({ tipo }) {
  return (
    <div className={`scene scene-${tipo}`} aria-hidden="true">
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
        {tipo === 'sul' && (
          <>
            <rect width="400" height="220" fill="#bfe3f2" />
            <circle cx="320" cy="50" r="26" fill="#f9c74f" />
            <path d="M0 120 Q100 90 200 115 T400 105 V220 H0Z" fill="#2f8a5c" />
            <path d="M0 160 Q120 135 240 158 T400 150 V220 H0Z" fill="#176b45" />
            <ellipse cx="150" cy="170" rx="95" ry="26" fill="#0f4a30" />
            <ellipse cx="150" cy="174" rx="70" ry="16" fill="#0077b6" />
          </>
        )}
        {tipo === 'perigara' && (
          <>
            <rect width="400" height="130" fill="#f9c74f" />
            <rect y="60" width="400" height="70" fill="#f4a261" opacity=".55" />
            <circle cx="110" cy="105" r="42" fill="#fff8e7" opacity=".9" />
            <rect y="130" width="400" height="90" fill="#0077b6" />
            <rect y="130" width="400" height="6" fill="#005a8c" opacity=".5" />
            <path d="M250 130 V70 M290 130 V70 M240 70 H300 M250 100 H290" stroke="#0f4a30" strokeWidth="5" fill="none" />
            <path d="M0 130 Q60 112 120 130 T240 130 T400 128 V140 H0Z" fill="#176b45" />
          </>
        )}
        {tipo === 'ninho' && (
          <>
            <rect width="400" height="220" fill="#176b45" />
            <circle cx="90" cy="40" r="60" fill="#2f8a5c" opacity=".6" />
            <circle cx="330" cy="190" r="80" fill="#0f4a30" opacity=".7" />
            <rect x="170" y="0" width="70" height="220" fill="#7a4a2a" />
            <rect x="170" y="0" width="14" height="220" fill="#5e3a21" />
            <ellipse cx="205" cy="105" rx="19" ry="26" fill="#2b1810" />
          </>
        )}
      </svg>
    </div>
  )
}

export default Scene
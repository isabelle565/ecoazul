import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Intro from './components/intro/Intro'
import Layout from './layout/layout.jsx'
import { paginaNaoEncontrada as NaoEncontrada, rotas } from './Routes.js'

function App() {
  // A vinheta aparece uma vez por visita, por cima do site.
  const [introFinalizada, setIntroFinalizada] = useState(false)

  return (
    <>
      {!introFinalizada && <Intro onFinish={() => setIntroFinalizada(true)} />}

      <Routes>
        {/* Layout = cabeçalho + rodapé iguais em todas as páginas */}
        <Route element={<Layout />}>
          {rotas.map(({ path, pagina: Pagina }) => (
            <Route key={path} path={path} element={<Pagina />} />
          ))}
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
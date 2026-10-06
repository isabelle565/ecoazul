import { useEffect, useRef, useState } from 'react'
import { reais } from '../../data/Pacotes.js'

function ReserveDialog({ pacote, onClose }) {
  const ref = useRef(null)
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    const dlg = ref.current
    if (pacote && !dlg.open) dlg.showModal()
    if (!pacote && dlg.open) dlg.close()
    setEnviado(false)
  }, [pacote])

  const ninho = pacote?.tipo === 'ninho'

  return (
    <dialog ref={ref} className="dialog" onClose={onClose}>
      {pacote && (
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault()
            setEnviado(true)
          }}
        >
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>

          {enviado ? (
            <div className="dialog-done">
              <h3>Pedido recebido</h3>
              <p>
                Registramos seu interesse em <strong>{pacote.nome}</strong>.
                Em um site real, a equipe da EcoAzul entraria em contato por e-mail.
              </p>
              <button type="button" className="btn btn-red" onClick={onClose}>
                Fechar
              </button>
            </div>
          ) : (
            <>
              <h3>{ninho ? 'Adotar um ninho' : `Reservar ${pacote.nome}`}</h3>
              <p className="dialog-sub">
                {pacote.duracao} · {reais(pacote.precoMin)} a {reais(pacote.precoMax)}
                {ninho ? ' por ano' : ' por pessoa'}
              </p>

              <label>
                Nome completo
                <input required name="nome" autoComplete="name" />
              </label>
              <label>
                E-mail
                <input required type="email" name="email" autoComplete="email" />
              </label>
              {ninho ? (
                <label>
                  Valor do apadrinhamento
                  <select name="valor" defaultValue="500">
                    <option value="300">R$ 300 por ano</option>
                    <option value="500">R$ 500 por ano</option>
                    <option value="1000">R$ 1.000 por ano</option>
                  </select>
                </label>
              ) : (
                <label>
                  Número de viajantes
                  <input type="number" name="viajantes" min="1" max="12" defaultValue="2" />
                </label>
              )}

              <button type="submit" className="btn btn-red btn-block">
                {ninho ? 'Enviar pedido de adoção' : 'Enviar pedido de reserva'}
              </button>
            </>
          )}
        </form>
      )}
    </dialog>
  )
}

export default ReserveDialog
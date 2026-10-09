import { useEffect, useRef, useState } from 'react'
import { reais } from '../../data/Pacotes.js'

// `dados` = { pacote, viajantes?, valor?, nome? } ou null (fechado)
function ReserveDialog({ dados, onClose }) {
  const ref = useRef(null)
  // guarda QUAL pedido foi enviado; ao abrir outro pedido, volta ao formulário sozinho
  const [enviadoPara, setEnviadoPara] = useState(null)
  const enviado = enviadoPara === dados

  useEffect(() => {
    const dlg = ref.current
    if (dados && !dlg.open) dlg.showModal()
    if (!dados && dlg.open) dlg.close()
  }, [dados])

  const pacote = dados?.pacote
  const ninho = pacote?.tipo === 'ninho'

  // fecha ao clicar fora da janela
  const aoClicarFora = (e) => {
    if (e.target === ref.current) onClose()
  }

  return (
    <dialog ref={ref} className="dialog" onClose={onClose} onClick={aoClicarFora}>
      {pacote && (
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault()
            setEnviadoPara(dados)
          }}
        >
          <button type="button" className="dialog-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>

          {enviado ? (
            <div className="dialog-done">
              <div className="dialog-check" aria-hidden="true">
                ✓
              </div>
              <h3>Pedido recebido</h3>
              <p>
                Registramos seu interesse em <strong>{pacote.nome}</strong>. Em um site real, a
                equipe da EcoAzul entraria em contato por e-mail.
              </p>
              <button type="button" className="btn btn-primary" onClick={onClose}>
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
                <input required name="nome" autoComplete="name" defaultValue={dados.nome || ''} />
              </label>
              <label>
                E-mail
                <input required type="email" name="email" autoComplete="email" />
              </label>
              {ninho ? (
                <label>
                  Valor do apadrinhamento
                  <select name="valor" defaultValue={String(dados.valor || 500)}>
                    {[300, 400, 500, 600, 700, 800, 900, 1000].map((v) => (
                      <option key={v} value={v}>
                        {reais(v)} por ano
                      </option>
                    ))}
                    {![300, 400, 500, 600, 700, 800, 900, 1000].includes(dados.valor) && dados.valor && (
                      <option value={dados.valor}>{reais(dados.valor)} por ano</option>
                    )}
                  </select>
                </label>
              ) : (
                <label>
                  Número de viajantes
                  <input
                    type="number"
                    name="viajantes"
                    min="1"
                    max="12"
                    defaultValue={dados.viajantes || 2}
                  />
                </label>
              )}

              <button type="submit" className="btn btn-primary btn-block">
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

// Importa o hook useState do React.
// Ele permite criar e controlar estados dentro do componente.
import { useState } from 'react'

// Importa os estilos específicos da página Home.
import './Home.css'

// Importa a imagem da logo EcoAzul.
import logoEcoAzul from '../../assets/logo-ecoazul.png'

// Importa os dados dos pacotes e uma função responsável por
// formatar os valores para o formato de moeda brasileira.
import { pacotes, reais } from '../../data/Pacotes.js'

// Importa o componente visual usado para representar a cena
// de cada pacote.
import Scene from '../home/Scene.jsx'

// Importa o componente responsável pela janela de reserva.
import ReserveDialog from '../home/ReserveDialog.jsx'


// ============================================================
// BENEFÍCIOS
// ============================================================

// Array contendo os benefícios apresentados na página.
// Cada objeto representa um benefício diferente.
const beneficios = [
  {
    // Título que será mostrado para o usuário.
    titulo: 'Guias especializados',

    // Texto explicativo do benefício.
    texto: 'Acompanhamento de quem conhece as araras e os ninhos de perto.',

    // Caminho SVG usado como ícone.
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


// ============================================================
// COMPONENTE HOME
// ============================================================

// Componente principal da página inicial.
function Home() {

  // Estado que controla qual aba da busca está selecionada.
  // Pode ser "pacotes" ou "ninho".
  const [aba, setAba] = useState('pacotes')

  // Estado que guarda o destino escolhido pelo usuário.
  // Inicialmente mostra todos os destinos.
  const [destino, setDestino] = useState('todos')

  // Estado responsável por controlar qual filtro de pacotes
  // está sendo aplicado.
  const [filtro, setFiltro] = useState('todos')

  // Estado que guarda o pacote selecionado para reserva.
  // Quando é null, nenhum pacote está selecionado.
  const [reserva, setReserva] = useState(null)


  // ==========================================================
  // FUNÇÃO DE BUSCA
  // ==========================================================

  // Executada quando o formulário de busca é enviado.
  const buscar = (e) => {

    // Impede o comportamento padrão do formulário,
    // que seria recarregar a página.
    e.preventDefault()

    // Se a aba atual for "pacotes", utiliza o destino escolhido.
    // Caso contrário, define o filtro como "ninho".
    setFiltro(aba === 'pacotes' ? destino : 'ninho')

    // Depois da busca, rola a página automaticamente
    // até a seção de pacotes.
    document.getElementById('pacotes').scrollIntoView({
      behavior: 'smooth',
    })
  }


  // ==========================================================
  // FILTRAGEM DOS PACOTES
  // ==========================================================

  // Cria uma nova lista contendo somente os pacotes
  // que devem aparecer na tela.
  const visiveis = pacotes.filter(
    (p) =>
      // Mostra todos quando o filtro é "todos".
      filtro === 'todos' ||

      // Ou mostra o pacote cujo ID corresponde ao filtro.
      p.id === filtro ||

      // Ou mostra pacotes do tipo "ninho" quando necessário.
      (filtro !== 'ninho' && p.tipo === 'ninho'),
  )


  // ==========================================================
  // INTERFACE DA PÁGINA
  // ==========================================================

  return (
    <main className="home">

      {/* ======================================================
          BARRA SUPERIOR
          ====================================================== */}

      {/* Pequena barra informativa no topo do site. */}
      <div className="topbar">

        {/* Informação principal da barra. */}
        <span>Observação da arara-azul no Pantanal</span>

        {/* Link que leva o usuário até a seção de adoção. */}
        <a href="#ninho">
          Adote um ninho a partir de R$ 300 por ano
        </a>
      </div>


      {/* ======================================================
          CABEÇALHO / NAVBAR
          ====================================================== */}

      <header className="header">

        {/* Logo clicável.
            Ao clicar, o usuário volta para o início da página. */}
        <a href="#inicio" className="header-logo">
          <img src={logoEcoAzul} alt="EcoAzul" />
        </a>


        {/* Menu de navegação principal. */}
        <nav className="header-nav" aria-label="Principal">

          {/* Link para os pacotes. */}
          <a href="#pacotes">Pacotes</a>

          {/* Link para adoção de ninho. */}
          <a href="#ninho">Adote um ninho</a>

          {/* Link para a seção sobre a EcoAzul. */}
          <a href="#sobre">Sobre</a>
        </nav>


        {/* Botão que leva diretamente para os pacotes. */}
        <a href="#pacotes" className="btn btn-red btn-small">
          Ver pacotes
        </a>
      </header>


      {/* ======================================================
          HERO
          ====================================================== */}

      {/* Primeira seção principal da página. */}
      <section className="hero" id="inicio">

        <div className="hero-inner">

          {/* Textos principais do site. */}
          <div className="hero-text">

            {/* Título principal. */}
            <h1>Veja a arara-azul de perto, no Pantanal.</h1>

            {/* Texto de apresentação. */}
            <p>
              Pacotes de ecoturismo e expedições fotográficas, com guias
              especializados e hospedagem na natureza.
            </p>
          </div>


          {/* Logo/imagem exibida na área principal. */}
          <img
            className="hero-bird"
            src={logoEcoAzul}
            alt="EcoAzul"
          />
        </div>


        {/* SVG usado para criar o efeito de paisagem/morros
            na parte inferior do Hero. */}
        <svg
          className="hero-hills"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >

          {/* Primeira camada da paisagem. */}
          <path
            d="M0 70 Q240 20 480 60 T960 50 T1440 40 V120 H0Z"
            fill="#9fd0b0"
            opacity=".7"
          />

          {/* Segunda camada da paisagem. */}
          <path
            d="M0 95 Q300 55 600 90 T1200 80 T1440 85 V120 H0Z"
            fill="#fff8e7"
          />
        </svg>
      </section>


      {/* ======================================================
          FORMULÁRIO DE BUSCA
          ====================================================== */}

      <div className="search-wrap">

        {/* Formulário responsável pela pesquisa. */}
        <form className="search" onSubmit={buscar}>

          {/* Abas que permitem escolher entre:
              Pacotes de viagem
              ou
              Adote um ninho */}
          <div className="search-tabs" role="tablist">

            {/* Aba de pacotes. */}
            <button
              type="button"
              role="tab"
              aria-selected={aba === 'pacotes'}
              onClick={() => setAba('pacotes')}
            >
              Pacotes de viagem
            </button>


            {/* Aba de adoção. */}
            <button
              type="button"
              role="tab"
              aria-selected={aba === 'ninho'}
              onClick={() => setAba('ninho')}
            >
              Adote um ninho
            </button>
          </div>


          {/* ==================================================
              CAMPOS DA BUSCA
              ================================================== */}

          <div className="search-fields">

            {/* Operador ternário:
                se a aba for "pacotes", mostra os campos de viagem.
                caso contrário, mostra os campos de adoção. */}

            {aba === 'pacotes' ? (

              <>

                {/* Campo de seleção do destino. */}
                <label className="field field-wide">
                  Destino

                  <select
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                  >
                    <option value="todos">
                      Todos os destinos
                    </option>

                    <option value="pantanal-sul">
                      Pantanal Sul (MS)
                    </option>

                    <option value="perigara">
                      Fazenda Perigara (MT)
                    </option>
                  </select>
                </label>


                {/* Campo para escolher a data da viagem. */}
                <label className="field">
                  Data de ida
                  <input type="date" />
                </label>


                {/* Campo para quantidade de viajantes. */}
                <label className="field">
                  Viajantes

                  <input
                    type="number"
                    min="1"
                    max="12"
                    defaultValue="2"
                  />
                </label>


                {/* Botão que envia o formulário. */}
                <button type="submit" className="btn btn-red">
                  Buscar pacotes
                </button>

              </>

            ) : (

              <>

                {/* Texto explicativo do programa de adoção. */}
                <p className="search-note">
                  Escolha o valor do apadrinhamento e receba um certificado digital
                  do seu ninho.
                </p>


                {/* Campo para selecionar o valor anual. */}
                <label className="field">
                  Valor por ano

                  <select defaultValue="500">
                    <option value="300">R$ 300</option>
                    <option value="500">R$ 500</option>
                    <option value="1000">R$ 1.000</option>
                  </select>
                </label>


                {/* Botão para acessar o programa. */}
                <button type="submit" className="btn btn-red">
                  Ver programa
                </button>

              </>

            )}
          </div>
        </form>
      </div>


      {/* ======================================================
          BENEFÍCIOS
          ====================================================== */}

      <section className="benefits">

        {/* Percorre o array "beneficios" e cria um elemento
            para cada benefício. */}
        {beneficios.map((b) => (

          <div className="benefit" key={b.titulo}>

            {/* Ícone SVG do benefício. */}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={b.icone} />
            </svg>


            {/* Conteúdo textual do benefício. */}
            <div>

              {/* Título do benefício. */}
              <h3>{b.titulo}</h3>

              {/* Descrição do benefício. */}
              <p>{b.texto}</p>
            </div>
          </div>
        ))}
      </section>


      {/* ======================================================
          PACOTES
          ====================================================== */}

      <section className="section" id="pacotes">

        {/* Cabeçalho da seção. */}
        <div className="section-head">

          <h2>Pacotes para ver a arara-azul</h2>

          <p>
            Valores por pessoa.

            {/* Só aparece quando algum filtro está ativo. */}
            {filtro !== 'todos' && (

              <button
                className="link"
                type="button"
                onClick={() => setFiltro('todos')}
              >
                Mostrar todos
              </button>
            )}
          </p>
        </div>


        {/* Lista dos pacotes filtrados. */}
        <div className="offers">

          {visiveis.map((p) => (

            // Cada pacote é transformado em um <article>.
            <article
              className="offer"
              key={p.id}

              // Se o pacote for do tipo "ninho",
              // recebe o ID "ninho" para permitir navegação por âncora.
              id={p.tipo === 'ninho' ? 'ninho' : undefined}
            >

              {/* Imagem/cena do pacote. */}
              <div className="offer-media">

                {/* Componente Scene recebe o tipo da cena
                    através da propriedade "tipo". */}
                <Scene tipo={p.cena} />

                {/* Selo do pacote. */}
                <span className="offer-badge">
                  {p.selo}
                </span>
              </div>


              {/* Informações do pacote. */}
              <div className="offer-body">

                {/* Nome do pacote. */}
                <h3>{p.nome}</h3>

                {/* Localização. */}
                <p className="offer-local">
                  {p.local}
                </p>

                {/* Duração da viagem. */}
                <span className="chip">
                  {p.duracao}
                </span>

                {/* Principal objetivo/experiência do pacote. */}
                <p className="offer-foco">
                  {p.foco}
                </p>


                {/* ==================================================
                    DETALHES DO PACOTE
                    ================================================== */}

                {/* <details> cria uma área expansível.
                    O usuário pode clicar em "Ver detalhes". */}
                <details className="offer-details">

                  <summary>Ver detalhes</summary>

                  {/* Lista de atrações. */}
                  <ul>
                    {p.atracoes.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>

                  {/* Público recomendado. */}
                  <p>
                    <strong>Público:</strong> {p.publico}
                  </p>

                  {/* Itens incluídos no pacote. */}
                  <p>
                    <strong>Inclui:</strong> {p.inclui.join(', ')}
                  </p>
                </details>


                {/* ==================================================
                    PREÇO + BOTÃO
                    ================================================== */}

                <div className="offer-foot">

                  {/* Área que apresenta os preços. */}
                  <div className="offer-price">

                    {/* Texto muda dependendo se é pacote ou ninho. */}
                    <span>
                      {p.tipo === 'ninho'
                        ? 'por ano, a partir de'
                        : 'por pessoa, a partir de'}
                    </span>


                    {/* Preço mínimo formatado em reais. */}
                    <strong>
                      {reais(p.precoMin)}
                    </strong>


                    {/* Preço máximo. */}
                    <small>
                      até {reais(p.precoMax)}
                    </small>
                  </div>


                  {/* ==================================================
                      BOTÃO DE AÇÃO
                      ================================================== */}

                  <button
                    className="btn btn-red"

                    // Quando clicado, salva o pacote no estado
                    // "reserva".
                    onClick={() => setReserva(p)}
                  >

                    {/* O texto do botão muda dependendo do tipo. */}
                    {p.tipo === 'ninho'
                      ? 'Adotar'
                      : 'Reservar'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ======================================================
          DESTAQUE / SOBRE
          ====================================================== */}

      <section className="spotlight" id="sobre">

        <div className="spotlight-inner">

          {/* Informação de destaque sobre as araras. */}
          <p className="spotlight-fact">
            Cerca de 15% de todas as araras-azuis do mundo vivem na Fazenda
            São Francisco do Perigara.
          </p>


          {/* Texto explicando a proposta da EcoAzul. */}
          <p className="spotlight-text">
            A EcoAzul leva você até elas, com guias especializados e acesso
            a áreas preservadas, e também permite apadrinhar um ninho
            monitorado, em parceria com centros de preservação como o
            Instituto Arara Azul.
          </p>


          {/* Botão que leva para os pacotes. */}
          <a href="#pacotes" className="btn btn-forest">
            Escolher meu pacote
          </a>
        </div>
      </section>


      {/* ======================================================
          RODAPÉ
          ====================================================== */}

      <footer className="footer">

        <div className="footer-cols">

          {/* Informações principais da EcoAzul. */}
          <div>

            <img
              src={logoEcoAzul}
              alt="EcoAzul"
              className="footer-logo"
            />

            <p>
              Turismo de observação e conservação da arara-azul.
            </p>
          </div>


          {/* Links relacionados aos pacotes. */}
          <div>

            <h4>Pacotes</h4>

            <a href="#pacotes">
              Pantanal Sul (MS)
            </a>

            <a href="#pacotes">
              Fazenda Perigara (MT)
            </a>
          </div>


          {/* Links relacionados ao programa de adoção. */}
          <div>

            <h4>Programa</h4>

            <a href="#ninho">
              Adote um ninho
            </a>
          </div>


          {/* Informações sobre a EcoAzul. */}
          <div>

            <h4>EcoAzul</h4>

            <a href="#sobre">
              Sobre
            </a>

            <span>
              Parceria: Instituto Arara Azul
            </span>
          </div>
        </div>


        {/* ==================================================
            COPYRIGHT
            ================================================== */}

        {/* new Date().getFullYear() pega automaticamente
            o ano atual do computador. */}
        <p className="footer-legal">
          © {new Date().getFullYear()} EcoAzul.
          Projeto escolar; preços e pacotes ilustrativos.
        </p>
      </footer>


      {/* ======================================================
          MODAL DE RESERVA
          ====================================================== */}

      {/* O componente ReserveDialog recebe o pacote selecionado.
          Se "reserva" for null, nenhum pacote está selecionado. */}

      <ReserveDialog
        pacote={reserva}

        // Quando o modal for fechado,
        // o estado volta para null.
        onClose={() => setReserva(null)}
      />

    </main>
  )
}


// Exporta o componente Home para que ele possa ser
// utilizado em outros arquivos da aplicação.
export default Home

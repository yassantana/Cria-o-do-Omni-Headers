import { Footer, Header } from '@components/layout'
import { LocaleProvider } from '@i18n'
import { AppRoutes, ScrollToTop } from '@router'

/**
 * Shell raiz da aplicacao: provedor de i18n + layout global + rotas.
 * O <BrowserRouter> envolve o App em main.tsx.
 */
export default function App() {
  return (
    <LocaleProvider>
      <a href="#inicio" className="skip-link">
        Pular para o conteudo
      </a>
      <ScrollToTop />
      <Header />
      <main id="conteudo">
        <AppRoutes />
      </main>
      <Footer />
    </LocaleProvider>
  )
}

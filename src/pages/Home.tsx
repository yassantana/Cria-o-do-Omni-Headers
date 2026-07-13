import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useDocumentTitle } from '@hooks'
import { useContent } from '@i18n'
import { scrollToId } from '@utils'
import { Omni } from '@components/ui'
import {
  AtendimentoSection,
  CrescimentoSection,
  DashboardSection,
  FinalCTASection,
  GestaoSection,
  HeroSection,
  IASection,
  IntegracoesSection,
  OperacaoHojeSection,
  ParceiraSection,
  TransformacaoSection,
  WhatsAppSection,
} from '@sections'

/**
 * Omni Headers — apresentacao comercial (Sales Deck) no ecossistema Headers.
 * A narrativa gira em torno da OPERACAO do cliente: reconhecimento (hoje) ->
 * transformacao (capacidades) -> quem faz acontecer (Headers) -> comecar.
 */
export default function Home() {
  const c = useContent()
  const { hash } = useLocation()
  useDocumentTitle(c.meta.title)

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const t = setTimeout(() => scrollToId(id), 80)
      return () => clearTimeout(t)
    }
  }, [hash])

  return (
    <>
      {/* Cenas da apresentacao comercial (cada uma responde uma pergunta) */}
      <HeroSection /> {/* o que e / centralizacao (congelado) */}
      <OperacaoHojeSection /> {/* qual o meu problema hoje */}
      <AtendimentoSection /> {/* como minha equipe atende junto */}
      <WhatsAppSection /> {/* objecao: preciso trocar de numero? e oficial/seguro? */}

      <IASection /> {/* objecao: posso confiar na IA? e se errar? posso controlar? */}
      <GestaoSection /> {/* objecao: como acompanho minha equipe? quem esta online? */}

      <ParceiraSection />    {/* objecao: como implantamos? vou ficar sozinho? */}
      <IntegracoesSection /> {/* objecao: vou precisar trocar meus sistemas? */}
      <CrescimentoSection />   {/* objecao: a plataforma vai evoluir comigo? */}
      <DashboardSection />
      <TransformacaoSection /> {/* culminacao: o que realmente muda na minha empresa */}
      <FinalCTASection />
      <Omni />
    </>
  )
}

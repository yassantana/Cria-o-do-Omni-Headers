import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { OmniMark } from '@components/icons'
import { ROUTES } from '@constants'
import styles from './AppRoutes.module.css'

const Home = lazy(() => import('@pages/Home'))
const ScheduleDemo = lazy(() => import('@pages/ScheduleDemo'))
const ThankYou = lazy(() => import('@pages/ThankYou'))
const NotFound = lazy(() => import('@pages/NotFound'))

function PageLoader() {
  return (
    <div className={styles.loader}>
      <OmniMark size={44} spinning />
    </div>
  )
}

/** Definicao das rotas da aplicacao (lazy-loaded). */
export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.scheduleDemo} element={<ScheduleDemo />} />
        <Route path={ROUTES.thankYou} element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

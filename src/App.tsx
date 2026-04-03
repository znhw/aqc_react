import './App.css'
import { Header } from './components/layout/Header'
import { lazy, Suspense } from 'react'

const ChatRoom = lazy(() => import('./pages/ChatRoom'))


function App() {

  return (
    <main>
      <Header />
      <Suspense fallback={<div style={{ color: 'var(--theme-color)', textAlign: 'center', marginTop: '2rem' }}>Loading...</div>}>
        <ChatRoom />
      </Suspense>
    </main>
  )
}

export default App

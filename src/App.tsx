import { ChatRoom } from './pages/ChatRoom'
import './App.css'
import { Header } from './components/layout/Header'
import "@fontsource/open-sans/index.css";
import "@fontsource/xanh-mono/index.css";


function App() {

  return (
    <main>
      <Header />
      <ChatRoom/>
    </main>
  )
}

export default App

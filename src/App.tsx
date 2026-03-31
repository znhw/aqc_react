import { MessageInput } from './components/chat/MessageInput'
import './App.css'

function App() {

  return (
    <>
      <MessageInput onSend={(msg) => console.log('Message sent:', msg)} />
    </>
  )
}

export default App

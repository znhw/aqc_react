import { MessageInput } from './components/chat/MessageInput'
import { MessageBubble } from './components/chat/MessageBubble'
import './App.css'

function App() {

  return (
    <>
      <MessageBubble
        role="user"
        message="Hey!"
        timestamp="9:41 AM"
        status="read"
      />
      <MessageBubble
        role="user"
        message="Hey!"
        timestamp="9:41 AM"
        status="read"
      />

      <MessageBubble
        role="character"
        message="Say my name."
        timestamp="9:41 AM"
        characterName="Walter White"
        showName="Breaking Bad"
      />
      <MessageInput onSend={(msg) => console.log('Message sent:', msg)} />

    </>
  )
}

export default App

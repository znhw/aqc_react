import './TypingIndicator.css'

export function TypingIndicator() {
     return (
    <div className="bubble-row bubble-row--character">
      <div className="bubble bubble--character typing-indicator">
        <span> typing</span>
        <div className="typing-indicator__dots">
          <span className="typing-indicator__dot" />
          <span className="typing-indicator__dot" />
          <span className="typing-indicator__dot" />
        </div>
      </div>
    </div>
  );
}
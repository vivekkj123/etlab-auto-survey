import { useEffect, useState } from 'react'
import './Popup.css'

function App() {
  const [EvaluationPage, setEvaluationPage] = useState(false)
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url
      if (currentUrl.includes('.etlab.in/survey/user/answer')) {
        setEvaluationPage(true)
      }
    })
  }, [])
  return (
    <main>
      <h2>ETLAB Auto Survey Filler</h2>
      {EvaluationPage ? (
        <>
          <div className="wrapper">
            <button
              onClick={() => {
                chrome.runtime.sendMessage({ action: 'markGood' })
              }}
              title="Selects first radio buttons for all questions (Excellent)"
            >
              Excellent
            </button>
            <button
              onClick={() => {
                chrome.runtime.sendMessage({ action: 'markRandom' })
              }}
              title="Randomly Chooses any options (Use at your own risk)"
            >
              Random
            </button>
          </div>
        </>
      ) : (
        <h3>Please Execute me on a ETLAB Survey Page</h3>
      )}
    </main>
  )
}

export default App

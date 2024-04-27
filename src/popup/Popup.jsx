import { useEffect, useState } from 'react'
import './Popup.css'

function App() {
  const [Name, setName] = useState('')
  const [EvaluationPage, setEvaluationPage] = useState(false)
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url
      // To get name of faculty
      if (currentUrl.includes('.linways.com/evaluation/')) {
        setEvaluationPage(true)
        chrome.runtime.sendMessage({ action: 'getFacultyName' }, function (res) {
          setName(res.facultyName)
        })
      }
    })
  }, [])
  return (
    <main>
      <h2>Linways Auto Feedback Filler</h2>
      {EvaluationPage ? (
        <>
          <p>Choose the performance level for {Name}</p>
          {/* different actions need to be sent for different performance levels */}
          <div className="wrapper">
            <button
              onClick={() => {
                chrome.runtime.sendMessage({ action: 'markGood' })
              }}
              title="Randomly Chooses anyone: Excellent / Very Good"
            >
              Good
            </button>
            <button
              onClick={() => {
                chrome.runtime.sendMessage({ action: 'markAverage' })
              }}
              title="Randomly Chooses anyone: Good  / Fair"
            >
              Average
            </button>
            <button
              onClick={() => {
                chrome.runtime.sendMessage({ action: 'markPoor' })
              }}
              title="Randomly Chooses anyone: Poor / Fair"
            >
              Poor
            </button>
          </div>
        </>
      ) : (
        <h3>Please Execute me on a Linways Evaluation Page</h3>
      )}
    </main>
  )
}

export default App

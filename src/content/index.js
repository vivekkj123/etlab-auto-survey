chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var form = document.querySelector('form')
  var listItems = document.querySelectorAll('li')

  function markGood() {
    listItems.forEach(function (listItem) {
      var question = listItem.querySelector('.question')
      if (question) {
        var answerDiv = listItem.querySelector('.answer')
        var firstRadioButton = answerDiv.querySelector('input[type="radio"]')
        if (firstRadioButton) {
          firstRadioButton.checked = true
        }
        handleTextarea(answerDiv, question)
      }
    })
  }

  function markRandom() {
    listItems.forEach(function (listItem) {
      var question = listItem.querySelector('.question')
      if (question) {
        var answerDiv = listItem.querySelector('.answer')
        var inputElements = answerDiv.querySelectorAll('input[type="radio"], input[type="text"]')
        var radioButtons = Array.from(inputElements).filter(function (inputElement) {
          return inputElement.type === 'radio'
        })

        if (radioButtons.length > 0) {
          var randomIndex = Math.floor(Math.random() * radioButtons.length)
          radioButtons.forEach(function (radioButton) {
            radioButton.checked = false
          })
          radioButtons[randomIndex].checked = true
        }

        handleTextarea(answerDiv, question)
      }
    })
  }

  function handleTextarea(answerDiv, question) {
    var textarea = answerDiv.querySelector('textarea')
    if (textarea) {
      if (question.textContent.toLowerCase().includes('age')) {
        var randomAge = Math.floor(Math.random() * 5) + 20
        textarea.value = randomAge
      } else if (
        question.textContent.toLowerCase().includes('observation') &&
        question.textContent.toLowerCase().includes('suggestions')
      ) {
        textarea.value = 'Nothing'
      }
    }
  }
  var surveyTitle = document.querySelector('h5')

  if (request.action === 'markGood') {
    markGood()
  } else if (request.action === 'markRandom') {
    markRandom()
  }
  if (surveyTitle && surveyTitle.textContent.trim() === 'Student Satisfaction Survey') {
    alert('Please Fill first 5 Questions in this page by yourself')
  } else {
    form.submit()
  }
  // form.submit();
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var form = document.querySelector('form')
  var listItems = document.querySelectorAll('li')
  var selects = document.querySelectorAll('select')

  function markGood() {
    listItems.forEach(function (listItem) {
      var question = listItem.querySelector('.question')
      if (question) {
        var answerDiv = listItem.querySelector('.answer')
        var firstRadioButton = answerDiv.querySelector('input[type="radio"]')
        if (firstRadioButton) {
          firstRadioButton.click()
        }
        handleTextarea(answerDiv, question)
      }
    })
    selects.forEach(function (select) {
      if (select.options.length > 1) {
        select.selectedIndex = 1
        select.dispatchEvent(new Event('change', { bubbles: true }))
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
          radioButtons[randomIndex].click()
        }

        handleTextarea(answerDiv, question)
      }
    })
    selects.forEach(function (select) {
      if (select.options.length > 1) {
        var randomIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1
        select.selectedIndex = randomIndex
        select.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
  }

  function handleTextarea(answerDiv, question) {
    var textarea = answerDiv.querySelector('textarea')
    if (textarea) {
      if (question.textContent.toLowerCase().includes('age')) {
        var randomAge = Math.floor(Math.random() * 5) + 20
        textarea.value = randomAge
        textarea.dispatchEvent(new Event('input', { bubbles: true }))
        textarea.dispatchEvent(new Event('change', { bubbles: true }))
      } else if (
        question.textContent.toLowerCase().includes('observation') &&
        question.textContent.toLowerCase().includes('suggestions')
      ) {
        textarea.value = 'Nothing'
        textarea.dispatchEvent(new Event('input', { bubbles: true }))
        textarea.dispatchEvent(new Event('change', { bubbles: true }))
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
    var submitButton = document.querySelector('button[name="submitButton"]')
  }
  if (submitButton) {
    submitButton.click()
  } else {
    form.submit()
  }
  // form.submit();
})

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  document.getElementById('languageLayer').style.display = 'none';
  updateContent();
}

function updateContent() {
  var language = localStorage.getItem('language') || 'english'; // Default to English
  fetch('translations.json')
    .then(response => response.json())
    .then(translations => {
      var elementsToTranslate = document.querySelectorAll('[data-translation]');
      elementsToTranslate.forEach(function(element) {
        var translationKey = element.getAttribute('data-translation');
        if (translations[language][translationKey]) {
          element.textContent = translations[language][translationKey];
        }
      });

      // Set dir attribute based on language
      var bodyElement = document.querySelector('.body1xx4');
      if (language === 'arabic') {
        bodyElement.setAttribute('dir', 'rtl');
      } else {
        bodyElement.setAttribute('dir', 'ltr');
      }

      // Check if the language is Arabic
      if (language === 'arabic') {
        // Apply style changes for Arabic
        applyArabicStyles();
      } else {
        // Reset style changes for other languages
        resetStyles();
      }
    })
    .catch(error => console.error('Error fetching translations:', error));
}

function applyArabicStyles() {
  // Apply style changes to elements for Arabic language
  var elementsToStyle = document.querySelectorAll('.card5xx4, .card4xx4, .card6xx4, .spanx4, .dirn');
  elementsToStyle.forEach(function(element) {
    switch (element.className) {

        case 'dirn':
        element.style.direction = 'ltr';
        element.style.display = 'flex';
         element.style.flexDirection = 'row-reverse';
        // Apply other style changes for other-class2
       
        
        break;
      case 'card5xx4':
        element.style.marginLeft = '16px';
        element.style.marginRight = '0px';
        // Apply other style changes for other-class2
        break;
      case 'card4xx4':
        element.style.marginLeft = '16px';
        element.style.marginRight = '0px';
        // Apply other style changes for other-class2
        break;

      case 'card6xx4':
        element.style.marginLeft = '16px';
        element.style.marginRight = '0px';
        // Apply other style changes for other-class2
        break;
      case 'spanx4':
        element.style.marginLeft = '0px';
        element.style.marginRight = '4px';
        // Apply other style changes for other-class2
        break;
    }
  });
}

function resetStyles() {
  // Reset style changes for elements when language is not Arabic
  var elementsToReset = document.querySelectorAll('.card5xx4, .card4xx4, .card6xx4, .spanx4, .dirn');
  elementsToReset.forEach(function(element) {
    switch (element.className) {

        case 'dirn':
        element.style.direction = 'unset';
        element.style.display = 'flex';
         element.style.flexDirection = 'row';
        // Apply other style changes for other-class2


        break;
      case 'card5xx4':
        element.style.marginLeft = '0px';
        element.style.marginRight = '16px';
        // Apply other style changes for other-class2
        break;
      case 'card4xx4':
        element.style.marginLeft = '0px';
        element.style.marginRight = '16px';
        // Apply other style changes for other-class2
        break;

      case 'card6xx4':
        element.style.marginLeft = '0px';
        element.style.marginRight = '16px';
        // Apply other style changes for other-class2
        break;
      case 'spanx4':
        element.style.marginLeft = '4px';
        element.style.marginRight = '0px';
        // Apply other style changes for other-class2
        break;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var language = localStorage.getItem('language');
  if (!language) {
    document.getElementById('languageLayer').style.display = 'flex';
  } else {
    updateContent();
  }
});

export default function localizeHtmlPage() {
    //Localize by replacing __MSG_***__ meta tags
    document.querySelectorAll('[data-locale]').forEach(elem => {
      elem.innerText = chrome.i18n.getMessage(elem.dataset.locale)
    })
    
  }
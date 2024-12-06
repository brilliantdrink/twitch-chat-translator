(async function twitchTranslation() {
    const chat = await queryFutureElement('.chat-scrollable-area__message-container')
    const style = document.createElement('style')
    document.head.append(style)
    style.innerText = `
    .translation {
        color: #adadb8;
        font-size: 0.9em;
    }
    `
    const observer = new MutationObserver(translate)
    observer.observe(chat, {childList: true, subtree: true})
})()

const languageNames = new Intl.DisplayNames(['en'], {type: 'language'})

function translate() {
    document.querySelectorAll('[data-a-target="chat-line-message"]').forEach(async el => {
        if (el.dataset.translated === 'true') return
        const message = el.querySelector('[data-a-target="chat-line-message-body"]').innerText.trim()
        el.dataset.translated = 'true'
        if (!message || message.startsWith('!')) return
        const detectedLang = await fetch('https://localhost:4001/detect', {
            method: 'post',
            body: JSON.stringify({q: message}),
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        if (detectedLang.some(entry => entry.language === 'en')) return
        const translation = await fetch('https://localhost:4001/translate', {
            method: 'post',
            body: JSON.stringify({
                q: message,
                source: detectedLang?.[0]?.language ?? 'auto',
                target: 'en',
                format: 'text',
            }),
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        if (translation.translatedText === message) return
        const translationEl = document.createElement('div')
        translationEl.innerHTML = `Translation (${languageNames.of(detectedLang?.[0]?.language)}): ${translation.translatedText}`
        translationEl.classList.add('translation')
        el.querySelector('div').append(translationEl)
    })
}

function queryFutureElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});
    });
}

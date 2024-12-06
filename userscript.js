// ==UserScript==
// @name            Twitch Chat Translator
// @description     Translates messages in foreign (non-english) languages.
//
// @match           https://*.twitch.tv/*
// ==/UserScript==

(function twitchChatTranslator() {
    var script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/brilliantdrink/twitch-chat-translator/twitch-chat-translator.js'
    document.head.appendChild(script)
})()

# Twitch Chat Translator

This is a script that sends messages from Twitch's web-app chat to a locally
running [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) instance.

Beware that the quality of the translations is fully in the hands of the LibreTranslate project. Please report any such
bugs there.

## Prerequisites

- Have [Docker](https://www.docker.com) installed
- Have [mkcert](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation) installed
- Have a userscripts manager installed for your browser
    - For Chrome-like (Edge, Brave,
      Opera): [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    - For Firefox-like: [GreaseMonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
    - For Maxthon-like: [ViolentMonkey](https://extension.maxthon.com/detail/index.php?view_id=1680)
    - For Safari-like [Userscripts](https://apps.apple.com/app/apple-store/id1463298887)

## Setup

### Generate certificates

First you'll need to generate SSL certificates, so that the LibreTranslate service can be accessed via https.  
In this directory run this command to generate the certificates  
Linux / macOS:

```shell
mkcert -key-file haproxy/certificates/fullchain.crt.key -cert-file haproxy/certificates/fullchain.crt "localhost"
```

Windows:

```shell
mkcert -key-file haproxy\certificates\fullchain.crt.key -cert-file haproxy\certificates\fullchain.crt "localhost"
```

### Start LibreTranslate

Run the following command to start LibreTranslate.

```shell
docker compose up -d
```

### Install the Script

Go [here](https://cdn.jsdelivr.net/gh/brilliantdrink/twitch-chat-translator/userscript.js) to install the userscript.  
If this doesn't work, create a new userscript in your userscripts manager and add the contents of `userscript.js` to it.

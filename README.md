# digWatch

[digWath URL](https://dig.watch)

# Requirements

[Documentation URL](https://docs.google.com/document/d/1Tse9g7vC15M2QhzrEfH9YiX7CiuqKkdNegZBtw0wN2Y/edit?ts=5e4d71d6)

# Prerequsities

Please connect a device and follow the instructions here to enable USB debugging:
https://developer.android.com/studio/run/device.html#developer-device-options. If you are using Genymotion go to Settings -> ADB, select "Use custom Android SDK tools", and point it at your Android SDK directory.

# mobile App

TL;TR - Developed ReactNative using Expo SDK

Check package.json for available scripts.

Use `yarn` ONLY for modules installation don't use `yarn <script_name>` instead use `npm run <script name>`

Note: build for web not working needs tweeking `npm run web`

<dl>
    <dt>On MacOS</dt>
        <dd>In Metro Bundler pick `Run on iOS simulator`</dd>
        <dd>To simulate home button `⌘+⇧+H` type `H` twice to open application list </dd>
</dl>

# notifications

Server IP: 78.47.162.187

Use web page to get token and after confirmation, notifications can be sent.

Every downloaded application can receive notifications

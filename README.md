# PWA Todo plus

this is an idea I've had for a while. I want a todo list app that you can also set reminders. The reminder will show a notification to the user

- [ ] needs to work offline
- [ ] set "reminders" that schedule future local notifications
- [ ] persist data
- [ ] show online/offline status
- [ ] implement Dark Mode based on system preference but allow override in settings

Nice to have:
- connect to an external storage to persist data across clients

---

I created a checklist based on the talk given in this post/video: https://firt.dev/pwa-cheat-sheet-2021/

# Checklist

- [x] Service worker is registered
- [x] App Assets are in Cache storage
- [x] Using persistent storage like localStorage or IndexedDB
- [x] Non-iOS need to request access to persistent storage using: `await navigator.storage.persist()` - [compatibility](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist#browser_compatibility) - see [`requestPersistentStorage` in `helpers/pwa`](src/helpers/pwa.js)
- [x] **Android** Icon: add a 512x512 maskable icon. Use https://maskable.app to help
  - [x] make usre you add `"purpose": "maskable"` in the manifest for that icon (see [below](#android-maskable-icon))
- [x] **Safari** - if you are providing only one icon for Apple it should be `180x180` png and non-transparent
- [x] **Safari** ignores icons in manifest, use: `<link rel="apple-touch-icon" href="" />`
- [x] **iOS** Do <u>NOT</u> use the deprecated `<meta name="apple-mobile-web-app-capable" content="yes" />`
- [x] **iOS** Improve installation reliability by preloading manifest and icon. see [`iosReliableInstall` in `helpers/pwa`](src/helpers/pwa.js)
- [ ] **iOS** - Add a splash screen! See [splash screen section](#splash-screens) below
- [x] **Android** - start supporting the Enhanced Installation Banner, [see below](#android-enhanced-installation)

optional
- [ ] **Chromium** based browsers allow you to customize the install UI by using the `beforeinstallprompt` event: https://web.dev/customize-install/

## Android Maskable Icon

```json
{
  "icon": [
    {
      "src": "maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable" // <---- important
    }
  ]
}
```

## Splash Screens

### Android

Automatically generated by the browser. Uses the `theme_color` at the top, the `background_color`, the 512x512 icon, and the `name`.

### iOS

You have full control over the splash screen image using this: `<link rel="apple-touch-startup-image" href="" />`

Also supports dark mode

BIG CAVEAT: The image needs to be the exact size of the screen and there are _many_ iPhone screen dimensions

Solution: npm package [pwa-static-generator](https://www.npmjs.com/package/pwa-asset-generator)

## Android Enhanced Installation

Available in Android Chrome 90+, an enhanced installation banner. Read more about it here: https://9to5google.com/2021/03/29/chrome-new-pwa-install/
(I believe it might still be feature flagged)

In order to get this experience you need to have the manifest include:

- [x] name: https://web.dev/add-manifest/#name
- [x] at least one icon: https://web.dev/add-manifest/#icons
- [x] description: https://web.dev/add-manifest/#description
- [x] app screenshots: https://web.dev/add-manifest/#description

------

Resources:

To schedule a local notifcation for later you use a Notification Triggers:
- https://web.dev/notification-triggers/
- https://css-tricks.com/creating-scheduled-push-notifications/

Create React App's section on PWA support: https://create-react-app.dev/docs/making-a-progressive-web-app

Google's online documentation on manifest files: https://web.dev/add-manifest/

A tutorial on how to use Google's Workbox service worker library: https://developers.google.com/codelabs/pwa-training/pwa03--working-with-workbox#0

A site on the current status of what a PWA can do today: https://whatpwacando.today/

About the new background sync API: https://developers.google.com/web/updates/2015/12/background-sync

Custom install prompt UI patterns: https://web.dev/promote-install/

https://javascript.plainenglish.io/creating-a-browser-agnostic-pwa-install-button-41039f312fbe

Good article about adding a dark theme to your site: https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
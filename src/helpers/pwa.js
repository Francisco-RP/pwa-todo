import { once } from 'helpers/events';

/**
 * on Android you need to request persistent storage so this handles that for you,
 *
 * on iOS this will always return true since iOS allows persistent storage by default after install
 */
export async function requestPersistentStorage() {
  if (navigator.storage?.persist) {
    const granted = await navigator.storage.persist();
    console.log('persistent storage granted=', granted);
    return granted;
  }

  if (typeof cb === 'function') return 'standalone' in navigator;
}

const localStorageInstallKey = 'pwa_installed';

export const isInstalled = () => localStorage.getItem(localStorageInstallKey) === 'true';

/**
 * This is only available in Chromium based browsers. Prevent the install banner showing and then
 * use the returned event later during a custom install like this: `event.prompt()`
 */
export function captureInstallEvent() {
  if ('onbeforeinstallprompt' in window) {
    once(window, 'appinstalled', function () {
      localStorage.setItem(localStorageInstallKey, true);
    });

    return new Promise((resolve) => {
      function handler(event) {
        // prevent banner or infobar appearing asking to install/add-to-home
        event.preventDefault();
        // return event for future use
        resolve(event);
      }

      once(window, 'beforeinstallprompt', handler);
    });
  }

  return {
    prompt: () => {}
  }
}

/**
 * This is one method of checking if the app is already installed but I suggest using the localStorage
 * way instead. However, the iOS 
 * @param {function} cb
 */
export function isAlreadyInstalled(cb) {
  //check when the page is loaded if it matches one of the PWA display modes
  once(window, 'DOMContentLoaded', function () {
    cb(
      navigator.standalone ||
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches
    );
  });

  //but also add a listener. After app installation on desktop, the app will open in their own window right away.
  once(window, 'DOMContentLoaded', function () {
    window.matchMedia('(display-mode: standalone)').addEventListener(function (e) {
      cb(e.matches);
    });
    window.matchMedia('(display-mode: fullscreen)').addEventListener(function (e) {
      cb(e.matches);
    });
    window.matchMedia('(display-mode: minimal-ui)').addEventListener(function (e) {
      cb(e.matches);
    });
  });
}

/**
 * This is a hack by Maximiliano Firtman
 *
 * This improves the reliability of an iOS install experience when use adds app to home screen and
 * the network connection cuts out. iOS tries getting the manifest and icon only at install time and
 * getting a 404 for those it reverts back to the screenshot icon
 *
 * IMPORTANT: When using this you must use absolute URLS in the manifest and test it again in every
 * new iOS version release.
 *
 * Tested and works in iOS 12, 13, 14, 14.5
 */
export function iosReliableInstall() {
  if ('standalone' in navigator) {
    // preload the app manifect for iOS safari
    // manifest should always be at the root
    fetch('manifest.json')
      .then((r) => r.text())
      .then((manifest) => {
        document.querySelector(
          'link[rel="manifest"]'
        ).href = `data:application/manifest+json;charset=utf-8,${manifest}`;
      })
      .catch(console.error);

    fetch('logo180.png')
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          document.querySelector('link[rel="apple-touch-icon"]').href = reader.result;
        };
        reader.readAsDataURL(blob);
      })
      .catch(console.error);
  }
}

export function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'pwa';
  } else if (navigator.standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

export function isThisDeviceRunningiOS() {
  if ('standalone' in navigator) {
    // this only works in iOS Safari
    return true;
  }

  if (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    )
  ) {
    return true;
  }

  // iPad on iOS 13
  if (navigator.userAgent.includes('Mac') && 'ontouchend' in document) {
    return true;
  }

  return false;
}

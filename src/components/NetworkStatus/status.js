export const ONLINE = 'online';
export const OFFLINE = 'offline';

const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const online_types = ['bluetooth', 'cellular', 'ethernet', 'wifi', 'wimax', 'other', 'unknown'];

function getStatus(type) {
  if (online_types.includes(type)) {
    return ONLINE;
  } else {
    return OFFLINE;
  }
}

async function isOnline() {
  // some help from: https://dev.to/maxmonteil/is-your-app-online-here-s-how-to-reliably-know-in-just-10-lines-of-js-guide-3in7
  if (!window.navigator.onLine) return OFFLINE;

  // avoid CORS errors with a request to your own origin
  const url = new URL(window.location.origin);

  // random value to prevent cached responses
  url.searchParams.set('rand', Date.now());

  try {
    const response = await fetch(url.toString(), { method: 'HEAD' });

    return response.ok ? ONLINE : OFFLINE;
  } catch {
    return OFFLINE;
  }
}

export function getNetworkStatus(callback) {
  if (connection && connection.type) {
    console.log('🔌 - using navigtor.connection.type to check network status');
    function handleChange() {
      callback(getStatus(connection.type));
    }

    connection.addEventListener('change', handleChange);

    return {
      check: async () => getStatus(connection.type),
      cleanup: () => connection.removeEventListener('change', handleChange),
    };
  }

  console.log('🔌 - using navigtor.onLine and fallback to check network status');

  function handleOnline() {
    callback(ONLINE);
  }
  function handleOffline() {
    callback(OFFLINE);
  }
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return {
    check: isOnline,
    cleanup: () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    },
  };
}

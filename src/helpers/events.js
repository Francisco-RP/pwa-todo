/**
 * add a self removing one time event listener
 * @param {EventTarget} eventTarget the dom element to attach addEventListener to
 * @param {string} eventName
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean|AddEventListenerOptions} [options=false] useCapture or options from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
export function once(eventTarget, eventName, handler, options = false) {
  function tempHandler(e) {
    handler(e);
    eventTarget.removeEventListener(eventName, tempHandler, options);
  }

  eventTarget.addEventListener(eventName, tempHandler, options);
}

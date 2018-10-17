export function on (el, evtName, fn) {
  if (el.addEventListener) {
    el.addEventListener(evtName, (e) => fn(e), false)
  } else {
    el.attachEvent(`on${evtName}`, fn)
  }
}

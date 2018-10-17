export function getElByID (id) {
  return document.getElementById(id)
}

export function showEl (id) {
  var el = document.getElementById(id)
  if (el) {
    el.style.display = 'block'
  }
}

export function hideEl (id) {
  var el = document.getElementById(id)
  if (el) {
    el.style.display = 'none'
  }
}

export function addClass (el, className) {
  var names = el.className
  if (names.indexOf(className) > -1) return

  names = names + ' ' + className
  el.className = names
}

export function removeClass (el, className) {
  var names = el.className
  if (names.indexOf(className) > -1) {
    names = names.replace(className, '')
  }
  el.className = names
}
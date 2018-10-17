export function getElByID (id) {
  return document.getElementById(id)
}

export function showEl (el) {
  if (el) {
    el.style.display = 'block'
  }
}

export function hideEl (el) {
  if (el) {
    el.style.display = 'none'
  }
}

export function addClass (el, className) {
  var names = el.className
  if (names.indexOf(className) > -1) return

  if (el.classList) {
    el.classList.add(className)
  } else {
    names = names + ' ' + className
    el.className = names.replace(/^\s+|\s$/g, '')
  }
}

export function removeClass (el, className) {
  var names = el.className
  if (names.indexOf(className) > -1) {
    names = names.replace(className, '')
  }
  el.className = names
}
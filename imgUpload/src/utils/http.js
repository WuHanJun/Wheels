export default function http ({url, method, data}) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onload = () => resolve(xhr.responseText, xhr)
    xhr.onerror = () => reject(xhr)
    xhr.send(data)
  })
}

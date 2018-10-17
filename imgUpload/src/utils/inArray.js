export default function isArray (arr, item) {
  for (let i = 0, len = arr.length; i < len; ++i) {
    if (arr[i] === item) return true
  }
  return false
}

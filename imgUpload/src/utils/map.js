export default function map (arr, fn) {
  let result = []
  for (let i = 0, len = arr.length; i < len; ++i) {
    result.push(fn(arr[i]))
  }
  return result
}
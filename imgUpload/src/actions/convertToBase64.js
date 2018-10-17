export default (container) => Promise
  .resolve()
  .then(() => {
    const {showEl, canvasEl, downloadEl} = container
    canvasEl.width = showEl.naturalWidth
    canvasEl.height = showEl.naturalHeight
    canvasEl.getContext('2d').drawImage(showEl, 0, 0)
    downloadEl.href = canvasEl.toDataURL()
    downloadEl.download = showEl.name
  })

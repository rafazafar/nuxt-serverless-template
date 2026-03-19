import { blob } from 'hub:blob'

export default eventHandler(async (event) => {
  return blob.handleUpload(event, {
    multiple: false,
    ensure: {
      maxSize: '1GB',
      types: ['image/png', 'image/jpeg', 'image/webp'],
    },
  })
})

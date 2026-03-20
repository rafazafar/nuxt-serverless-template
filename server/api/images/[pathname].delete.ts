import { blob } from 'hub:blob'

export default eventHandler(async (event) => {
  const pathname = getRouterParam(event, 'pathname')

  if (!pathname) {
    throw createError({ statusCode: 400, statusMessage: 'Missing image pathname' })
  }

  return blob.del(pathname)
})

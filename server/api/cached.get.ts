// Example of a cached event handler
// Learn more on https://nitro.unjs.io/guide/cache

export default cachedEventHandler( async () => {
  return {
    now: Date.now(),
    value: Math.random(),
  }
}, {
  maxAge: 5, 
})

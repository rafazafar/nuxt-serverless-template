// Example of a cached event handler
// Learn more on https://nitro.unjs.io/guide/cache

export default cachedEventHandler(() => {
  return {
    now: Date.now(),
    value: Math.random(),
  }
}, {
  maxAge: 5, // 5 seconds
})

const storage = {
  set (key, value, ttl = 3600000) {
    const now = new Date()
    // By default token expired in 1 hour
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item))
  },
  get (key) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  },
  delete (key) {
    localStorage.removeItem(key)
    return null
  }
}

export default storage

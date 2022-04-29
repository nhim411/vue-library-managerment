import store from '@/store'

/**
 * @returns {Boolean}
 */

export default function checkIsAdmin () {
  if (store.state?.user?.role === 'admin') {
    return true
  } else {
    return false
  }
}

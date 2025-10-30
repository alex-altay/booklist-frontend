const STORAGE_NAME = 'localStorage'
const TEST_STRING = '__storage_test__'

export function isLocalStorageAvailable() {
  let storage
  try {
    storage = window[STORAGE_NAME]
    storage.setItem(TEST_STRING, TEST_STRING)
    storage.removeItem(TEST_STRING)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === 'QuotaExceededError' &&
      storage &&
      storage.length !== 0
    )
  }
}

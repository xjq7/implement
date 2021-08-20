function quickSort(arr) {
  _quickSort(arr, 0, arr.length - 1)
}
function _quickSort(arr, l, r) {
  if (l > r) return

  let left = l,
    right = r

  let base = arr[left]
  let temp
  while (l != r) {
    while (arr[r] >= base && l < r) {
      r--
    }
    while (arr[l] <= base && l < r) {
      l++
    }

    if (l < r) {
      temp = arr[l]
      arr[l] = arr[r]
      arr[r] = temp
    }
  }
  arr[left] = arr[l]
  arr[l] = base
  _quickSort(arr, left, l - 1)
  _quickSort(arr, l + 1, right)
}
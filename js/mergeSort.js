function mergeSort(arr) {
  _mergeSort(arr, 0, arr.length - 1)
}

function _mergeSort(arr, l, r) {
  if (l < r) {
    const mid = l + parseInt((r - l) / 2)
    _mergeSort(arr, l, mid)
    _mergeSort(arr, mid + 1, r)
    _merge(arr, l, mid, r)
  }
}

function _merge(arr, l, mid, r) {
  let i = l,
    j = mid + 1
  let k = 0,
    temp = []
  while (i <= mid && j <= r) {
    if (arr[i] > arr[j]) {
      temp[k++] = arr[j++]
    } else {
      temp[k++] = arr[i++]
    }
  }

  while (i <= mid) {
    temp[k++] = arr[i++]
  }

  while (j <= r) {
    temp[k++] = arr[j++]
  }
  for (let i = 0; i < k; i++) {
    arr[l + i] = temp[i]
  }
}
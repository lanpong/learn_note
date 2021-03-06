function ArrayList() {

    var array = [];

    this.insert = function(item) {
        array.push(item);
    };

    this.toString = function() {
        return array.join();
    };

    // 冒泡排序
    this.bubbleSort = function() {
        var length = array.length;
        for (var i=0; i<length; i++) {
            for (var j=0; j<length-1; j++) {
                if (array[j] > array[j+1]) {
                    swap(array, j, j+1);
                }
            }
        }
    };

    var swap = function(array, index1, index2) {
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };

    this.modifiedBubbleSort = function() {
        var length = array.length;
        for (var i=0; i<length; i++) {
            for (var j=0; j<length-1-i; j++) {
                if (array[j] > array[j+1]) {
                    swap(j, j+1);
                }
            }
        }
    };

    // 选择排序
    this.selectionSort = function() {
        var length = array.length,
        indexMin;
        for (var i=0; i<length-1; i++) {
            indexMin = i;
            for (var j=i; j<length; j++) {
                if (array[indexMin] > array[j]) {
                    indexMin = j;
                }
            }
            if (i !== indexMin) {
                swap(i, indexMin);
            }
        }
    };

    // 插入排序
    this.insertionSort = function() {
        var length = array.length,
        j,
        temp;
        for (var i=1; i<length; i++) {
            j = i;
            temp = array[i];
            while (j > 0 && array[j-1] > temp) {
                array[j] = array[i];
                j--;
            }
            array[j] = temp;
        }
    };

    // 合并排序（归并）
    this.mergeSort = function() {
        array = mergeSortRec(array);
    };

    var mergeSortRec = function(array) {
        var length = array.length;
        if (length === 1) {
            return array;
        }
        var mid = Math.floor(length/2),
        left = array.slice(0, mid),
        right = array.slice(mid, length);

        return merge(mergeSortRec(left), mergeSortRec(right));
    };

    var merge = function(left, right) {
        var result = [],
        il = 0,
        ir = 0;
        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++]);
            } else {
                result.push(right[ir++]);
            }
        }

        while (il < left.length) {
            result.push(left[il++]);
        }

        while (ir < right.length) {
            result.push(right[ir++]);
        }

        return result;
    };

    // 快排
    this.quickSort = function() {
        quick(array, 0, array.length-1);
    };

    var quick = function(array, left, right) {
        var index;
        if (array.length > 1) {
            index = partition(array, left, right);

            if (left < index-1) {
                quick(array, left, index-1);
            }

            if (index < right) {
                quick(array, index, right);
            }
        }
    };

    var partition = function(array, left, right) {
        var pivot = array[Math.floor((right+left) / 2)],
        i = left,
        j = right;

        while (i <= j) {
            while(array[i] < pivot) {
                i++;
            }
            while(array[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    };

    // 堆排序
    this.heapSort = function() {
        var heapSize = array.length;
        buildHeap(array);

        while (heapSize > 1) {
            heapSize--;
            swap(array, 0, heapSize);
            heapify(array, heapSize, 0);
        }
    };

    var buildHeap = function(array) {
        var heapSize = array.length;
        for (var i=Math.floor(heapSize / 2); i>=0; i--) {
            heapify(array, heapSize, i);
        }
    };

    var heapify = function(array, heapSize, i) {
        var left = i*2+1,
        right = i*2+2,
        largest = i;

        if (left < heapSize && array[left] > arguments[largest]) {
            largest = left;
        }

        if (right < heapSize && array[right] > array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            swap(array, i, largest);
            heapify(array, heapSize, largest);
        }
    };

    // Searching algorithms
    //线性搜索，最佳 O(1)，最坏 O(n)，平均 O(n)
    this.squentialSearch = function(item) {
        for (var i=0; i<array.length; i++) {
            if (item === array[i]) {
                return i;
            }
        }
    };

    // 二分搜索，时间复杂度 O(logn)，空间复杂度 O(1)
    this.binarySearch = function(item) {
        this.quickSort();

        var low = 0,
        high = array.length - 1,
        mid,
        element;

        while (low <= high) {
            mid = Math.floor(low + high);
            element = array[mid];
            if (element < item) {
                low = mid + 1;
            } else if (element > item) {
                high = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    };
}
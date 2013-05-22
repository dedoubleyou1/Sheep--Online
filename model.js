function compareArray(array1, array2) {
    if (array1.length !== array2.length)
        return false;
        for (var i = array1.length - 1; i >= 0; i--) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            if (!.compare(array1[i], array2[i])) //!recursion!
            return false;
        }
        else if (array1[i] !== array2[i]) {
          return false;
        }
    }
    return true;
}

var testFormation = [
[[0, 0], [0, 1]],
[[0, 1], [1, 1]],
[[0, 1], [0, 2]]
];

var compare1 = [
[[0, 0], [1, 0]],
[[1, 0], [1, 1]],
[[1, 0], [2, 0]]
];

var compare2 = [
[[0, 1], [1, 1]],
[[1, 1], [1, 0]],
[[1, 1], [2, 1]]
];

var compare3 = [
[[0, 0], [1, 0]],
[[1, 0], [1, 1]],
[[1, 1], [2, 1]]
];

function findDimensions(thisFormation) {
    var tempX = 0,
        tempY = 0;

    for (var i = thisFormation.length - 1; i >= 0; i--) {
        console.log(thisFormation[i][0]);
        if (thisFormation[i][0][0] > tempX) {
            tempX = thisFormation[i][0][0];
        }
        if (thisFormation[i][0][1] > tempY) {
            tempY = thisFormation[i][0][1];
        }
        if (thisFormation[i][1][0] > tempX) {
            tempX = thisFormation[i][1][0];
        }
        if (thisFormation[i][1][1] > tempY) {
            tempY = thisFormation[i][1][1];
        }
    }
    return [tempX, tempY];
}

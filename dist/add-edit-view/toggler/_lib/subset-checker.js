export default (function (subSet, mainSet) {
    var subSetLength = subSet.length;
    if (subSetLength < mainSet.length) {
        for (var i = 0; i < subSetLength; i++) {
            if (subSet[i] !== mainSet[i]) {
                return;
            }
        }
        return true;
    }
});
//# sourceMappingURL=subset-checker.js.map
function Calculator() {
    var value = 0, value2 = 0;
    var operation;

    this.setValue = function(symbol) {
        if (value) {
            value = (value.toString() + symbol) - 0;
        } else {
            value = symbol - 0;
        }
        return value;
    };

    this.clear = function() {
        value = 0;
        return value;
    };

    this.add = function() {
        operation = 'add';
        if (value && value2) {
            value = value + value2;
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.sub = function() {
        operation = 'sub';
        if (value && value2) {
            value = value2 - value;
        } else {
            value2 = value;
            value = 0;
        }
        return value;
    };

    this.equal = function() {
        if (operation && this[operation]) {
            value = this[operation]();
            return value;
        }
        return 0;
    };
}
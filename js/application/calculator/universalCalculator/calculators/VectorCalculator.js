class VectorCalculator extends RealCalculator {

    one(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.type(calc, elem, 'one'));
        }
        return new Vector(values);
    }
}
class RealCalculator {
    get(a) {
        return (a instanceof Matrix) ? new MatrixCalculator :
               (a instanceof Vector) ? new VectorCalculator :
               (a instanceof Complex) ? new ComplexCalculator :
               new RealCalculator;
    }

    type(calc, elem, method) {
        if (elem instanceof Matrix) {
            return calc[method](
                elem.values.length, 
                elem.values[0][0]
            );
        } else if (elem instanceof Vector) {
            return calc[method](
                elem.values.length, 
                elem.values[0]
            );
        }
        return calc[method]();
    }

    add(a, b) {
        return a + b;
    }

    one() {
        return 1;
    }
}
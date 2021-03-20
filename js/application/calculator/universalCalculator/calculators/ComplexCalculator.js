class ComplexCalculator extends RealCalculator {

    add(a, b) {
        return new Complex(super.add(a.re, b.re), super.add(a.im, b.im));
    }

    one() {
        return new Complex(super.one());
    }
}
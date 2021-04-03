Surface.prototype.cube = (x = 0, y = 0, z = 0, size = 10) => {
    return new Subject([
        new Point(x, y, z),
        new Point(x, y, z + size),
        new Point(x + size, y, z + size),
        new Point(x + size, y, z),
        new Point(x, y + size, z + size),
        new Point(x, y + size, z),
        new Point(x + size, y + size, z),
        new Point(x + size, y + size, z + size)
    ], [
        new Edge(0, 1), new Edge(1, 2), new Edge(2, 3), new Edge(0, 3)
    ]);
}
class DistanceCircle {
    constructor() {
        this.t1 = Math.random() * 2 * Math.PI;
        this.t2 = Math.random() * 2 * Math.PI;
        this.x1 = Math.cos(this.t1);
        this.x2 = Math.cos(this.t2);
        this.y1 = Math.sin(this.t1);
        this.y2 = Math.sin(this.t2);
        this.d = Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
    }
}

function calcCircle(pts) {
    var sm = 0;
    var d = [];
    for (let _ = 0; _ < pts; _++) {
        let tmp = new DistanceCircle();
        d.push(tmp);
        sm += tmp.d;
    }
    postMessage([sm, d]);
}

function circle(wasm, work, points) {
    pre = 4 / Math.PI;
    dgebi('quest').innerHTML = 'Average distance of 2 points on a unit circle';
    dgebi('prediction').innerHTML = `Prediction: \\(\\frac{4}{\\pi}\\approx${pre}\\)`;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);

    if (wasm) {} else if (work) {
        let code = calcCircle.toString();
        code = (`var pts = ${points};\n`
            + DistanceCircle.toString()
            + code.substring(code.indexOf('{')+1, code.lastIndexOf('}')));
        wk(code, points, pre);
    } else {
        let sum = 0;
        for (let _ = 0; _ < points; _++) {
            let tmp = new DistanceCircle();
            ds.push(tmp);
            sum += tmp.d;
        }
        showResult(sum, points, pre);
    }
}

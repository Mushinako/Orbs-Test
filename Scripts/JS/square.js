class DistanceSquare {
    constructor() {
        this.x1 = Math.random();
        this.x2 = Math.random();
        this.y1 = Math.random();
        this.y2 = Math.random();
        this.d = Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
    }
}

function calcSquare(pts) {
    var sm = 0;
    var d = [];
    for (let _ = 0; _ < pts; _++) {
        let tmp = new DistanceSquare();
        d.push(tmp);
        sm += tmp.d;
    }
    postMessage([sm, d]);
}

function square(wasm, work, points) {
    pre = Math.sqrt(2) / 15 + Math.log(1+Math.sqrt(2)) / 3 + 2 / 15;
    dgebi('quest').innerHTML = 'Average distance of 2 points in a unit square';
    dgebi('prediction').innerHTML = `Prediction: \\(\\frac{1}{15}\\sqrt{2}+\\frac{1}{3}\\ln{(1+\\sqrt{2})}+\\frac{2}{15}\\approx${pre}\\)`;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);

    if (wasm) {} else if (work) {
        let code = calcSquare.toString();
        code = (`var pts = ${points};\n`
            + DistanceSquare.toString()
            + code.substring(code.indexOf('{')+1, code.lastIndexOf('}')));
        wk(code, points, pre);
    } else {
        let sum = 0;
        for (let _ = 0; _ < points; _++) {
            let tmp = new DistanceSquare();
            ds.push(tmp);
            sum += tmp.d;
        }
        showResult(sum, points, pre);
    }
}

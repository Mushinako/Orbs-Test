class DistanceDisk {
    constructor() {
        this.r1 = 1 - Math.abs(Math.random() + Math.random() - 1);
        this.r2 = 1 - Math.abs(Math.random() + Math.random() - 1);
        this.t1 = Math.random() * 2 * Math.PI;
        this.t2 = Math.random() * 2 * Math.PI;
        this.x1 = this.r1 * Math.cos(this.t1);
        this.x2 = this.r2 * Math.cos(this.t2);
        this.y1 = this.r1 * Math.sin(this.t1);
        this.y2 = this.r2 * Math.sin(this.t2);
        this.d = Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
    }
}

function calcDisk(pts) {
    var sm = 0;
    var d = [];
    for (let _ = 0; _ < pts; _++) {
        let tmp = new DistanceDisk();
        d.push(tmp);
        sm += tmp.d;
    }

    postMessage([sm, d]);
}

function disk(wasm, work, points) {
    pre = 0.9055; // TODO: Actual average
    dgebi('quest').innerHTML = 'Average distance of 2 points on a unit disk';
    dgebi('prediction').innerHTML = `Prediction: \\(0.9055\\approx${pre}\\)`;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);

    if (wasm) {} else if (work) {
        let code = calcDisk.toString();
        code = (`var pts = ${points};\n`
            + DistanceDisk.toString()
            + code.substring(code.indexOf('{')+1, code.lastIndexOf('}')));
        wk(code, points, pre);
    } else {
        let Distance = DistanceDisk;
        lp(Distance, points, pre);
    }
}

class DistanceSquare {
    constructor() {
        this.x1 = Math.random();
        this.x2 = Math.random();
        this.y1 = Math.random();
        this.y2 = Math.random();
        this.d = Math.sqrt(
            (this.x1-this.x2) * (this.x1-this.x2)
            + (this.y1-this.y2) * (this.y1-this.y2)
        );
    }
}

class DistanceCircle {
    constructor() {
        this.t1 = Math.random() * 2 * Math.PI;
        this.t2 = Math.random() * 2 * Math.PI;
        this.x1 = Math.cos(this.t1);
        this.x2 = Math.cos(this.t2);
        this.y1 = Math.sin(this.t1);
        this.y2 = Math.sin(this.t2);
        this.d = Math.sqrt(
            (this.x1-this.x2) * (this.x1-this.x2)
            + (this.y1-this.y2) * (this.y1-this.y2)
        );
    }
}

var ds = ['Nothing to see'];
var worker;
var m, w;
// var running = false;

dgebi = s => document.getElementById(s);

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

function square(wasm, work, points) {
    pre = Math.sqrt(2) / 15 + Math.log(1+Math.sqrt(2)) / 3 + 2 / 15;
    dgebi('quest').innerHTML = 'Average distance of 2 points in a unit square';
    dgebi('prediction').innerHTML = `Prediction: \\(\\frac{1}{15}\\sqrt{2}+\\frac{1}{3}\\ln{(1+\\sqrt{2})}+\\frac{2}{15}\\approx${pre}\\)`;
    MathJax.Hub.Queue(['Typeset',MathJax.Hub]);

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

        showResult(sum, points, pre)
    }
}

function circle(wasm, work, points) {
    pre = 4 / Math.PI;
    dgebi('quest').innerHTML = 'Average distance of 2 points on a unit circle';
    dgebi('prediction').innerHTML = `Prediction: \\(\\frac{4}{\\pi}\\approx${pre}\\)`;
    MathJax.Hub.Queue(['Typeset',MathJax.Hub]);

    if (wasm) {} else if (work) {
        let code = calcCircle.toString();
        code = (`var pts = ${points};\n`
            + DistanceCircle.toString()
            + code.substring(code.indexOf('{')+1, code.lastIndexOf('}')));
        wk(code, points, pre);
        };
    } else {
        let sum = 0;

        for (let _ = 0; _ < points; _++) {
            let tmp = new DistanceCircle();
            ds.push(tmp);
            sum += tmp.d;
        }

        showResult(sum, points, pre)
    }
}

function wk(code, points, pre) {
    var blob = new Blob([code], {type: 'application/javascript'});
    worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = message => {
        let msg = message.data;
        ds = msg[1];

        showResult(msg[0], points, pre)
    }
}

function showResult(sum, points, pre) {
    var res = sum / points;
    dgebi('result').innerHTML = `Average with ${points} points: ${res}`;
    var diff = (res - pre) / pre * 100;
    dgebi('diff').innerHTML = `Difference: ${diff}%;`;
}

function calc(mode) {
    dgebi('result').innerHTML = 'Plotting points...';
    dgebi('diff').innerHTML = '';
    var points = 1e6;

    switch (mode) {
        case 'square':
            square(m, w, points);
            break;
        case 'circle':
            circle(m, w, points);
            break;
        default:
            throw new RuntimeException('Nothing here!');
    }
}

function check() {
    m = Boolean(undefined);
    w = Boolean(window.Worker);
    var methods = '';

    if (m) {
        dgebi('wasm').innerHTML = `
            Your browser supports WebAssembly!
            Simulation would run faster than the alternative XD
        `;
        methods += '<button onclick="m = true;">WebAssembly</button>\n';
    } else {
        dgebi('wasm').innerHTML = `
            Your browser does not support WebAssembly!
            That\'s OK, just that the simulation will run slower :D
        `;
    }

    if (w) {
        dgebi('worker').innerHTML = `
            Your browser supports Web Workers!
            Your browser should not freeze during large simulations XD
        `;
        methods += '<button onclick="m = false; w = true;">Web Worker</button>\n';
    } else {
        dgebi('worker').innerHTML = `
            Your browser does not support Web Workers!
            That\'s OK, just that the browser may freeze during large simulations :D
        `;
    }

    if (methods.length) {
        dgebi('method').innerHTML = `
            You can choose differet methods to use!
            Click on a method then the one you want to calculate!
        `;
        dgebi('methods').innerHTML = methods + '<button onclick="m = false; w = false;">Neither</button>';
    }
}

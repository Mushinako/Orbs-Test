var ds = ['Nothing to see'];
var worker;
var m, w;
// var running = false;

function wk(code, points, pre) {
    var blob = new Blob([code], {type: 'application/javascript'});
    worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = message => {
        let msg = message.data;
        ds = msg[1];
        showResult(msg[0], points, pre);
    }
}

function showResult(sum, points, pre) {
    var res = sum / points;
    dgebi('result').innerHTML = `Average with ${points} points: ${res}`;
    var diff = (res - pre) / pre * 100;
    dgebi('diff').innerHTML = `Difference: ${diff}%`;
    for (let b of document.getElementsByTagName('button')) {
        b.disabled = false;
    }
}

function dealWithInput() {
    var unsanitized_p = dgebi('numofsim').value;
    var e_p = unsanitized_p.split(/e/i);
    if (e_p.length > 2) {
        return false;
    } else if (e_p.length === 2) {
        if (/^[0-9]+$/g.test(e_p[1])) {
            if (/^[0-9]+\.?[0-9]*$/g.test(e_p[0])) {
                return Math.ceil(parseFloat(e_p[0]) * Math.pow(10, parseInt(e_p[1])));
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        let p = e_p[0];
        if (/^[0-9]+$/g.test(p)) {
            return parseInt(p);
        } else {
            return false;
        }
    }
}

function calc(mode) {
    dgebi('result').innerHTML = 'Plotting points...';
    dgebi('diff').innerHTML = '';
    var points = dealWithInput();
    if (points === false) {
        dgebi('errornum').innerHTML = 'Number format error! Please check your input.'
    } else if (points < 1) {
        dgebi('errornum').innerHTML = 'We need at least 1 sample to run the simulation! Please check your input.'
    } else {
        dgebi('errornum').innerHTML = `Running simulation with ${points} points.`
        for (let b of document.getElementsByTagName('button')) {
            b.disabled = true;
        }
        switch (mode) {
            case 'square':
                square(m, w, points);
                break;
            case 'circle':
                circle(m, w, points);
                break;
            case 'disk':
                disk(m, w, points);
                break;
            default:
                throw new RuntimeException('Nothing here!');
        }
    }
}

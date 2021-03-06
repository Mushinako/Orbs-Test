window.onload = function () {
    scrpt();
    check();
    resizer();
}

function scrpt() {
    dgebi('content').style.display = 'block';
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

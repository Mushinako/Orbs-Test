dgebi = s => document.getElementById(s);

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

    containerResize();
    $(window).resize(() => {
        containerResize();
    });
}

function containerResize() {
    var win_wid = $(window).width();
    if (win_wid < 550) {
        dgebi('content').style.width = '90%';
        dgebi('content').style.marginLeft = '-' + win_wid / 2 * 0.9 + 'px';
    }
}

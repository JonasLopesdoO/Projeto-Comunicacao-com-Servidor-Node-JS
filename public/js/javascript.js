function mascara(t, mask) {
    var i = t.value.length;
    var saida = mask.substring(1, 0);
    var texto = mask.substring(i)


    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
}

function Numero(e) {
    navegador = /msie/i.test(navigator.userAgent);
    if (navegador) {
        var tecla = event.keyCode;
    } else {
        var tecla = e.which;
    }

    if (tecla > 47 && tecla < 58) {
        return true;
    } else {
        if (tecla != 8) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = {
  mascara, Numero

}
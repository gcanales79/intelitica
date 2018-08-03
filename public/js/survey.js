$("#Submit").on("click", function (event) {
    event.preventDefault();
    var newCliente = {
        cliente: $("#cliente").val().trim(),
        local: $("#local").val().trim(),
        fecha_visita: $("#fecha_visita").val().trim(),
        celular: "+521" + $("#celular").val().trim(),
    }

    $.post("/call", newCliente)
        .then(newCliente)

    $("#cliente").val("");
    $("#local").val("");
    $("fecha_visita").val("");
    $("#celular").val("");
})
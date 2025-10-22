let formulario = document.getElementById("formulario_evento");
let nombreEvento = document.getElementById("nombre_evento");
let descripcionEvento = document.getElementById("descripcion_evento");
let fechaInicioEvento = document.getElementById("fecha_evento");
let horaInicioEvento = document.getElementById("horaI_evento");
let horaFinEvento = document.getElementById("horaF_evento");


formulario.addEventListener("submit", (e) => {

    e.preventDefault();
    let evento = {
        nombre: nombreEvento.value,
        descripcion: descripcionEvento.value,
        fechaI: fechaInicioEvento.value,
        horaI: horaInicioEvento.value,
        horaF: horaFinEvento.value
    }

    registrar(evento);
    console.log(evento)
});

const registrar = async (evento) =>{

    const res = await fetch("http://localhost:8080/eventos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evento)
    }) 

    return res.json();
}


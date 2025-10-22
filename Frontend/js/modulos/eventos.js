let formulario = document.getElementById("formulario_evento");
let nombreEvento = document.getElementById("nombre_evento");
let descripcionEvento = document.getElementById("descripcion_evento");
let fechaInicioEvento = document.getElementById("fecha_inicio_evento");
let fechaFinEvento = document.getElementById("fecha_fin_evento");
let horaInicioEvento = document.getElementById("horaI_evento");
let horaFinEvento = document.getElementById("horaF_evento");
let lugarRealizacion = document.getElementById("lugarRealizacion");
let idMunicipio = document.getElementById("idMunicipio");


formulario.addEventListener("submit", (e) => {

    e.preventDefault();
    let evento = {
        nombre: nombreEvento.value,
        descripcion: descripcionEvento.value,
        fechaI: fechaInicioEvento.value,
        fechaF: fechaFinEvento.value,
        horaI: horaInicioEvento.value,
        horaF: horaFinEvento.value,
        lugarR: lugarRealizacion.value,
        idMuni: idMunicipio.value
    }

    registrarEvento(evento);
    console.log(evento)
});

let registrarEvento = async() =>{
    const nombre =  nombreEvento.value;
    const descripcion = descripcionEvento.value;
    const fechaI =  fechaInicioEvento.value;
    const fechaF =  fechaFinEvento.value;
    const horaI =  horaInicioEvento.value;
    const horaF = horaFinEvento.value;
    const lugarR = lugarRealizacion.value;
    const idMuni = idMunicipio.value;

    if(nombre == "" || descripcion == "" || fechaI == "" || fechaF == "" || horaI == "" || horaF == "" || lugarR == "" || idMuni == ""){
        alert("Hay campos vacios, por favor ingrese todos los datos solicitados");
        return;         
    }

    try{

        const peticion = await fetch("http://localhost:3000/manejo_boleteria/eventos", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                fechaI,
                horaI,
                horaF,
                fechaF,
                lugarR,
                idMuni
            })      
        });

        if (!peticion.ok) throw new Error("Error al registrar el evento");

        const data = await peticion.json();
        console.log(data.data);
        alert("Evento registrado exitosamente! ID: "+data.data.id);   
    }
    catch(error){
        console.error(error);
    }
}
function CalcViaje() {
    let C_alojamiento = parseInt(prompt("Coste de alojamiento"));
    let C_alimentacion  = parseInt(prompt("Coste de alimentación"));
    let C_entretenimiento  = parseInt(prompt("Coste de entretenimiento"));
    let total = C_alimentacion + C_alojamiento + C_entretenimiento;
    console.log("El coste total del viaje es: " + total);

}
CalcViaje();
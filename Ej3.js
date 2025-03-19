function Calculadora(){
    let opcion = prompt("Que quieres hacer pixa.");
    let n1 = parseInt(prompt("N1"));
    let n2 = parseInt(prompt("N2"));
    let resultado;
    switch (opcion) {
        case "suma":
            resultado = n1 + n2
            console.log("La suma es: " + resultado);
            break;
        case "resta":
            resultado = n1 - n2
            console.log("La resta es: " + resultado );

            break;
        case "multiplicacion":
            resultado = n1 * n2
            console.log("La multiplicacion es: " + resultado);

            break;
        default:
            break;
    }



}
Calculadora();
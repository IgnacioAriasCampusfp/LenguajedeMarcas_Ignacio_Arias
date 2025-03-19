function Medias() {
    let nombre = prompt("Como te llama illo: ");
    console.log("Buenas, " + nombre);
    let n1 = parseInt(prompt("Dime tu primera nota: ")) ; 
    let n2 = parseInt(prompt("Dime tu segunda nota: ")) ; 
    let n3 = parseInt(prompt("Dime tu tercera nota: ")) ; 

    let resultado = (n1 + n2 + n3) / 3;
    console.log(resultado);
    if (resultado >= 9) {
        console.log("Sobresaliente");
    } else if (resultado<9 && resultado>7){
        console.log("Notable");
    }else if (resultado<=7 && resultado>=5){
        console.log("Aprobado");
    }else{
        console.log("Suspenso");
    }
    
}
    Medias();
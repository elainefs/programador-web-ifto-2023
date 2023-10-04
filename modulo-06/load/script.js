let img = document.getElementById("loading-img");

let grau = 0;
function girar(){
  grau++
  if(grau >= 360){
    grau = 0
  }
  img.style.transform = `rotate(${grau}deg)`
  setTimeout(girar, 10)
}

girar()
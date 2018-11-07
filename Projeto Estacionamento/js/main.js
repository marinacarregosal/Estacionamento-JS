document.getElementById('formulario').addEventListener('submit', cadastraVeiculo)

$(document).ready(function(){
    $("#placaVeiculo").mask('AAA-9999');
 });

function cadastraVeiculo(e){


    if(document.getElementById("modeloVeiculo").value == "" ||document.getElementById("placaVeiculo").value == ""  ){
    alert('Por favor, preencha todos os campos');
    return false
    }
  else{
    var modeloVeiculo = document.getElementById('modeloVeiculo').value;
    var placaVeiculo = document.getElementById('placaVeiculo').value;
    var time = new Date();

    carro = {
        modelo: modeloVeiculo,
        placa: placaVeiculo,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }

    if(localStorage.getItem('patio') === null){
        var carros = [];
        carros.push(carro);
        localStorage.setItem('patio', JSON.stringify(carros));
    }
    else{
        var carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio', JSON.stringify(carros));
    }

    mostraPatio();
 e.preventDefault();
  }
   
}

function apagarVeiculo(placa){
var carros = JSON.parse(localStorage.getItem('patio'));

for(var i = 0; i < carros.length; i++)
  {
       if(carros[i].placa == placa){
        carros.splice(i, 1);
    }
       localStorage.setItem('patio', JSON.stringify(carros));
     
    }
    mostraPatio();
}

function mostraPatio(){
    var carros = JSON.parse(localStorage.getItem('patio'));
    var carrosResultado = document.getElementById('resultados');

    carrosResultado.innerHTML = '';

    if(carros != null){
        carros.forEach(function(carro){
        var modelo = carro.modelo;
        var placa = carro.placa;
        var hora = carro.hora;
        var minutos = carro.minutos;
    
    carrosResultado.innerHTML += '<tr><td>' + modelo+
                                '</td><td>'+placa+
                                '</td><td>'+hora+ ' : ' + minutos+ '</td><td>'+
                                '<button class="btn btn-danger" onclick="apagarVeiculo(\''+placa+'\')" >Excluir</button>'+
                                '</td></tr>';
          });
    }
    
// for(var r = 0; r = carros.length; r++){
//     debugger;
//     console.log(carros.r);
//     var modelo = carros[r].modelo;
//     var placa = carros[r].placa;
//     var hora = carros[r].hora;
//     var minutos = carros[r].minutos;

// carrosResultado.innerHTML += '<tr><td>' + modelo+
//                             '</td><td>'+placa+
//                             '</td><td>'+hora+ ' : ' + minutos+
//                             '</tr>';

//     }
}
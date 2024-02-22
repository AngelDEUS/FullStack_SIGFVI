import React from 'react';
import Swal from 'sweetalert2';

const Sumar_deudor = ({isOpen, closeModal}) => {

    if(!isOpen) return null ;

    function Verificar_suma(){
        const Insuma = document.getElementById('suma').value;
    
        var con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Insuma.trim() === ''){
            document.getElementById('wrong').innerHTML='Digite un valor para añadir a la cuenta';
            con=false;
        }else if(validacionlt.test(Insuma)){
            document.getElementById('wrong').innerHTML='Digite solo numeros';
        }else{
            document.getElementById('wrong').innerHTML='';
        }

        return con;
    }
    
    function suma(){
        let con=true;
    
        if(!Verificar_suma()){
            con=false
        }
    
        if(con){
            Swal.fire({
                icon:'success',
                text:'Adicion exitosa'
            }).then(function(){
                closeModal();
            })
            return true;
            
        }else{
            Swal.fire({
                icon:'warning',
                title:'Rellene los campos del formulario para continuar',
                toast:true
            })
            return false;
        }
    }

  return (
    <div className='register-container'>
        <div className='fondo-register'>
            <div>
                <p onClick={closeModal} >X</p>
            </div>
            <div class="container__Main-register">
            <h1 className='main-title'>Añadir monto</h1>
            <form action="" class="">
                <span>
                    <h2>Monto actual</h2>
                    <input type="text" name="mopnto" id="monto" value='$50.000' readOnly />
                    <br />
                    <label for="suma">Sumar</label><br/>
                    <input type="number" name="suma" id="suma" placeholder="Añadir" onBlur={Verificar_suma} />
                    <p id="wrong"></p>
                </span>
                <span>
                    <button type="button" name="submit" id="submit" class="boton b5" onClick={suma}>Añadir</button>
                </span>
                <span>
                    <a href="./Deudores"><button type="button" class="boton b2">Regresar</button></a>
                </span>
            </form>       
        </div>
        </div>
    </div>
  )
}

export default Sumar_deudor
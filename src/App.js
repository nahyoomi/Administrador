import React, {Fragment, useState, useEffect} from 'react';
import Cita from './Components/Cita';
import Formulary from './Components/Formulary';


function App() {

  //Citas en localSorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas 
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar operaciones cuando el state cambia
  useEffect( () => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas]);
  //Funcion que toma las citas actuales y agrega la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion elimina cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulary
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

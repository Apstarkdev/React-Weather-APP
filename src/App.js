

import React, { useState, useRef } from "react";

import './index.css';


const api = {
  key: "63e442589b5acb21a4f447908f39ce8e",
  base: "https://api.openweathermap.org/data/2.5/"
};



function App() {
  const [data, setData] = useState('');
  const [clima, setClima] = useState({});

  const buscar = evento =>{
    if (evento.key === "Enter"){
      fetch(`${api.base}weather?q=${data}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => { 
          setClima(result);
          setData('');
          console.log(result);
          });
        }
      }

        // FUNCION PARA LA FECHA
  // const fechaFunc = (f) => {
  //   let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  //   let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  
  //   let dia = dias[f.getDay()]
  //   let fecha = f.getDate();
  //   let mes = meses[f.getMonth()]
  //   let año = f.getFullYear();

  //   return `${dia} ${fecha} ${mes} ${año}`
  // }
        const [isActive, setActive] = useState(false);
        const input = useRef(null);

        const handleClick = () => {
          setActive(!isActive);
          if (isActive) {
            input.current.classList.remove("activo");
          } else {
            input.current.classList.add("activo");
          }
        };



  return (
    <div
      className={
        typeof clima.main != "undefined"
          ? clima.main.temp < 13
            ? "App frio"
            : clima.main.temp >= 25
            ? "App calor"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="buscador-contenedor">
          <button className="buscar-btn" onClick={handleClick}></button>
          <input
            ref={input}
            type="text"
            className="buscador-bar"
            placeholder={clima.name}
            onChange={(e) => setData(e.target.value)}
            value={data}
            onKeyPress={buscar}
          />
        </div>
        {typeof clima.main != "undefined" ? (
          <div>
            <div className="clima-contenedor">
              <div className="estado">{clima.weather[0].main}</div>
              <div className="temp">{`${Math.round(clima.main.temp)}°`}</div>
              <div className="max-min container">
                <span className="max-temp">{`H: ${Math.round(
                  clima.main.temp_max
                )}°`}</span>
                <span className="min-temp">{`L: ${Math.round(
                  clima.main.temp_min
                )}°`}</span>
              </div>
            </div>
            <div className="location-contenedor">
                <div className="location">
                  {clima.name} {clima.sys.country}
                </div>
              {/* <div className="fecha">{fechaFunc(new Date())}</div>  */}
            </div>
          </div>
        ) : (
          " "
        )}
      </main>
    </div>
  );
}

export default App;

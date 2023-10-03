let puntaje = 0;
let indicePreguntaActual = 0;
let preguntas = [];
const contenedorQuiz = document.getElementById('contenedor-quiz');
const botonSiguiente = document.getElementById('siguiente-pregunta');
const botonNuevaTrivia = document.getElementById('nueva-trivia');
const mostrarPuntaje = document.getElementById('puntaje');


const seleccionCategoria = document.getElementById('categoria');
const seleccionDificultad = document.getElementById('dificultad');
const seleccionTipo = document.getElementById('tipo');


function obtenerPreguntas(cantidad = 10, categoria, dificultad, tipo) {
    fetch(`https://opentdb.com/api.php?amount=${cantidad}&category=${categoria}&difficulty=${dificultad}&type=${tipo}`)
        .then(response => response.json())
        .then(data => {
            preguntas = data.results;
            mostrarPregunta();
        });
}


function mostrarPregunta() {
    const pregunta = preguntas[indicePreguntaActual];
    contenedorQuiz.innerHTML = `
        <h2>${pregunta.question}</h2>
        <button class="respuesta">${pregunta.correct_answer}</button>
        ${pregunta.incorrect_answers.map(respuesta => `<button class="respuesta">${respuesta}</button>`).join('')}
    `;


    document.querySelectorAll('.respuesta').forEach(boton => {
        boton.addEventListener('click', seleccionarRespuesta);
    });
}


function seleccionarRespuesta(e) {
    const botonSeleccionado = e.target;
    const respuestaCorrecta = preguntas[indicePreguntaActual].correct_answer;


    if (botonSeleccionado.innerText === respuestaCorrecta) {
        puntaje += 100;
        mostrarPuntaje.innerText = `Puntaje: ${puntaje}`;
    }

  
    indicePreguntaActual++;
    if (indicePreguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        contenedorQuiz.innerHTML = '<h2>Has completado la trivia</h2>';
    }
}


function iniciarNuevaTrivia() {
    puntaje = 0;
    indicePreguntaActual = 0;
    mostrarPuntaje.innerText = `Puntaje: ${puntaje}`;
   
    obtenerPreguntas(
        10, 
        seleccionCategoria.value, 
        seleccionDificultad.value, 
        seleccionTipo.value
    );
}

botonSiguiente.addEventListener('click', mostrarPregunta);
botonNuevaTrivia.addEventListener('click', iniciarNuevaTrivia);


obtenerPreguntas();

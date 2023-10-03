document.addEventListener('DOMContentLoaded', () => {
    const triviaForm = document.getElementById('trivia-form');
    const triviaContainer = document.getElementById('trivia-container');
    const scoreElement = document.getElementById('puntaje');
    const newTriviaButton = document.getElementById('nueva-trivia');

    async function obtenerTrivia(event) {
        event.preventDefault();

        const categoria = document.getElementById('categoria').value;
        const dificultad = document.getElementById('dificultad').value;
        const tipo = document.getElementById('tipo').value;

        const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categoria}&difficulty=${dificultad}&type=${tipo}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('No se pudo obtener las preguntas.');
            }
            const data = await response.json();
            mostrarPreguntas(data.results);
        } catch (error) {
            console.error('Error al obtener las preguntas:', error);
        }
    }

    function mostrarPreguntas(preguntas) {
        triviaContainer.innerHTML = '';

        preguntas.forEach((pregunta, indice) => {
            const preguntaDiv = document.createElement('div');
            preguntaDiv.classList.add('pregunta');

            const preguntaTexto = document.createElement('p');
            preguntaTexto.textContent = `Pregunta ${indice + 1}: ${pregunta.question}`;
            preguntaDiv.appendChild(preguntaTexto);

            const opcionesRespuesta = document.createElement('ul');
            opcionesRespuesta.classList.add('opciones-respuesta');

   
            pregunta.incorrect_answers.forEach(respuesta => {
                const opcion = document.createElement('li');
                opcion.textContent = respuesta;
                opcionesRespuesta.appendChild(opcion);
            });

            const respuestaCorrecta = document.createElement('li');
            respuestaCorrecta.textContent = pregunta.correct_answer;
            opcionesRespuesta.appendChild(respuestaCorrecta);

            shuffle(opcionesRespuesta.children);

            preguntaDiv.appendChild(opcionesRespuesta);
            triviaContainer.appendChild(preguntaDiv);
        });
    }

    function shuffle(lista) {
        for (let i = lista.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lista[i], lista[j]] = [lista[j], lista[i]];
        }
    }

    function reiniciarTrivia() {
        triviaContainer.innerHTML = '';
        scoreElement.textContent = 'Puntaje: 0';
    }

    triviaForm.addEventListener('submit', obtenerTrivia);
    newTriviaButton.addEventListener('click', reiniciarTrivia);
});

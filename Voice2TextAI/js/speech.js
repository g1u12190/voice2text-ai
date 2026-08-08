//======================================================
// Voice2Text AI
// speech.js
//======================================================

// Compatibilidad con Chrome
const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    alert("Este navegador no soporta reconocimiento de voz.");

}

//------------------------------------------------------

const recognition = new SpeechRecognition();

recognition.lang = "es-EC";      // Español Ecuador
recognition.continuous = true;
recognition.interimResults = true;

//------------------------------------------------------

let finalTranscript = "";

let listening = false;

//------------------------------------------------------

const output =
document.getElementById("output");

const status =
document.getElementById("status");

//------------------------------------------------------

recognition.onstart = () => {

    listening = true;

    status.innerHTML =
    "🟢 Escuchando...";

};

//------------------------------------------------------

recognition.onresult = (event) => {

    let interimTranscript = "";

    for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
    ){

        const transcript =
        event.results[i][0].transcript;

        if(event.results[i].isFinal){

            finalTranscript += transcript + " ";

        }

        else{

            interimTranscript += transcript;

        }

    }

    output.value =
    finalTranscript +
    interimTranscript;

};

//------------------------------------------------------

recognition.onerror = (event)=>{

    console.log(event.error);

};

//------------------------------------------------------

// AQUÍ ESTÁ LA MAGIA

recognition.onend = ()=>{

    if(listening){

        recognition.start();

    }

    else{

        status.innerHTML =
        "🔴 Dictado detenido.";

    }

};

//------------------------------------------------------

function startRecognition(){

    if(listening){

        return;

    }

    finalTranscript = "";

    output.value = "";

    recognition.start();

}

//------------------------------------------------------

function continueRecognition(){

    if(listening){

        return;

    }

    recognition.start();

}

//------------------------------------------------------

function stopRecognition(){

    listening = false;

    recognition.stop();

    const cleanedText = cleanText(output.value);

    output.value = cleanedText;

    if(autoImprove.checked){

        improveText();

    }

}

//------------------------------------------------------

function cleanText(text){

    return text

        .trim()

        // Elimina espacios dobles
        .replace(/\s+/g, " ")

        // Quita espacios antes de signos
        .replace(/\s+([.,;:!?])/g, "$1")

        // Agrega un espacio después de signos
        .replace(/([.,;:!?])([^\s])/g, "$1 $2");

}
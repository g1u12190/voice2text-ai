//======================================================
// Voice2Text AI
// ai.js
//======================================================

const improveBtn =
document.getElementById("improveBtn");

const autoImprove =
document.getElementById("autoImprove");

//------------------------------------------------------

async function improveText(){

    const text = output.value.trim();

    if(text === ""){

        status.innerHTML =
        "⚠ No hay texto para mejorar.";

        return;

    }

    improveBtn.disabled = true;

    status.innerHTML =
    "✨ Mejorando texto con IA...";

    try{

        const response =
        await fetch(
            "http://127.0.0.1:8000/improve",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    text:text

                })

            }
        );

        if(!response.ok){

            throw new Error(
                "Error al conectar con el servidor."
            );

        }

        const data =
        await response.json();

        output.value =
        data.improved_text;

        status.innerHTML =
        "✅ Texto mejorado.";

    }

    catch(error){

        console.error(error);

        status.innerHTML =
        "❌ Error al mejorar el texto.";

    }

    finally{

        improveBtn.disabled = false;

    }

}

//------------------------------------------------------

improveBtn.addEventListener(

"click",

()=>{

    improveText();

});
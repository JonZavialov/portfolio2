async function replaceBootScreen(){
    window.location.replace("/boot")
}

async function boot(){
    bootScreen = await document.getElementById("bootScreen")
    bootScreen.innerHTML += "<p>test</p>"
}
document.addEventListener("DOMContentLoaded", ()=>{
    var errorMessage = document.querySelector('.warning');
var resetMessage = document.querySelector(".reset");
var greetMessage = document.querySelector('.message')
    if(errorMessage.innerHTML !== "" || resetMessage.innerHTML !=="" || greetMessage.innerHTML !== ""){
    setTimeout(()=>{
        errorMessage.innerHTML = " ";
        resetMessage.innerHTML = " ";
        

    },4000)
}
setTimeout(()=>{
    greetMessage.innerHTML = ""
},6000)
})
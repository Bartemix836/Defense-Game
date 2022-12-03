
const butExit = document.querySelector('exit');
butExit.addEventListener("click", ()=> {
        if(confirm("Are sure you want to leave from the game?")){
            alert("Ok, thank you for open my game. See you soon to the next time")
            window.close()
        }
        else{
            alert("Great, so let's try  play the game")
        }
    })
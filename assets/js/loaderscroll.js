// on set la hauteur du loader à notre hauteur voulue pour le scroll
let centerContent = document.getElementById('center-content');
let centerFold = document.getElementById('center-fold');

let overflowHeight =  centerContent.clientHeight - centerFold.clientHeight

window.document.getElementById('loader').style.height = overflowHeight + window.innerHeight + "px"

// on créé le scroll
let foldsContent = Array.from(document.getElementsByClassName('fold-content'))
let tick = () => {
    let scroll = -(
        document.documentElement.scrollTop || document.body.scrollTop
    );
    foldsContent.forEach((content) => {
        content.style.transform = `translateY(${scroll}px)`;
    })
    requestAnimationFrame(tick);
}
tick();
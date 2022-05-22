//  Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

//  Milestone 1 -
//  Creiamo il nostro array di oggetti che rappresentano ciascun post. Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// id del post, numero progressivo da 1 a n
// nome autore,
// foto autore,
// data in formato americano (mm-gg-yyyy),
// testo del post,
// immagine (non tutti i post devono avere una immagine),
// numero di likes.
// Non è necessario creare date casuali Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
// [qui, la base dati ve la passo, ma in caso le img che ci sono non funzionino, potete sostituirle in quel modo]

// Milestone 2 -
// Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.

// Milestone 3 -
// Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.



// **BONUS
// Formattare le date in formato italiano (gg/mm/aaaa)
// Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
// Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.



let postContainer = document.getElementById("container");
let proPic = null;

// Genera i post
for (let i = 0; i < posts.length; i++) {
    
    // Formattare le date in formato italiano (gg/mm/aaaa)
    let dataArr = posts[i].created.split("-");
    let dataIta = dataArr[2] + "-" + dataArr[1] + "-" + dataArr[0];

    // Genero le iniziali in caso no avatar
    let nomeCognomeArr = posts[i].author.name.split(" ");
    let inizialiNome = nomeCognomeArr[0][0] + nomeCognomeArr[1][0];
    
    // inserisco avatar e iniziali nel caso specifico
    if(posts[i].author.image == null) {
        proPic = inizialiNome;
    }
    else {
        proPic = `<img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">`;
    }

    
    postContainer.innerHTML += `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${proPic}
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${posts[i].author.name}</div>
                        <div class="post-meta__time">${dataIta}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${posts[i].content}</div>
            <div class="post__image">
                <img src="${posts[i].media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${posts[i].id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${posts[i].id}" class="js-likes-counter">${posts[i].likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `;
}

for (let i = 0; i < posts.length; i++) {
    document.querySelector(`[data-postid="${posts[i].id}"]`).addEventListener("click", function(e){
        e.preventDefault();
        if (this.classList.contains("like-button--liked")) {
            // Rimozione dei like
            this.classList.remove("like-button--liked");
            document.getElementById(`like-counter-${posts[i].id}`).innerHTML = posts[i].likes;
        } else {
            // Aggiunta conto dei like
            this.classList.add("like-button--liked");
            document.getElementById(`like-counter-${posts[i].id}`).innerHTML = posts[i].likes + 1;
        }
    });
}


var tuttiLibri = [];
var carrello = [];

fetch("https://striveschool-api.herokuapp.com/books")
.then((Response) => {
    return Response.json();
})
.then((pippo) => {
    tuttiLibri = pippo;
    pippo.forEach(element => {
        let contenitore = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${element.img}" class="card-img-top" alt="${element.title}">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" onclick="aggiungiAlCarrello('${element.asin}')">Aggiungi al Carrello</button>
                    </div>
                </div>
            </div>`;
        let libri = document.querySelector(".libri");
        libri.innerHTML += contenitore;
    });
});

function filtraLibri() {
    let libri = document.querySelector(".libri");
    libri.innerHTML = "";

    let valoreRicerca = document.getElementById("ricerca").value;
    valoreRicerca = valoreRicerca.toUpperCase();

    tuttiLibri.forEach(element => {
        let titoloUpperCase = element.title.toUpperCase();
        let loInclude = titoloUpperCase.includes(valoreRicerca);
        if (loInclude) {
            let contenitore = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${element.img}" class="card-img-top" alt="${element.title}">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" onclick="aggiungiAlCarrello('${element.asin}')">Aggiungi al Carrello</button>
                        </div>
                    </div>
                </div>`;
            libri.innerHTML += contenitore;
        }
    });
}

function aggiungiAlCarrello(asin) {
    let libro = tuttiLibri.find(libro => libro.asin === asin);
    carrello.push(libro);
    aggiornaCarrello();
}

function mostraCarrello() {
    let carrelloDiv = document.getElementById("carrello");
    carrelloDiv.innerHTML = "<h4>Carrello</h4>";

    if (carrello.length === 0) {
        carrelloDiv.innerHTML += "<p>Il carrello è vuoto.</p>";
    } else {
        carrelloDiv.innerHTML += '<button class="btn btn-danger mb-3" onclick="svuotaCarrello()">Svuota Carrello</button>';
        carrello.forEach((libro, index) => {
            let contenitore = `
                <div class="card mb-2">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="${libro.img}" alt="${libro.title}">
                            <h5 class="card-title mb-0">${libro.title}</h5>
                        </div>
                        <button class="btn btn-danger" onclick="rimuoviDalCarrello(${index})">Rimuovi</button>
                    </div>
                </div>`;
            carrelloDiv.innerHTML += contenitore;
        });
    }
}

function rimuoviDalCarrello(index) {
    carrello.splice(index, 1);
    aggiornaCarrello();
}

function svuotaCarrello() {
    carrello = [];
    aggiornaCarrello();
}

function aggiornaCarrello() {
    document.getElementById("carrello-count").innerText = carrello.length;
    mostraCarrello();
}

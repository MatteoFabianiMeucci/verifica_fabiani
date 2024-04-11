const btn = document.getElementById("btn");
const btn2 = document.getElementById("btn2");
const ctx = document.getElementById("myChart");
const grafico = document.getElementById("grafico");

const map = L.map('map').setView([43.11180572331058, 12.393369779775918], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

btn.addEventListener('click', () => {
    for (const comune of comuni) {
        let marker = L.marker([comune.coordinate.lat, comune.coordinate.lon]).addTo(map);
        marker.bindPopup(`<b>${comune.nome}</b><br><span>Abitanti: ${comune.abitanti.toLocaleString('it-IT')}</span>`);
    }
})

btn2.addEventListener('click', () => {
    const config = {
        type: 'bar',
        data: {
        labels: [],
        datasets: [{
            label: 'Numero di abitanti',
            data: [],
            borderWidth: 1
        }]
        },
        options: {
            plugins: {
                title: {
                display: true,
                text: 'Top 10 città italiane per popolazione'
                }
            }
            
        }
    }
    for (const comune of comuni) {
        let i = 0;
        config.data.labels.push(comune.nome);
        config.data.datasets[i].data.push(comune.abitanti);
        i++;   
    }

    new Chart(ctx,config);
    grafico.classList.add("border");
    grafico.classList.add("border-black");
    grafico.classList.add("bg-white");
})



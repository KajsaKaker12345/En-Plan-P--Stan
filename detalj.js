const params = new URLSearchParams(window.location.search);
const infoId = params.get('id');
const activitySection = document.getElementById('activityInfo');

fetch('activities.json')
    .then(response => response.json())
    .then(data => {

        const activity = data.find(item => String(item.id) === infoId);

        if (activity) {
            displayInformation(activity);
        } else {
            activitySection.textContent = 'Aktiviteten hittades inte, gå tillbaka och testa en annan!';
        }
    })
    .catch(error => console.error('Error loading activity:', error));

/* funktionen som skapar hur informationen presenteras */
function displayInformation(activity) {
    const img = document.createElement('img');
    img.src = activity.image;
    img.alt = activity.title;
    img.classList.add(activity.category.toLowerCase());


    const textDiv = document.createElement('div');
    textDiv.classList.add('textDiv');

    const title = document.createElement('h2');
    title.textContent = activity.title;

    const info = document.createElement('div');
    info.classList.add('info');

    const description = document.createElement('p');
    description.textContent = `Beskrivning: ${activity.description}`;

    const time = document.createElement('p');
    time.textContent = `Tid: ${activity.timespan}`;

    const place = document.createElement('p');
    place.textContent = `Plats: ${activity.location}`;

    const qrCode = document.createElement('img');
    qrCode.src = activity['qr-code'];
    qrCode.alt = "Skanna för vägbeskrivning!";
    qrCode.classList.add('qrCode');

    const qrText = document.createElement('p');
    qrText.innerHTML = "Skanna för att hitta dit " + ' <img src="bilder/vitRightArrow.svg" id="pil" alt="pil"<img>';

    const qrDiv = document.createElement('div');
    qrDiv.classList.add('qrDiv');
    qrDiv.append(qrText, qrCode);

    info.append(time, description, place);
    textDiv.append(title, info, qrDiv);


    activitySection.append(img, textDiv);

}
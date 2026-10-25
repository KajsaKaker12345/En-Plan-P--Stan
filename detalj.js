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

    // titel 
    const title = document.createElement('h2');
    title.textContent = activity.title;

    const icon = document.createElement('img');
    icon.classList.add('icon');
    icon.src = `bilder/${activity.category.toLowerCase()}.svg`;
    icon.alt = `kategori ikon`;

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('titleDiv');
    titleDiv.append(icon, title);

    // info element
    const info = document.createElement('div');
    info.classList.add('info');

    const description = document.createElement('p');
    description.innerHTML = `<strong>Beskrivning:</strong> ${activity.description}`;

    const time = document.createElement('p');
    time.innerHTML = `<strong>Tid:</strong> ${activity.timespan}`;

    const place = document.createElement('p');
    place.innerHTML = `<strong>Plats:</strong> ${activity.location}`;

    // QR koden med text
    const qrCode = document.createElement('img');
    qrCode.src = activity['qr-code'];
    qrCode.alt = "Skanna för vägbeskrivning!";
    qrCode.classList.add('qrCode');

    const qrText = document.createElement('p');
    qrText.innerHTML = "<strong>Skanna för vägbeskrivning</strong> " + ' <img src="bilder/vitRightArrow.svg" id="pil" alt="pil"<img>';

    const qrDiv = document.createElement('div');
    qrDiv.classList.add('qrDiv');

    // lägg till i sektionerna
    qrDiv.append(qrText, qrCode);

    info.append(time, description, place);
    textDiv.append(titleDiv, info, qrDiv);


    activitySection.append(img, textDiv);

}
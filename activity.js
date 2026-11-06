const activitySection = document.getElementById('activities');
const categoryButtons = document.querySelectorAll('.category');

let activitiesData = [];

/* Hämta datan från json */
fetch('activities.json')
    .then(response => response.json())
    .then(data => {
        activitiesData = data;

        filterActivities('ALLA AKTIVITETER');
    })
    .catch(error => console.error('Error loading activities:', error));


/* filtrera aktiviteter efter vilken kategori */
    function filterActivities(selectedCategory) {
        activitySection.innerHTML = '';

        const filteredActivities = activitiesData.filter(activity => {
            return selectedCategory === 'Alla' || selectedCategory === 'ALLA AKTIVITETER' || activity.category.toLowerCase() === selectedCategory.toLowerCase();
        });

        if (filteredActivities.length <= 2) {
            activitySection.classList.add('few-activities');
        } else {
            activitySection.classList.remove('few-activities');
        }

        filteredActivities.forEach(activity => {
            displayActivities(activity);
        });
    }

/* skapa display kort */
    function displayActivities(activity) {
    const activityDiv = document.createElement('div');
            activityDiv.classList.add('activity');
            activityDiv.classList.add(activity.category.toLowerCase());

            activityDiv.addEventListener('click', () => {
                window.location.href = `detalj.html?id=${activity.id}`;
            });

            const categoryIcon = document.createElement('img');
            categoryIcon.classList.add('categoryIcon');
            categoryIcon.src = `bilder/${activity.category.toLowerCase()}.svg`;
            categoryIcon.alt = activity.category;

            const img = document.createElement('img');
            img.src = activity.image;
            img.alt = activity.title;
            img.classList.add('img');

            const imgDiv = document.createElement('div');
            imgDiv.classList.add('imgDiv');
            imgDiv.append(img, categoryIcon);

            const title = document.createElement('h2');
            title.textContent = activity.title;

            const time = document.createElement('p');
            time.innerHTML = `<img src="bilder/timmeBlue.svg" alt="tid"></img>` + ` ${activity.time}`;

            const place = document.createElement('p');
            place.innerHTML = `<img src="bilder/placeBlue.svg" alt="place"></img>` + ` ${activity.location}`;

            const moreInfo = document.createElement('p');
            moreInfo.innerHTML = 'Läs mer ' + `<img src="bilder/blueArrow.svg" alt="pil"></img>`;
            moreInfo.classList.add('moreInfo');

            const textDiv = document.createElement('div');
            textDiv.classList.add('textDiv');
            textDiv.append(title);
            textDiv.append(time);
            textDiv.append(place);
            textDiv.append(moreInfo);

            
            activityDiv.append(imgDiv, textDiv);

            activitySection.append(activityDiv);
    }

/* event listeners för de olika kategorierna */
const categories = document.querySelectorAll(".category");

categories.forEach(category => {
    category.addEventListener("click", () => {

        categories.forEach(item => {
            item.classList.remove("active");
        });

        category.classList.add("active");
        const selectedCategory = category.dataset.category;
        filterActivities(selectedCategory);

    });
});
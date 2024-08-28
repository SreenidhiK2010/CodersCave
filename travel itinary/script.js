document.addEventListener('DOMContentLoaded', function () {
    const itineraryForm = document.getElementById('itineraryForm');
    const itineraryList = document.getElementById('itineraryList');
    const sortByDateButton = document.getElementById('sortByDate');
    const clearItineraryButton = document.getElementById('clearItinerary');

    let itinerary = JSON.parse(localStorage.getItem('itinerary')) || [];
    renderItinerary();

    itineraryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const destination = document.getElementById('destination').value;
        const activity = document.getElementById('activity').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (destination && activity && date && time) {
            addItineraryItem(destination, activity, date, time);
            clearForm();
        }
    });

    sortByDateButton.addEventListener('click', function () {
        itinerary.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
        renderItinerary();
    });

    clearItineraryButton.addEventListener('click', function () {
        itinerary = [];
        localStorage.setItem('itinerary', JSON.stringify(itinerary));
        renderItinerary();
    });

    function addItineraryItem(destination, activity, date, time) {
        const newItem = { destination, activity, date, time };
        itinerary.push(newItem);
        localStorage.setItem('itinerary', JSON.stringify(itinerary));
        renderItinerary();
    }

    function renderItinerary() {
        itineraryList.innerHTML = '';
        itinerary.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span><strong>${item.date} ${item.time}</strong>: ${item.destination} - ${item.activity}</span>
                <div class="actions">
                    <button class="edit" onclick="editItineraryItem(${index})">Edit</button>
                    <button onclick="removeItineraryItem(${index})">Remove</button>
                </div>
            `;
            itineraryList.appendChild(listItem);
        });
    }

    window.removeItineraryItem = function (index) {
        itinerary.splice(index, 1);
        localStorage.setItem('itinerary', JSON.stringify(itinerary));
        renderItinerary();
    };

    window.editItineraryItem = function (index) {
        const item = itinerary[index];
        document.getElementById('destination').value = item.destination;
        document.getElementById('activity').value = item.activity;
        document.getElementById('date').value = item.date;
        document.getElementById('time').value = item.time;

        removeItineraryItem(index);
    };

    function clearForm() {
        document.getElementById('destination').value = '';
        document.getElementById('activity').value = '';
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';
    }
});

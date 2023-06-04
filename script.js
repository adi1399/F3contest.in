// Function to get and display the image of date
function getCurrentImageOfTheDay() {
    const apiKey = "3srvzwSKhWkuUQRMVW77eqySdc1ujtEiUHgyZ3K4";
    const currentDate = new Date().toISOString().slice(0, 10);

    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Display data in the UI
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;
        })
        .catch(error => console.log(error));
}

// Function to get and display the image for date
function getImageOfTheDay(selectedDate) {
    const apiKey = "3srvzwSKhWkuUQRMVW77eqySdc1ujtEiUHgyZ3K4";

    fetch(`https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Display data
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;

            // Save the date to local storage and to history
            saveSearch(selectedDate);
            addSearchToHistory(selectedDate);
        })
        .catch(error => console.log(error));
}

//  saveing a date to local storage
function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById("search-history");
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "javascript:void(0)";
    link.textContent = date;
    link.addEventListener("click", function() {
        // display the image for the clicked date
        getImageOfTheDay(date);
    });
    li.appendChild(link);
    searchHistory.appendChild(li);
}


// Event listener for form submission
document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    const currentDate = new Date().toISOString().split("T")[0];

    if (selectedDate > currentDate) {
        // Display an error message
        alert("Invalid date selection. Please choose a date on or before the current date.");
        return;
    }

    getImageOfTheDay(selectedDate);
});
getCurrentImageOfTheDay();

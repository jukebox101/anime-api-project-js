document.addEventListener("DOMContentLoaded", () => {
    // This event listener waits for the HTML document to be fully loaded and ready to manipulate.
    // It ensures that the JavaScript code runs after the HTML elements are available for interaction.

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResults = document.getElementById("search-results");

    // Here, we're getting references to HTML elements using their unique IDs.
    // 'searchInput' represents the input field, 'searchButton' is the search button, and 'searchResults' is where we'll display our search results.

    const fetchData = async (searchTerm) => {
        // This is an asynchronous function called 'fetchData'.
        // It's responsible for fetching data from the Jikan API based on a search term.

        try {
            // We use a try-catch block to handle any potential errors that might occur during the fetch.

            const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}`;
            // We construct the API URL by combining the base URL with the user's search term.
            // The 'encodeURIComponent' function ensures that special characters in the search term are properly encoded for use in the URL.

            const response = await fetch(apiUrl);
            // We use the 'fetch' function to send a GET request to the API URL and await the response.

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // If the HTTP response status is not in the 200-299 range (i.e., not okay), we throw an error.

            const data = await response.json();
            // We parse the response body as JSON, which is a common format for API responses.
            // The 'await' keyword indicates that we're waiting for this asynchronous operation to complete.
            console.log(data.data)
            return data.data || [];
            // We return the 'data' property from the Jikan API response. If it doesn't exist, we return an empty array.
            // This 'data' property typically contains the search results we're interested in.
        } catch (error) {
            console.error("Fetch error:", error);
        }
        // If any error occurs during the process (e.g., network issues or invalid JSON), it's caught here, and we log an error message.
    };

    const displayResults = (results) => {
        // This function is responsible for displaying the search results on the web page.
        console.log(results)
        searchResults.innerHTML = "";
        // We clear any previous search results by setting the content of 'searchResults' to an empty string.

        results.forEach((result) => {
            // We loop through each result in the 'results' array, which contains data from the API.

            const resultItem = document.createElement("div");
            // For each result, we create a new HTML 'div' element.
            resultItem.textContent = result.title;
            // We set the text content of the 'div' to the 'title' property of the current result.
            // This will display the title of each anime in the search results.
            const resultImg = document.createElement("img")
            resultImg.src = result.images.jpg.image_url
            console.log(result)
            resultItem.appendChild(resultImg)

            searchResults.appendChild(resultItem);
            // We add the 'resultItem' to the 'searchResults' container, effectively displaying it on the web page.
        });
    };

    searchButton.addEventListener("click", async () => {
        // This event listener listens for a click event on the search button.

        const searchTerm = searchInput.value.trim();
        // We get the value of the search input field and remove any leading or trailing whitespace.

        if (searchTerm !== "") {
            // If the search term is not empty...

            const results = await fetchData(searchTerm);
            // We call the 'fetchData' function to fetch data from the API based on the search term.

            displayResults(results);
            // We then call the 'displayResults' function to display the search results on the web page.
        }
    });

    searchInput.addEventListener("keyup", async (event) => {
        // This event listener listens for a keyup event on the search input field.

        if (event.key === "Enter") {
            // If the pressed key is 'Enter' (the user pressed the Enter key)...

            const searchTerm = searchInput.value.trim();
            // We get the value of the search input field and remove any leading or trailing whitespace.

            if (searchTerm !== "") {
                // If the search term is not empty...

                const results = await fetchData(searchTerm);
                // We call the 'fetchData' function to fetch data from the API based on the search term.

                displayResults(results);
                // We then call the 'displayResults' function to display the search results on the web page.
            }
        }
    });
});

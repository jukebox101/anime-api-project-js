document.addEventListener("DOMContentLoaded", () =>{

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResults = document.getElementById("search-results");

    const fetchData = async (searchInput) => {

        try {
            const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchInput)}`

            const response = await fetch(apiUrl);

            if (!response.ok){
                throw new Error(`HTTP Error! Error status: ${response.status}`);
            }

            const data = await response.json();
            
            return data.data || [];
        } catch (error) {
            console.error("Fetch error:", error);
        }

    }


    const displayResults = (results) => {
        searchResults.innerHTML = "";
        
        for (let i = 0; i < results.length; i += 3) {
            // Creates a new row div for every three results
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("result-row");
    
            for (let j = i; j < i + 3 && j < results.length; j++) {
                const result = results[j];
                const resultDiv = document.createElement("div");
                resultDiv.classList.add("result-item");
                const resultImg = document.createElement("img");
                resultImg.src = result.images.jpg.image_url;
                const resultTitle = document.createElement("h3");
                resultTitle.innerText = ` ${result.title}`;
                const resultEpisodes = document.createElement("p");
                resultEpisodes.innerText = `Episodes: ${result.episodes || 0}`;
    
                resultDiv.appendChild(resultImg);
                resultDiv.appendChild(resultTitle);
                resultDiv.appendChild(resultEpisodes);
                rowDiv.appendChild(resultDiv);
            }
    
            searchResults.appendChild(rowDiv);
        }
    };
    

    searchButton.addEventListener("click", async () => {

        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {

            const results = await fetchData(searchTerm);

            displayResults(results);
        }
    });

    searchInput.addEventListener("keyup", async (event) => {

        if (event.key === "Enter") {
            const searchTerm = searchInput.value.trim();

            if (searchTerm !== "") {
                const results = await fetchData(searchTerm);
                displayResults(results);
            }
        }
    });

})
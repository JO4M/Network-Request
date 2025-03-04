document.getElementById("searchBtn").addEventListener("click", async function () {
    let city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Veuillez entrer une ville !");
        return;
    }

    const apiKey = "3d94895fdb3540e48ea114838250303"; // Remplace par ta clé API WeatherAPI
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=fr`;

    try {
        // Envoi de la requête fetch en utilisant async/await
        const response = await fetch(url);

        // Vérification si la réponse est valide
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données météo");
        }

        const data = await response.json();

        // Vérification de l'existence de données d'erreur (ville non trouvée)
        if (data.error) {
            document.getElementById("weatherResult").innerHTML = "Ville non trouvée.";
            return;
        }

        // Extraction des informations météo
        let temperature = data.current.temp_c; // Température en Celsius
        let description = data.current.condition.text; // Description météo
        let cityName = data.location.name; // Nom de la ville

        // Mise à jour du DOM avec les informations météo
        document.getElementById("weatherResult").innerHTML = `
            <h2>${cityName}</h2>
            <p>Température : ${temperature}°C</p>
            <p>Météo : ${description}</p>
        `;
    } catch (error) {
        // Gestion des erreurs dans le bloc catch
        console.error("Erreur:", error);
        document.getElementById("weatherResult").innerHTML = "Une erreur est survenue. Veuillez réessayer.";
    }
});

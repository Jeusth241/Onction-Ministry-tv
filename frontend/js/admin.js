document.getElementById('form-admin').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // 1. Récupération des données du formulaire
    const culteData = {
    titre: document.getElementById('titre').value,
    date: document.getElementById('date_culte').value, // On change 'date_culte' en 'date'
    description: document.getElementById('description').value,
    drive_id: document.getElementById('drive_id').value,
    url_audio: "" 
};

    const adminToken = document.getElementById('token').value;

    console.log("Tentative d'envoi des données :", culteData);

    try {
        // 2. Envoi vers ton serveur Flask (Port 5000)
        const response = await fetch('http://127.0.0.1:5000/api/admin/ajouter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Token': adminToken
            },
            body: JSON.stringify(culteData)
        });

        const result = await response.json();

        // 3. Analyse de la réponse
        if (response.ok) {
            alert("Succès ! Le culte a été enregistré dans PostgreSQL.");
            document.getElementById('form-admin').reset(); // Vide le formulaire
        } else {
            alert("Erreur du serveur : " + (result.error || "Problème inconnu"));
        }

    } catch (error) {
        console.error("Erreur de connexion :", error);
        alert("Impossible de joindre le serveur. Vérifie qu'il tourne sur le port 5000.");
    }
});
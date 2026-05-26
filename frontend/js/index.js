async function chargerCultes() {
    const container = document.getElementById('container-cultes');
    
    try {
        // 1. AJOUTE LA ROUTE EXACTE ICI (Exemple: /api/cultes ou /cultes)
        const response = await fetch('https://onction-ministry-tv.onrender.com/api/cultes');
        
        if (!response.ok) throw new Error("Erreur serveur");
        const cultes = await response.json();

        container.innerHTML = cultes.map(culte => `
            <div class="card-culte">
                <div class="video-container">
                    <iframe src="https://drive.google.com/file/d/${culte.drive_id}/preview" width="100%" height="200" allow="autoplay"></iframe>
                </div>
                <h3>${culte.titre}</h3>
                <p class="date">${new Date(culte.date_culte).toLocaleDateString()}</p>
                <p>${culte.description}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error(error); // Permet de voir le vrai problème dans la console Inspecter (F12)
        container.innerHTML = "<p>Erreur lors du chargement des cultes.</p>";
    }
}

// Lancer le chargement au démarrage
document.addEventListener('DOMContentLoaded', chargerCultes);
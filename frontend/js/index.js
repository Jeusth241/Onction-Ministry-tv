async function chargerCultes() {
    const container = document.getElementById('container-cultes');
    if (!container) return; // Évite les erreurs si le container n'est pas sur la page actuelle
    
    try {
        const response = await fetch('https://onction-ministry-tv.onrender.com/api/cultes');
        
        if (!response.ok) throw new Error("Erreur serveur ou route introuvable");
        const cultes = await response.json();

        container.innerHTML = cultes.map(culte => `
            <div class="card-culte">
                <div class="video-container">
                    <iframe src="https://drive.google.com/file/d/${culte.video_drive_id}/preview" width="100%" height="200" allow="autoplay" frameborder="0"></iframe>
                </div>
                <h3>${culte.titre}</h3>
                <p class="date">${new Date(culte.date_culte).toLocaleDateString()}</p>
                <p>${culte.description}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error("Erreur lors du fetch :", error);
        container.innerHTML = "<p>Erreur lors du chargement des cultes.</p>";
    }
}

// Lancer le chargement au démarrage
document.addEventListener('DOMContentLoaded', chargerCultes);
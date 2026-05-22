const API_URL = "https://votre-backend-sur-render.com/api";
const TOKEN = "votre_cle_par_defaut_temporaire"; // La clé que tu as mise dans ton app.py

async function testerConnexion() {
    const res = await fetch(`${API_URL}/status`);
    const data = await res.json();
    console.log(data.message);
}

testerConnexion();
async function afficherCultes() {
    const container = document.getElementById('liste-cultes');
    const response = await fetch('https://votre-backend.render.com/api/cultes');
    const cultes = await response.json();

    container.innerHTML = cultes.map(culte => `
        <div class="culte-card">
            <div class="video-container">
                <iframe src="https://drive.google.com/file/d/${culte.drive_id}/preview"></iframe>
            </div>
            <div class="card-content">
                <h3>${culte.titre}</h3>
                <p><small>${new Date(culte.date_culte).toLocaleDateString()}</small></p>
                <p>${culte.description || ''}</p>
                <a href="https://drive.google.com/uc?export=download&id=${culte.drive_id}" class="btn-download">
                    📥 Télécharger la vidéo
                </a>
            </div>
        </div>
    `).join('');
}

afficherCultes();
async function envoyerCulte() {
    const culteData = {
        titre: document.getElementById('titre').value,
        date: document.getElementById('date').value,
        drive_id: document.getElementById('driveId').value,
        description: document.getElementById('description').value
    };

    const token = document.getElementById('adminToken').value;

    const response = await fetch('https://votre-backend.render.com/api/admin/ajouter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Admin-Token': token // On envoie la clé ici
        },
        body: JSON.stringify(culteData)
    });

    if (response.ok) {
        alert("Culte ajouté avec succès !");
    } else {
        alert("Erreur : Clé incorrecte ou problème serveur.");
    }
}


async function ajouterCulte(event) {
    event.preventDefault(); // Empêche la page de se recharger

    const data = {
        titre: document.getElementById('titre').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        drive_id: document.getElementById('drive_id').value,
        url_audio: document.getElementById('url_audio').value
    };

    const response = await fetch(`${API_URL}/admin/ajouter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Admin-Token': TOKEN
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        alert("Culte ajouté avec succès !");
        document.getElementById('form-admin').reset(); // Vide le formulaire
    } else {
        alert("Erreur : " + result.error);
    }
}
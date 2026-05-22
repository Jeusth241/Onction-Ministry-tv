import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, init_db
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

# Initialisation de la table au lancement
init_db()

ADMIN_KEY = os.environ.get('ADMIN_SECRET_KEY', 'jeusth2000')

def check_auth(key):
    return key == ADMIN_KEY

# --- ROUTE POUR AJOUTER UN CULTE (POST) ---
@app.route('/api/cultes', methods=['POST'])
def ajouter_culte():
    data = request.json
    
    # --- DEBUG : Affiche ce que le serveur reçoit réellement dans le terminal ---
    print(f"Données reçues du navigateur : {data}")

    # Récupération du token envoyé dans le corps du JSON par le formulaire
    user_key = data.get('token')
    if not check_auth(user_key):
        return jsonify({"status": "error", "message": "Accès refusé : Clé de sécurité invalide"}), 401

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        titre = data.get('titre')
        date_val = data.get('date_culte') or data.get('date')
        desc = data.get('description', '')
        
        # Récupération des deux IDs Google Drive distincts depuis le formulaire
        video_drive_id = data.get('video_drive_id')
        audio_drive_id = data.get('audio_drive_id')

        # Requête SQL mise à jour avec les nouveaux noms de colonnes
        query = """
            INSERT INTO cultes (titre, date_culte, description, video_drive_id, audio_drive_id)
            VALUES (%s, %s, %s, %s, %s)
        """
        cur.execute(query, (titre, date_val, desc, video_drive_id, audio_drive_id))
        
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"status": "success", "message": "Culte ajouté avec succès !"}), 201
    
    except Exception as e:
        # Affiche l'erreur précise dans le terminal VS Code
        print(f"ERREUR D'INSERTION : {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

# --- ROUTE POUR RÉCUPÉRER LES CULTES (GET) ---
@app.route('/api/cultes', methods=['GET'])
def recuperer_cultes():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor) # Pour avoir des résultats sous forme de dictionnaire
        cur.execute("SELECT * FROM cultes ORDER BY date_culte DESC")
        resultats = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(resultats)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# À la toute fin de app.py
if __name__ == '__main__':
    # host='0.0.0.0' permet de débloquer les connexions sur Windows
    app.run(debug=True, host='0.0.0.0', port=5000)
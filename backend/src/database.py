import psycopg2
import sys

def get_db_connection():
    try:
        # On utilise les paramètres nommés plutôt qu'une URL
        conn = psycopg2.connect(
            host="127.0.0.1",
            port="5432",
            database="onction_ministry",
            user="postgres",
            password="jeusth2000",
            connect_timeout=3
        )
        # On force l'encodage de la session
        conn.set_client_encoding('UTF8')
        return conn
    except Exception as e:
        print("--- TENTATIVE DE DÉCODAGE DE L'ERREUR ---")
        try:
            # Si l'erreur contient des caractères spéciaux, on les nettoie
            raw_msg = str(e).encode('cp1252', errors='replace').decode('utf-8', errors='replace')
            print(f"Message (nettoyé) : {raw_msg}")
        except:
            print("Impossible d'afficher le message d'erreur (problème d'encodage Windows).")
        
        print("CONSEIL : Vérifie si pgAdmin est ouvert et si la base 'onction_ministry' existe.")
        return None

def init_db():
    conn = get_db_connection()
    if conn:
        cur = conn.cursor()
        # Mise à jour des colonnes : video_drive_id et audio_drive_id
        cur.execute('''
            CREATE TABLE IF NOT EXISTS cultes (
                id SERIAL PRIMARY KEY,
                titre TEXT NOT NULL,
                date_culte DATE NOT NULL,
                description TEXT,
                video_drive_id TEXT,
                audio_drive_id TEXT
            );
        ''')
        conn.commit()
        cur.close()
        conn.close()
        print("Base de données initialisée avec succès avec la nouvelle structure !")
    else:
        print("Échec de l'initialisation : la connexion a renvoyé None.")
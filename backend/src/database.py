import os
import psycopg2

def get_db_connection():
    # On cherche la variable de la base de données en ligne (Render)
    DATABASE_URL = os.environ.get('DATABASE_URL')
    
    if DATABASE_URL:
        # Connexion au PostgreSQL en ligne sur Render
        return psycopg2.connect(DATABASE_URL)
    else:
        # Connexion locale sur ton PC
        return psycopg2.connect(
            host="127.0.0.1",
            database="onction_ministry",
            user="postgres",
            password="jeusth2000"  # Remets ton mot de passe local si nécessaire
        )

def init_db():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Création automatique de la table si elle n'existe pas
        cur.execute("""
            CREATE TABLE IF NOT EXISTS cultes (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(255) NOT NULL,
                date_culte DATE NOT NULL,
                description TEXT,
                video_drive_id VARCHAR(255),
                audio_drive_id VARCHAR(255)
            );
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("Base de données initialisée avec succès.")
    except Exception as e:
        print(f"Erreur lors de l'initialisation de la base : {e}")
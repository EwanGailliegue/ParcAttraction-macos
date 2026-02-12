import request.request as req

def add_critique(attraction_id: int, data: dict):
    if not attraction_id:
        return False

    commentaire = (data.get("commentaire") or "").strip()
    note = data.get("note", None)

    # champs optionnels
    prenom = (data.get("prenom") or "").strip() or None
    nom = (data.get("nom") or "").strip() or None

    if commentaire == "":
        return False

    try:
        note_int = int(note)
    except Exception:
        return False

    if note_int < 1 or note_int > 5:
        return False

    visible = data.get("visible", True)

    requete = """
        INSERT INTO critique (attraction_id, prenom, nom, note, commentaire, visible)
        VALUES (?, ?, ?, ?, ?, ?);
    """
    new_id = req.insert_in_db(requete, (attraction_id, prenom, nom, note_int, commentaire, visible))
    return new_id

def get_critiques_for_attraction(attraction_id: int, only_visible: bool = True):
    if not attraction_id:
        return []

    if only_visible:
        return req.select_from_db(
            "SELECT * FROM critique WHERE attraction_id = ? AND visible = 1 ORDER BY created_at DESC",
            (attraction_id,)
        )

    return req.select_from_db(
        "SELECT * FROM critique WHERE attraction_id = ? ORDER BY created_at DESC",
        (attraction_id,)
    )

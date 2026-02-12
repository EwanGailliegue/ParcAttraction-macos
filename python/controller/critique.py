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

def get_stats_for_attraction(attraction_id: int, only_visible: bool = True):
    if not attraction_id:
        return {"attraction_id": attraction_id, "count": 0, "avg": 0}

    if only_visible:
        rows = req.select_from_db(
            "SELECT COUNT(*) AS count, AVG(note) AS avg FROM critique WHERE attraction_id = ? AND visible = 1",
            (attraction_id,)
        )
    else:
        rows = req.select_from_db(
            "SELECT COUNT(*) AS count, AVG(note) AS avg FROM critique WHERE attraction_id = ?",
            (attraction_id,)
        )

    if not rows:
        return {"attraction_id": attraction_id, "count": 0, "avg": 0}

    count = int(rows[0].get("count") or 0)
    avg = rows[0].get("avg", None)

    # avg peut être None si count=0
    if avg is None:
        avg_value = 0
    else:
        avg_value = round(float(avg), 1)

    return {"attraction_id": attraction_id, "count": count, "avg": avg_value}

def get_all_critiques():
    return req.select_from_db("SELECT * FROM critique ORDER BY created_at DESC")



def set_critique_visibility(critique_id: int, visible: bool):
    v = 1 if visible else 0
    rowcount = req.update_from_db(
        "UPDATE critique SET visible = ? WHERE critique_id = ?",
        (v, critique_id)
    )
    return rowcount > 0


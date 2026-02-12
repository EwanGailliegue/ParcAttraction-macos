import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "parc.db"
INIT_SQL = BASE_DIR / "sql_file" / "init.sql"
CREATE_SQL = BASE_DIR / "sql_file" / "create.sql"


def run_sql_file(conn: sqlite3.Connection, path: Path):
    sql = path.read_text(encoding="utf-8")
    conn.executescript(sql)


if __name__ == "__main__":
    conn = sqlite3.connect(DB_PATH)
    try:
        run_sql_file(conn, INIT_SQL)
        run_sql_file(conn, CREATE_SQL)
        conn.commit()
        print("Base initialisée :", DB_PATH)
    finally:
        conn.close()

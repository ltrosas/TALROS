# TALROS

A full-stack trucking operations system built with FastAPI and React.  
Designed to manage trucks, loads, and trips.

---

## Tech Stack

- **Backend:** FastAPI, PostgreSQL, SQLAlchemy
- **Frontend:** React (Vite), Tailwind CSS, ShadCN UI
- **Other Tools:** Axios, Lucide Icons, dotenv

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ltrosas/TALROS.git
cd TALROS
```

---

### 2. Backend Setup (`/backend`)

#### Create and activate a virtual environment:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

#### Install dependencies:

```bash
pip install -r requirements.txt
```

#### Configure environment variables:

Create a `.env` file in `backend/app/`:

```env
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_database
```

#### Run the server:

```bash
uvicorn app.main:app --reload
```

Access the API docs at: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 3. Frontend Setup (`/frontend`)

```bash
cd ../frontend
npm install
```

#### Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

> This ensures all backend requests point to the FastAPI server.

#### Start the frontend:

```bash
npm run dev
```

View the app at: [http://localhost:5173](http://localhost:5173)

---

## Features

- Create, view, and delete trucks
- Create loads
- Create trips with references to trucks and loads
- Search trucks by registration
- Prevent deletion of trucks tied to trips

---

## Project Structure

```
TALROS/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routers/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
└── README.md
```

---

## Future Improvements

- Add edit/update support for trucks, loads, and trips
- Add user authentication

---
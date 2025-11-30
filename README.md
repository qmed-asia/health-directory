# Health Directory

A comprehensive, open-source healthcare directory for Malaysia, featuring verified hospitals and specialist doctors. This project aggregates data from various sources to provide an easy-to-search database for patients.

## Project Structure

This is a monorepo containing:

-   **frontend-next/**: The modern Next.js 16 frontend application (App Router, Tailwind CSS v4).
-   **frontend/**: The legacy Vite React frontend (deprecated but kept for reference).
-   **root (backend)**: An Express.js server serving the API and static JSON data.
-   **notebook/**: Python Jupyter notebooks used for scraping and data processing. (a scraped database of health directory for malaysia (for a start), along with the scraping tools development for the database.)
-   **data/**: Raw and processed JSON data files.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (v9 or v10)

### Backend (API)

The backend serves the JSON data via a simple Express API.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Start the server:**
    ```bash
    node server.js
    ```
    The API will be available at `http://localhost:3000`.
    -   `GET /api/hospitals`: List all hospitals
    -   `GET /api/doctors`: List all doctors
    -   `GET /api/doctors/:source`: List doctors by source (e.g., `columbia`, `gleaneagles`)

### Frontend (Next.js)

The new frontend is built with Next.js 16.

1.  **Navigate to the directory:**
    ```bash
    cd frontend-next
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Configure Environment:**
    Copy `.env.example` to `.env.local` and set your API URL:
    ```bash
    cp .env.example .env.local
    ```
    *Default:* `NEXT_PUBLIC_API_URL=http://localhost:3000`

4.  **Run Development Server:**
    ```bash
    pnpm run dev
    ```
    Open `http://localhost:3001` (or whatever port Next.js assigns if 3000 is taken).

## Deployment (Vercel)

This project is designed to be deployed as two separate Vercel projects:

1.  **Backend**:
    -   **Root Directory**: `.` (Project Root)
    -   **Build Command**: None (or default)
    -   **Output Directory**: `.`
    -   This will serve `server.js` as a serverless function entry point.

2.  **Frontend**:
    -   **Root Directory**: `frontend-next`
    -   **Framework Preset**: Next.js
    -   **Environment Variables**: Add `NEXT_PUBLIC_API_URL` pointing to your deployed backend URL.

## Data Sources

Data is scraped from public directories of major hospital groups in Malaysia.
-   Columbia Asia
-   Gleneagles
-   Tung Shin
-   Georgetown Specialist

## License

Open Source.

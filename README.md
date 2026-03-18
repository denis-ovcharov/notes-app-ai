# Notes App AI 📝

A modern, full-stack note-taking application built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

## Features

- ✨ Create, edit, and delete notes
- 🏷️ Categorize notes (Personal, Work, Ideas, etc.)
- 🔍 Filter notes by category
- 📱 Responsive design with Tailwind CSS
- 💾 MongoDB database integration
- ⚡ Fast and lightweight with Next.js App Router

## Tech Stack

| Category       | Technology          |
|----------------|---------------------|
| Framework      | Next.js 16          |
| Language       | TypeScript          |
| Styling        | Tailwind CSS v4     |
| Database       | MongoDB             |
| UI Components  | React 19            |
| Build Tool     | PostCSS + Autoprefixer |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB connection string (local or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/note-app-ai.git
   cd note-app-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── notes/         # API routes for CRUD operations
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/
│   ├── CategoryFilter.tsx # Category filter component
│   ├── DeleteConfirmModal.tsx # Delete confirmation modal
│   ├── NoteEditor.tsx     # Note editor form
│   └── NoteList.tsx       # Notes list display
├── lib/
│   └── mongodb.ts         # MongoDB connection utility
└── types/
    └── note.ts            # TypeScript type definitions
```

## Available Scripts

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start development server       |
| `npm run build` | Build for production           |
| `npm start`     | Start production server        |

## Environment Variables

| Variable      | Description                  | Example                              |
|---------------|------------------------------|--------------------------------------|
| `MONGODB_URI` | MongoDB connection string    | `mongodb://localhost:27017/notes`    |

## License

MIT

---

Built with ❤️ using Next.js and MongoDB

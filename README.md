# Domain Name Investment Platform

This project is a multi-agent bot system using LangGraph to automate the generation, evaluation, and resale of high-quality, brandable domain names. The system includes a dashboard to view the output of the bots and their status.
[Project Documentation](https://coda.io/d/
Domain-name-Bot-Agents-project_dfkJDNYF-UH]

## Features

- View a list of domains with basic information
- Filter domains by status, TLD, bot, and industry
- Search domains by name
- Pagination for large datasets
- Detailed view for individual domains (TODO)
- Actions such as edit, delete, buy, and resell (TODO)

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Prisma ORM
- PostgreSQL (via Supabase)
- Zustand for state management

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database (We use Supabase)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/sreenivasanac/namesmith_console
   cd namesmith_console
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your Supabase connection strings:
   ```
   DATABASE_URL="your_database_url_here"
   DIRECT_URL="your_direct_url_here"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url_here"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
   You can get the `.env` file from the project owner.

4. Run Prisma migrations:
   ```
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Management

- To create new Prisma migrations after schema changes:
  ```
  npx prisma migrate dev --name <migration-name>
  ```

## TODO

1. Implement detailed view for individual domains
2. Add edit, delete, buy, and resell actions
3. Implement sorting functionality for the domain table
4. Create an API for agents to connect and update the database with new domains
5. Improve error handling and add more comprehensive logging
6. Implement user authentication and authorization
7. Add unit and integration tests
8. Optimize performance for large datasets

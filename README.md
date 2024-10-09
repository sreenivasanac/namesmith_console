# Domain Name Investment Platform

This project is a multi-agent bot system using LangGraph to automate the generation, evaluation, and resale of high-quality, brandable domain names. The system includes a dashboard to view the output of the bots and their status.

## Tech Stack

- NextJS 14
- shadcn UI
- Tailwind CSS
- Supabase (PostgreSQL)
- Prisma ORM
- Lucide icons

## Features

1. Dashboard to view all domain names processed by the bots
2. Table with basic information of domain names
3. Detailed information view for each domain
4. Search and filter functionality
5. Pagination
6. Actions: View, Edit, Delete, Buy, Resell


## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Supabase database and obtain the connection strings.

4. Create a `.env` file in the root directory and add your Supabase connection strings:
   ```
   DATABASE_URL="your_database_url_here"
   DIRECT_URL="your_direct_url_here"
   ```

5. Generate Prisma client:
   ```
   npx prisma generate
   ```

6. Run database migrations:
   ```
   npx prisma migrate dev
   ```

7. Seed the database:
   ```
   npm run seed
   ```

8. Run the development server:
   ```
   npm run dev
   ```

9. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The project uses the following main models:

- `DomainName`: Stores basic information about domain names
- `DNAvailabilityStatus`: Tracks the availability status of domains
- `DNEvaluation`: Stores evaluation metrics for domains
- `DNSEOAnalysis`: Contains SEO-related information for domains

## Components

- `Domains`: Displays a table of domain information
- Various UI components from shadcn UI library

## Development

- To create new components, use the shadcn CLI:
  ```
  npx shadcn-ui@latest add <component-name>
  ```

- To create new Prisma migrations after schema changes:
  ```
  npx prisma migrate dev --name <migration-name>
  ```

## TODO

1. Implement search and filter functionality
2. Add pagination to the domains table
3. Create detailed view for individual domains
4. Implement edit, delete, buy, and resell actions

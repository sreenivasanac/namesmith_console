.env file
Setting which did Not work:
# DATABASE_URL="postgres://postgres.ipddophqyjokvgmgovst:Nam3Sm1th4321%5E@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
# DIRECT_URL="postgres://postgres.ipddophqyjokvgmgovst:Nam3Sm1th4321%5E@db.ipddophqyjokvgmgovst.supabase.co:5432/postgres?sslmode=require"

Error: P1001: Can't reach database server at aws-0-eu-central-1.pooler.supabase.com:6543 #24477
https://github.com/prisma/prisma/discussions/24477#discussioncomment-10571550


Prisma integration in Next.js
https://supabase.com/partners/integrations/prisma
https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
https://www.prisma.io/docs/orm/prisma-schema/postgresql-extensions

sample Next.js Supabase project
https://github.com/mckaywrigley/takeoff-cursor-course


URL encoding for the connection string
https://forum.codewithmosh.com/t/trouble-with-prisma-mysql-connection-string-when-using-socket-connection-method/23823/3
https://github.com/prisma/prisma/discussions/21666#discussioncomment-8819505



prepared statement \"s0\" already exists
https://github.com/prisma/prisma/issues/11643#issuecomment-1034078942
You need to combine the connection pooled connection string from Supabase (port 6543) with adding &pgbouncer=true to the connection string to get rid of this problem. The addition to the connection string tells Prisma that it is talking to a server running PgBouncer - which is the case for Supabase's connection pooled connection string of course.


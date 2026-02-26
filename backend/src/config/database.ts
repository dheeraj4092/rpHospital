// Database configuration
// Currently using in-memory storage
// When you need to add a database later, you can:
// 1. Install your preferred database client (e.g., Prisma, TypeORM, MongoDB driver)
// 2. Replace the dataStore import with your database client
// 3. Update the services to use the database client
// 4. The data structure in src/data/store.ts can serve as your schema reference

import dataStore from '../data/store.js';

export default dataStore;

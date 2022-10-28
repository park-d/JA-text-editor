import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function that accepts the given content and adds it to the record in the database
export const putDb = async (content) => {
  console.log("Put to the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Use the .put() method to update database.
  const request = store.put({id: 1, value: content});
  // Get confirmation of the request.
  const result = await request;
  console.log("Data saved to the database", result);
};

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);
 
  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result.value);
  return result.value;
};

initdb();

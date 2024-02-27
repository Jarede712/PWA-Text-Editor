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

export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ content: content });
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Error saving data to the database', error);
  }
};

export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('Error fetching data from the database', error);
  }
};

initdb();

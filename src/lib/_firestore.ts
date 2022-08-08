import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJnm78_e8NnTDT_4ctgYGaiJNYB799CJw',
  authDomain: 'conpingstore.firebaseapp.com',
  projectId: 'conpingstore',
  storageBucket: 'conpingstore.appspot.com',
  messagingSenderId: '22687938963',
  appId: '1:22687938963:web:d76306991bee3cc00d1066',
  measurementId: 'G-SB30TPR7Y6',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const batch = writeBatch(db);


export const updateDb = async (programs: any, contents: any, celebs: any) => {
  try {
    // 컬렉션 의 모든 데이터 삭제
    await deleteCollection(db, 'program', 20);
    await deleteCollection(db, 'contents', 20);
    await deleteCollection(db, 'celeb', 20);

    // 모든 데이터 추가
    contents.forEach((content: any) => {
      const dbRef = doc(collection(db, 'contents'), content.id);
      batch.set(dbRef, content);
    });
    console.log(`add contents: ${contents.length}`);

    celebs.forEach((celeb: any) => {
      const dbRef = doc(collection(db, 'celeb'), celeb.id);
      batch.set(dbRef, celeb);
    });
    console.log(`add celebs: ${celebs.length}`);

    programs.forEach((program: any) => {
      const dbRef = doc(collection(db, 'program'), program.id);
      batch.set(dbRef, program);
    });
    console.log(`add programs: ${programs.length}`);

    await batch.commit();
  } catch (e) {
    console.error('Error adding document: ', e);
  }

};

const deleteCollection = async (db: any, collectionPath: string, batchSize: number) => {
  const collectionRef = collection(db, collectionPath);
  const q = query(collectionRef, orderBy('id'));

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, q, resolve, collectionPath).catch(reject);
  });
};
const deleteQueryBatch = async (db: any, query: any, resolve: any, collectionPath:string) => {
  const snapshot = await getDocs(query);

  const batchSize = snapshot.size;
  console.log(`remove ${collectionPath}: ${batchSize}`);
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  resolve();
  return;
};

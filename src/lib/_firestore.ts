import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch, collection, query, orderBy, where, limit, getDocs, startAfter, type DocumentData, getDoc } from 'firebase/firestore';
import type { QueryConstraint } from '@firebase/firestore';

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
let batch = writeBatch(db);


export const updateDb = async (programs: any, contents: any, celebs: any) => {
  batch = writeBatch(db);
  try {
    // 컬렉션 의 모든 데이터 삭제
    await deleteCollection(db, 'program');
    await deleteCollection(db, 'contents');
    await deleteCollection(db, 'celeb');

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
    return ;
  } catch (e) {
    console.error('Error adding document: ', e);
  }

};

const deleteCollection = async (db: any, collectionPath: string) => {
  const collectionRef = collection(db, collectionPath);
  const q = query(collectionRef, orderBy('id'));

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, q, resolve, collectionPath).catch(reject);
  });
};
const deleteQueryBatch = async (db: any, query: any, resolve: any, collectionPath: string) => {
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

export const firestoreProgramById = async (id: string) => {
  const document = await getDoc(doc(collection(db, 'program'), id));
  return document.data();
};

export const firestorePrograms = async () => {
  const first = query(collection(db, 'program'), orderBy('publishedAt', 'desc'));
  const documentSnapshots = await getDocs(first);
  const programs: DocumentData[] = [];
  documentSnapshots.forEach(doc => {
    programs.push(doc.data());
  });
  return programs;
};

export const firestoreContentById = async (id: string) => {
  const document = await getDoc(doc(collection(db, 'contents'), id));
  return document.data();
};

export const firestoreContents = async (limitCnt = 5, cursor = '', order = 'statistics.viewCount', direction:'desc' | 'asc' = 'desc', whereQuery?: QueryConstraint) => {
  let first;
  if (cursor) {
    const nextCur = await getDoc(doc(collection(db, 'contents'), cursor));
    if (whereQuery) {
      first = query(collection(db, 'contents'), whereQuery, orderBy(order, direction), startAfter(nextCur), limit(limitCnt));
    } else {
      first = query(collection(db, 'contents'), orderBy(order, direction), startAfter(nextCur), limit(limitCnt));
    }
  } else {
    if (whereQuery) {
      first = query(collection(db, 'contents'), whereQuery, orderBy(order, direction), limit(limitCnt));
    } else {
      first = query(collection(db, 'contents'), orderBy(order, direction), limit(limitCnt));
    }
  }
  const documentSnapshots = await getDocs(first);
  const contents: DocumentData[] = [];
  documentSnapshots.forEach(doc => {
    contents.push(doc.data());
  });
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return {
    totalCount: 0,
    contents,
    pageInfo: {
      startCursor: lastVisible && lastVisible.id,
      hasNextPage: !!lastVisible && documentSnapshots.docs.length >= limitCnt,
    },
  };
};

export const firestoreContentsByProgramId = async (programId: string, limitCnt = 5, cursor = '', order = 'statistics.viewCount', direction:'desc' | 'asc' = 'desc', whereQuery?: QueryConstraint) => {
  let first;
  if (cursor) {
    const nextCur = await getDoc(doc(collection(db, 'contents'), cursor));
    if (whereQuery) {
      first = query(collection(db, 'contents'), where('program.id', '==', programId), whereQuery, orderBy(order, direction), startAfter(nextCur), limit(limitCnt));
    } else {
      first = query(collection(db, 'contents'), where('program.id', '==', programId), orderBy(order, direction), startAfter(nextCur), limit(limitCnt));
    }
  } else {
    if (whereQuery) {
      first = query(collection(db, 'contents'), where('program.id', '==', programId), whereQuery, orderBy(order, direction), limit(limitCnt));
    } else {
      first = query(collection(db, 'contents'), where('program.id', '==', programId), orderBy(order, direction), limit(limitCnt));
    }
  }
  const documentSnapshots = await getDocs(first);
  const contents: DocumentData[] = [];
  documentSnapshots.forEach(doc => {
    contents.push(doc.data());
  });
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return {
    totalCount: 0,
    contents,
    pageInfo: {
      startCursor: lastVisible && lastVisible.id,
      hasNextPage: !!lastVisible && documentSnapshots.docs.length >= limitCnt,
    },
  };
};

export const firestoreCeleb = async (limitCnt = 5, cursor = '', order = 'statistics.subscriberCount', direction:'desc' | 'asc' = 'desc') => {
  let first;
  if (cursor) {
    const nextCur = await getDoc(doc(collection(db, 'celeb'), cursor));
    first = query(collection(db, 'celeb'), orderBy(order, direction), startAfter(nextCur), limit(limitCnt));
  } else {
    first = query(collection(db, 'celeb'), orderBy(order, direction), limit(limitCnt));
  }

  const documentSnapshots = await getDocs(first);
  const celebs: DocumentData[] = [];
  documentSnapshots.forEach(doc => {
    celebs.push(doc.data());
  });
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return {
    totalCount: 0,
    celebs,
    pageInfo: {
      startCursor: lastVisible && lastVisible.id,
      hasNextPage: !!lastVisible && documentSnapshots.docs.length >= limitCnt,
    },
  };
};

export const firestoreCelebById = async (id: string) => {
  const document = await getDoc(doc(collection(db, 'celeb'), id));
  return document.data();
};

export const filterContentType = (type: string) => {
  return where('type', '==', type);
};

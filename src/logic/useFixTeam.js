import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from 'logic/fb';

export default function useFixTeam() {
  const [teamState, setTeamState] = useState('');
  const [collectionId, setCollectionId] = useState('');

  useEffect(() => {
    return onSnapshot(collection(db, 'repair-team'), (querySnapshot) => {
      const firstDoc = querySnapshot.docs[0];
      setTeamState(firstDoc.data().state);
      setCollectionId(firstDoc.id);
    });
  }, []);
  return [teamState, collectionId];
}

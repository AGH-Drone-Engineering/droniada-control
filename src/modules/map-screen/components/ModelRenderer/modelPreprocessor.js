import { useEffect, useState } from 'react';
import { storage } from 'modules/data/fb';
import { ref, getDownloadURL } from 'firebase/storage';

export default function useModelLink() {
  const [link, setLink] = useState('');

  useEffect(() => {
    getDownloadURL(ref(storage, 'images/stars.jpg'))
      .then((url) => { setLink(url); });
  });

  return (
    link
  );
}

import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const useAddressData = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const snapshot = await firestore.collection('address').get();
      const peopleData = snapshot.docs.map(doc => ({
        key: doc.id,
        ...doc.data()
      }));
      setPeople(peopleData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { people, setPeople, loading, refetch: fetchData };
};

export default useAddressData;
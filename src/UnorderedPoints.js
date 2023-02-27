import React from 'react'
import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function UnorderedPoints() {

    const [points, setPoints] = useState([]);
    useEffect(() => {
        // Initialize Firebase app
        const db = getFirestore();

        // Listen for changes to 'points' collection and update state
        const unsubscribe = onSnapshot(collection(db, "map-points"), (querySnapshot) => {

            const data = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setPoints(data);
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, []);
    return (
        <>
            <div className='flex'>
            {points.map((point) => (
                <div className='flex-item'>
                <br />
                <br />
                    <img src={"data:image/jpeg;base64,/9j/" + point.img} alt='Capture from drone'></img>
                    <h3>{point.name}</h3>
                </div>
            ))}
            </div>
        </>
    )
}

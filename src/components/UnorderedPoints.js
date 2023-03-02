import useMapPoints from 'logic/useMapPoints';

export default function UnorderedPoints({ db }) {
  const points = useMapPoints(db);
  return (
        <>
            <div className='flex'>
            {points.map((point) => (
                <div className='flex-item' key={point}>
                <br />
                <br />
                    <img src={'data:image/jpeg;base64,/9j/' + point.img} alt='Capture from drone'></img>
                    <h3>{point.name}</h3>
                </div>
            ))}
            </div>
        </>
  );
}

import useMapPoints from 'logic/useMapPoints';

export default function ListPoints() {
  const points = useMapPoints('intruder-points');

  return <><h1>{points.map((x) => (
    `Timestamp: ${x.timestamp}, Point: ${x.name}`
  ))}</h1><br/><br/></>;
}

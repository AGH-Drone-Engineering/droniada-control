import useMapPoints from 'logic/useMapPoints';

export default function ListPoints() {
  const points = useMapPoints('intruder-points');

  return <><h1>{points.map((x) => (
    <div>`Timestamp: ${x.timestamp.toDate().toLocaleTimeString('pl-PL')}, Point: ${x.name}`</div>
  ))}</h1><br/><br/></>;
}

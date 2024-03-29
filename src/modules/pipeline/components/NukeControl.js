import React, { useEffect, useState } from 'react';
import { db } from 'logic/fb';
import { doc, updateDoc } from 'firebase/firestore';
import useFixTeam from 'logic/useFixTeam';
import ManualMapPoints from 'components/ManualMapPoints';
import useMapPoints from 'logic/useMapPoints';
import generatePdf from 'logic/generatePdf';
import HeaderMarker from 'components/headerMarker';
import useDronePath from 'logic/DronePath';
import { addPointToMap } from 'logic/FbPointLogic';

export default function NukeControl() {
  const [teamState, collectionId, time] = useFixTeam();
  const [pdfDb, setPdfDb] = useState('intruder-points');
  const [taskTime, setTaskTime] = useState(0);
  const [, dronePoints] = useDronePath();
  const points = useMapPoints(pdfDb);

  async function fixInfrastructure(x) {
    await updateDoc(doc(db, 'repair-team', collectionId),
      {
        state: 'yes'
      });
  }

  async function noFixInfrastructure(x) {
    await updateDoc(doc(db, 'repair-team', collectionId),
      {
        state: 'no'
      });
  }

  async function unsetInfrastructure(x) {
    await updateDoc(doc(db, 'repair-team', collectionId),
      {
        state: ''
      });
  }

  function toIsoString(date) {
    const pad = function(num) {
      return (num < 10 ? '0' : '') + num;
    };
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds());
  }

  function fire(type) {
    const time = toIsoString(new Date());
    addPointToMap('intruder-points', { img: 'aaaaaaaaaaaaaaaa', name: type, type, shooted: false }, { lat: 1, lng: 1 }, time);
  }

  async function setupTaskTime(x) {
    await updateDoc(doc(db, 'repair-team', collectionId),
      {
        time: taskTime
      });
  }

  useEffect(() => { setTaskTime(time); }, [time]);

  return (
    <div className='nuke-control'>
      <div>
        <h2>Raport PDF z misji:</h2>
        <hr/>
        <label htmlFor='databaseToPdfSelect'>Wybierz bazę danych z której generowany będzie raport PDF: <br/></label>
        <select id="databaseToPdfSelect" onChange={(e) => setPdfDb(e.target.value)} style={{ width: '300px' }}>
            <option value={'intruder-points'}>Intruz</option>
            <option value={'pipeline-points'}>Rurociąg</option>
            <option value={'tree-points'}>Drzewo życia</option>
        </select> <br/>
        <button className='fire-btn' onClick={(e) => fire('fire')} style={ { backgroundColor: 'red', color: 'white' } }>F</button>
        <button className='kask-btn' onClick={(e) => fire('kask')} style={ { backgroundColor: 'orange', color: 'white' } }>K</button>
        <button className='intruz-btn' onClick={(e) => fire('intruz')} style={ { backgroundColor: 'purple', color: 'white' } }>I</button>
        <button className='omdlenie-btn' onClick={(e) => fire('omdlenie')} style={ { backgroundColor: 'white', color: 'black' } }>Z</button>
        <br/>
        <button className='raport-btn' onClick={() => generatePdf(pdfDb, points, dronePoints)}>Pobierz raport w formacie PDF</button>
        <h2><HeaderMarker condition={time > 0}/> Czas wykonania misji:</h2>
        <hr/>
        <label htmlFor='taskTime'>Wprowadź czas wykonania misji w minutach: </label>
        <input type='number' id='taskTime' style={{ width: 50, textAlign: 'right' }} value={taskTime} onChange={(e) => setTaskTime(e.currentTarget.value)}></input>m<br/>
        <button className='raport-btn' onClick={setupTaskTime}>Ustaw czas misji</button>
        <br/><br/>
        <h2><HeaderMarker condition={teamState === 'yes' || teamState === 'no'}/> Rurociąg:</h2>
        <hr/>
        <p>Po zakończeniu misji należy zdecydować czy powinna wkroczyć brygada remontowa</p>
        <p> Twoja decyzja: </p>
        {(teamState !== 'yes' && teamState !== 'no')
          ? <>
            <button className='fix-infrastructure' onClick={fixInfrastructure}> Naprawić infrastrukture - Brygada <b>wchodzi</b></button><br />
            <button className='no-fix-infrastructure' onClick={noFixInfrastructure}> Wszystko jest sprawne -  Brygada <b>nie</b> wchodzi</button>
          </>
          : <>
            <p>Po zbadaniu infrastruktury podjęto decyzję że {teamState === 'yes' ? <>należy naprawić infrastrukturę</> : <>nie potrzeba niczego naprawiać</>}</p>
            <button className='unset-decision' onClick={unsetInfrastructure}> Usuń swoją decyzję</button><br />
          </>}

        <br /><br />
        <p>W tym miejscu możesz też dodać ręcznie punkty do bazy</p>
        <ManualMapPoints/>
      </div>
    </div >
  );
}

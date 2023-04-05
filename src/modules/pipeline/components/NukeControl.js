import React, { useState } from 'react';
import { db } from 'logic/fb';
import { doc, updateDoc } from 'firebase/firestore';
import useFixTeam from 'logic/useFixTeam';
import ManualMapPoints from 'components/ManualMapPoints';
import useMapPoints from 'logic/useMapPoints';
import generatePdf from 'logic/generatePdf';

export default function NukeControl() {
  const [teamState, collectionId] = useFixTeam();
  const [pdfDb, setPdfDb] = useState('intruder-points');
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
        <button className='raport-btn' onClick={() => generatePdf(pdfDb, points)}>Pobierz raport w formacie PDF</button>
        <h2> Rurociąg:</h2>
        <hr/>
        <p>Po zakończeniu misji należy zdecydować czy powinna wkroczyć brygada remontowa</p>
        <p> Twoja decyzja: </p>
        {(teamState !== 'yes' && teamState !== 'no')
          ? <>
            <button className='fix-infrastructure' onClick={fixInfrastructure}> Naprawić infrastrukture - Brygada <b>wchodzi</b></button><br />
            <button className='no-fix-infrastructure' onClick={noFixInfrastructure}> Wszystko jest sprawne -  Brygada <b>nie</b> wchodzi</button>
          </>
          : <>
            <p>Po zbadaniu infrastruktury podjęto decyzję że {teamState === 'yes' ? <>należy naprwić infrastrukturę</> : <>nie potrzeba niczego naprawiać</>}</p>
            <button className='unset-decision' onClick={unsetInfrastructure}> Usuń swoją decyzję</button><br />
          </>}

        <br /><br />
        <p>W tym miejscu możesz też dodać ręcznie punkty do bazy</p>
        <ManualMapPoints/>
      </div>
    </div >
  );
}

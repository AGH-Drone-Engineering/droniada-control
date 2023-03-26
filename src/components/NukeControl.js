import React from 'react';
import { db } from 'logic/fb';
import { doc, updateDoc } from 'firebase/firestore';
import useFixTeam from 'logic/useFixTeam';

export default function NukeControl() {
  const [teamState, collectionId] = useFixTeam();

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
        <h2> Rurociąg:</h2>
        <hr></hr>
        <p>Po zakończeniu misji należy zdecydować czy powinna wkroczyć brygada remontowa</p>
        <p> Twoja decyzja: </p>
        {(teamState !== 'yes' && teamState !== 'no')
          ? <>
            <button className='fix-infrastructure' onClick={fixInfrastructure}> Naprawić infrastrukture - Brygada <b>wchodzi</b></button><br />
            <button className='no-fix-infrastructure' onClick={noFixInfrastructure}> Wszystko jest sprawne -  Brygada <b>nie</b> wchodzi</button>
          </>
          : <>
            <p>Po zbadaniu infrastruktury podjęto decyzję że {teamState === 'yes' ? <>należy naprwić infrastrukturę</> : <>nie potrzeba niczego naprwiać</>}</p>
            <button className='unset-decision' onClick={unsetInfrastructure}> Usuń swoją decyzję</button><br />
          </>}

        <br /><br />
        <p>W tym miejscu możesz też dodać ręcznie punkty do bazy</p>
      </div>
    </div >
  );
}

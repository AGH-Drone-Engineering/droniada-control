import React, { useEffect, useState } from 'react';
import useFixTeam from 'logic/useFixTeam';

export default function MissionTimePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [,, missionTime] = useFixTeam();

  const handleOkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(missionTime > 0);
  }, [missionTime]);

  return (
    <div>
    {isOpen && (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={handleOkClick}>
            &times;
          </span>
          <p>Misja zajęła nam {missionTime} minut(y)</p>
          <button className='xx' onClick={handleOkClick}>OK</button>
        </div>
      </div>
    )}
  </div>
  );
}

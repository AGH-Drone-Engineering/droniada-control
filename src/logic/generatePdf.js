import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { mapType, getType } from 'logic/TypeLogic';

const mapping = { 'intruder-points': 'intruz', 'pipeline-points': 'rurociąg', 'tree-points': 'drzewo życia' };

function fbTimeToTime(point) {
  if (!('timestamp' in point)) {
    return '';
  }
  const time = point.timestamp.toDate();
  const options = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const timeString = time.toLocaleTimeString('en-US', options);
  return ', znaleziony o ' + timeString;
}

export default function generatePdf(dbName, data) {
  const docDefinition = {
    content: [
      {
        text: 'AGH Drone Engineering',
        style: 'header'
      },
      {
        text: 'Raport z misji',
        style: 'header2'
      },
      {
        text: 'Zostały znalezione następujące obiekty:',
        style: 'header3'
      },
      {
        ul: [
          ...data.map((item) => ({
            text: `${item.name}: ${mapType(getType(item))} ${fbTimeToTime(item)}`
          }))
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 25,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center'
      },
      header2: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center'
      },
      header3: {
        fontSize: 17,
        bold: false,
        margin: [0, 0, 0, 5],
        alignment: 'center'
      }
    }
  };
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.createPdf(docDefinition).download('Raport z misji ' + mapping[dbName]);
};

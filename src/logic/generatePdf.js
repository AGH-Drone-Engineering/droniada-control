import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { mapType, getType } from 'logic/TypeLogic';

const mapping = { 'intruder-points': 'intruz', 'pipeline-points': 'rurociąg', 'tree-points': 'drzewo życia' };

function fbTimeToTime(point) {
  if (!('timestamp' in point)) {
    return '[brak znacznika czasu]';
  }
  const time = point.timestamp.toDate();
  const options = { weekday: 'long', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', locale: 'pl-PL' };
  const timeString = time.toLocaleString('pl-PL', options);
  return '' + timeString;
}

export default function generatePdf(dbName, data) {
  const tableBody = data.map((item) => {
    const name = item.name;
    const type = mapType(getType(item));
    const time = fbTimeToTime(item);
    const link = {
      text: 'Link',
      link: `https://www.google.pl/maps/place/${item.location._lat}N+${item.location._long}E/@${item.location._lat},${item.location._long},310m/data=!3m1!1e3?hl=pl`,
      target: '_blank',
      style: 'link'
    };
    return [name, type, time, link];
  });

  const docDefinition = {
    content: [
      {
        text: 'AGH Drone Engineering',
        style: 'header'
      },
      {
        text: `Raport z misji ${mapping[dbName]}`,
        style: 'header2'
      },
      {
        text: 'Zostały znalezione następujące obiekty:',
        style: 'header3'
      },
      {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            [
              { text: 'Nazwa', bold: true, alignment: 'center' },
              { text: 'Typ', bold: true, alignment: 'center' },
              { text: 'Znacznik czasu', bold: true, alignment: 'center' },
              { text: 'Punkt na mapie', bold: true, alignment: 'center' }
            ],
            ...tableBody
          ]

        },
        dontBreakRows: true,
        fillColor: '#ffffff',
        layout: {
          hLineWidth: function(i, node) {
            return (i === 0 || i === node.table.body.length) ? 0 : 1;
          },
          vLineWidth: function(i, node) {
            return 0;
          },
          hLineColor: function(i, node) {
            return '#aaaaaa';
          },
          paddingLeft: function(i, node) {
            return 5;
          },
          paddingRight: function(i, node) {
            return 0;
          },
          paddingTop: function(i, node) {
            return 5;
          },
          paddingBottom: function(i, node) {
            return 5;
          }
        }

      },
      {
        text: `\nIlość: ${data.length}`
      },
      {
        text: 'Zdjęcia skanów',
        style: 'header2'
      },
      ...data.map((item) => ([{
        image: `data:image/jpeg;base64,/9j/${item.img}`,
        width: 150,
        height: 150,
        style: 'detection_image'
      }, { text: item.name }])),
      {
        text: `\nIlość: ${data.length}`
      }
    ],
    styles: {
      formated: {
        preserveLeadingSpaces: true
      },
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
      },
      center: {
        alignment: 'center'
      },
      detection_image: {
        margin: [0, 25, 0, 2],
        width: 150,
        height: 150
      },
      link: {
        fontSize: 12,
        decoration: 'underline',
        color: 'blue',
        alignment: 'center'
      }
    }
  };
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.createPdf(docDefinition).download('Raport z misji ' + mapping[dbName]);
};

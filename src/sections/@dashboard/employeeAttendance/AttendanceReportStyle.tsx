import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

// Font.register({
//   family: 'ScheherazadeNew',
//   format:'truetype',
//   fonts: [{ src: '/fonts/ScheherazadeNew-Regular.ttf' }],
// });

// Font.register({
//   family: 'NotoNaskhArabic',
//   format:'truetype',
//   fonts: [{ src: '/fonts/NotoNaskhArabic-VariableFont_wght.ttf' }],
// });

Font.register({
  family: 'Lateef',
  format:'truetype',
  src: '/fonts/Lateef-Regular.ttf' ,
});

Font.register({
  family: 'Lalezar',
  format:'truetype',
  src: '/fonts/lalezar-regular.ttf' ,
});

Font.register({
  family: 'NotoSansArabic',
  format:'truetype',
  src: '/fonts/NotoSansArabic-VariableFont_wdth,wght.ttf' ,
});

Font.register({
  family: 'MarkaziText',
  format:'truetype',
  fonts: [{ src: '/fonts/MarkaziText-VariableFont_wght.ttf' }],
});

const styles = StyleSheet.create({
  col1:{ width:'10%' },
  col2:{ width:'20%' },
  col4: { width: '40%' },
  col8: { width: '75%' },
  col5: { width: '50%' },
  col6: { width: '60%' },
  col3: { width: '30%' },
  col9: { width: '70%' },
  col12: { width: '100%' },
  mb8: { marginBottom: 5 },
  mb40: { marginBottom: 20 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  h3: { fontSize: 14, fontWeight: 700 },
  h4: { fontSize: 12, fontWeight: 700 },
  body1: { fontSize: 11,fontWeight:750 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  alignCenter: { textAlign: 'center' },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 10,
    textAlign:'center',
    lineHeight: 1.6,
    fontWeight:'bold',
    fontFamily: 'Lateef',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
  },
  dir:{

  },
  fontS:{
    fontSize:10
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8',
  },
 marginAuto:{
  margin:'auto',
 },
 border:{
  border:'1px solid #666'
 },
 borderBottom:{
  borderBottom:'1px solid #666'
 },
 padding:{
    padding:0,
 },
// fontS:{
// fontSize:
// },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between',textAlign:'center' },
  table: { display: 'flex', width: 'auto',justifyContent:'flex-end' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '3px 0',
    flexDirection: 'row',
    textAlign:'right',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  direction:{
    flexDirection:'column',
    justifyContent:'flex-end',
    textAlign:'right'

  },
  TextAlignLeft:{
    textAlign:'left'
  },
  noBorder: { paddingTop: 4, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '1%' },
  tableCell_2: { width: '30%', paddingRight: 16 },
  tableCell_3: { width: '15%' },
});

export default styles;

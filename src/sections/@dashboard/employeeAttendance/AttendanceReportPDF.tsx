import { Page, View, Text, Image, Document } from '@react-pdf/renderer';

import styles from './AttendanceReportStyle';
import { AttendanceReportResult } from 'src/@types/attendanceReport';

// ----------------------------------------------------------------------

type Props = {
  AttendanceReportResult: AttendanceReportResult[];
};

export default function AttendanceReportPDF({ AttendanceReportResult }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40, styles.borderBottom, styles.alignCenter]}>
          <View style={styles.col3}>
            <Image source="/src/ministry1.png" style={{ height: 50, width: 60, marginLeft: 40 }} />
            <Text>امارت اسلامی افغانستان</Text>
            <Text>وزارت آب و انرژی</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.alignCenter, styles.h3]}>د مالی و اداری عمومی ریاست</Text>
            <Text style={[styles.alignCenter, styles.h3]}>د معلوماتی او تکنالوژی ریاست</Text>
            <Text style={[styles.alignCenter, styles.h3]}>د معلوماتی تکنالوژی آمریت</Text>
          </View>

          <View style={[styles.col3]}>
            <Image source="/src/emarat1.png" style={{ height: 50, width: 50, marginLeft: 40 }} />
            <Text style={styles.alignCenter}>د افغانستان اسلامی امارت</Text>
            <Text style={styles.alignCenter}>د اوبو او انرژی وزارت </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Days of Weeks</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qamary Date</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Shamsi Date</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>In TIme</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Out Time</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Attendance Summary</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {AttendanceReportResult.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.DayValue}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.DateValue}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{item.DateShami}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{item.Intime}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{item.Outtime}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{item.AttResult}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

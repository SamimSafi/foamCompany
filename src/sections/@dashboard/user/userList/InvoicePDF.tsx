import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import styles from './InvoiceStyle';
import { responseCode } from 'src/@types/createUser';

// ----------------------------------------------------------------------

type Props = {
  invoice: responseCode;
};

export default function InvoicePDF({ invoice }: Props) {
  const { data, code, message } = invoice;

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
            <Text style={[styles.alignCenter, styles.h3]}>فورم معلومات کاربر </Text>
          </View>
          {/* { alignItems: 'flex-end', flexDirection: 'column', */}
          <View style={[styles.col3]}>
            <Image source="/src/emarat1.png" style={{ height: 50, width: 50, marginLeft: 40 }} />
            <Text style={styles.alignCenter}>د افغانستان اسلامی امارت</Text>
            <Text style={styles.alignCenter}>د اوبو او انرژی وزارت </Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.h3]}>User Credential Details</Text>
        <View style={[styles.gridContainer, styles.mb8, styles.alignLeft, styles.padding]}>
          <View style={[styles.col4, styles.borderBottom]}>
            <Text style={styles.body1}>User Name</Text>
          </View>
          <View style={[styles.col4, styles.borderBottom]}>
            <Text style={styles.body1}>Email</Text>
          </View>
          <View style={[styles.col4, styles.borderBottom]}>
            <Text style={styles.body1}>Password</Text>
          </View>
        </View>
        <View style={[styles.gridContainer, styles.alignLeft, styles.padding]}>
          <View style={[styles.col4]}>
            <Text style={styles.body1}>{data.userName}</Text>
          </View>
          <View style={[styles.col4]}>
            <Text style={styles.body1}>{data.email}</Text>
          </View>
          <View style={[styles.col4]}>
            <Text style={styles.body1}>{data.password}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
        <View style={[styles.col8, styles.TextAlignLeft]}>
            <Text>Address: Darul Aman road, Senatoriam, Kabul Afghanistan</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
          <Text style={styles.subtitle2}>پته : د دارالمان سرک ، سناتوریم کابل افغانستان</Text>
            <Text>Website: www.mew.gov.af</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

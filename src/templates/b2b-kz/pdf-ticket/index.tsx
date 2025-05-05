import { join } from 'node:path';
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Font, Document, Page, StyleSheet } from '@react-pdf/renderer';
import { FONTS_DIR } from '~/src/shared/config/index.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { theme } from '~/src/shared/config/b2b/theme.ts';
import type { PdfTicketRequestSchemaType } from '~/src/shared/lib/schema/index.ts';
import type { AdapterWarning } from '~/src/shared/lib/adapter-context.ts';
import { GeneralInfo } from './ui/GeneralInfo.tsx';
import { Header } from './ui/Header.tsx';
import { Footer } from './ui/Footer.tsx';
import { Passenger } from './ui/Passenger.tsx';
import { Flight } from './ui/Flight.tsx';
import { PdfTicketContext } from './context.tsx';
import { Pricing } from './ui/Pricing.tsx';
import { LegalInfo } from './ui/LegalInfo.tsx';
import { AncillaryBaggage } from './ui/AncillaryBaggage.tsx';
import { contextAdapterLib } from './lib/context-adapter.ts';

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: join(FONTS_DIR, 'Inter-400.woff'),
      fontWeight: theme.fontWeight.normal,
    },
    {
      src: join(FONTS_DIR, 'Inter-600.woff'),
      fontWeight: theme.fontWeight.semibold,
    },
    {
      src: join(FONTS_DIR, 'Inter-700.woff'),
      fontWeight: theme.fontWeight.bold,
    },
  ],
});

/**
 * @description Disable hyphenation
 * @see https://react-pdf.org/fonts#disabling-hyphenation
 */
Font.registerHyphenationCallback(word => [word]);

const styles = StyleSheet.create({
  doc: {
    fontFamily: 'Inter',
    color: theme.colors.black,
  },
  page: {
    paddingHorizontal: CSS.px(32),
    paddingTop: CSS.px(32),
    paddingBottom: CSS.px(80),
  },
});

type Props = {
  rawData: PdfTicketRequestSchemaType;
  i18n: i18next.i18n;
  onWarning(warning: AdapterWarning): void;
};

const DEFAULT_I18N_NS = 'b2b-pdf-ticket';

export const PdfTicket: React.FC<Props> = ({ rawData, i18n, onWarning }) => {
  const t = i18n.getFixedT(null, DEFAULT_I18N_NS);

  const [context, warnings] = contextAdapterLib.convertRawRequestData(rawData, {
    lng: i18n.language,
    t,
  });

  warnings.forEach(onWarning);

  return (
    <I18nextProvider i18n={i18n} defaultNS={DEFAULT_I18N_NS}>
      <PdfTicketContext.Provider value={context}>
        <Document style={styles.doc}>
          <Page style={styles.page}>
            <Header style={{ marginBottom: CSS.px(16) }} />
            {context.dataPerPax.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <Passenger shouldBreakPage={index > 0} pax={data.pax} />
                  {data.flights.map((flight, index) => (
                    <Flight
                      key={index}
                      flight={flight}
                      index={index}
                      isInfant={data.pax.type === 'INF'}
                      style={{ marginTop: CSS.px(24) }}
                    />
                  ))}
                </React.Fragment>
              );
            })}
            <AncillaryBaggage style={{ marginTop: CSS.px(16) }} />
            <Pricing style={{ marginTop: CSS.px(16) }} />
            <GeneralInfo style={{ marginTop: CSS.px(20) }} />
            <LegalInfo style={{ marginTop: CSS.px(16) }} />
            <Footer />
          </Page>
        </Document>
      </PdfTicketContext.Provider>
    </I18nextProvider>
  );
};

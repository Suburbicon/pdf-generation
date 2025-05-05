import { join } from 'node:path';
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import {
  Font,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Canvas,
} from '@react-pdf/renderer';
import { FONTS_DIR } from '~/src/shared/config/index.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { theme } from '~/src/shared/config/b2b/theme.ts';
import type { PdfBusinessTripWritRequestSchemaType } from '~/src/shared/lib/schema/index.ts';
import type { AdapterWarning } from '~/src/shared/lib/adapter-context.ts';
import { PdfBusinessTripWritContext } from './context.tsx';
import { contextAdapterLib } from './lib/context-adapter.ts';
import { Header } from './ui/Header.tsx';

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
  rawData: PdfBusinessTripWritRequestSchemaType;
  i18n: i18next.i18n;
  onWarning(warning: AdapterWarning): void;
};

const DEFAULT_I18N_NS = 'business-trip-writ-pdf';

export const PdfBusinessTripWrit: React.FC<Props> = ({
  rawData,
  i18n,
  onWarning,
}) => {
  const t = i18n.getFixedT(null, DEFAULT_I18N_NS);

  const [context, warnings] = contextAdapterLib.convertRawRequestData(rawData, {
    lng: i18n.language,
    t,
  });

  warnings.forEach(onWarning);

  return (
    <I18nextProvider i18n={i18n} defaultNS={DEFAULT_I18N_NS}>
      <PdfBusinessTripWritContext.Provider value={context}>
        <Document style={styles.doc}>
          <Page style={styles.page}>
            <Header style={{ marginBottom: CSS.px(16) }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: CSS.px(20) }}>
                {t('organization-name')}:
              </Text>
              <Text style={{ marginLeft: CSS.px(12), fontSize: CSS.px(20) }}>
                "{context.organization_name}"
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: CSS.px(30),
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{t('title')}</Text>
              <Text style={{ fontWeight: 'bold' }}>{t('sub-title')}</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginTop: CSS.px(20),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                  {t('go-to-business-trip')}:
                </Text>
                <Text style={{ marginLeft: CSS.px(12) }}>
                  {context.employee_full_name}
                </Text>
              </View>
              {context.employee_number && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: CSS.px(12),
                  }}
                >
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('employee_number')}:
                  </Text>
                  <Text style={{ marginLeft: CSS.px(12) }}>
                    {context.employee_number}
                  </Text>
                </View>
              )}
              {context.department && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: CSS.px(12),
                  }}
                >
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('department')}:
                  </Text>
                  <Text style={{ marginLeft: CSS.px(12) }}>
                    {context.department}
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: CSS.px(12),
                }}
              >
                <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                  {t('position')}:
                </Text>
                <Text style={{ marginLeft: CSS.px(12) }}>
                  {context.position}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: CSS.px(12),
                }}
              >
                <View style={{ flexDirection: 'column', width: '250px' }}>
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('destination')}
                  </Text>
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('sub-destination')}:
                  </Text>
                </View>
                <Text style={{ marginLeft: CSS.px(12) }}>
                  {context.destination}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: CSS.px(50),
                }}
              >
                {context.duration_days > 1 ? (
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('duration-days', { days: context.duration_days })}
                  </Text>
                ) : (
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('duration-day', { day: context.duration_days })}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: CSS.px(12),
                  }}
                >
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('start-date')}:
                  </Text>
                  <Text style={{ marginLeft: CSS.px(12) }}>
                    {context.start_date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: CSS.px(12),
                    marginLeft: CSS.px(12),
                  }}
                >
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('end-date')}:
                  </Text>
                  <Text style={{ marginLeft: CSS.px(12) }}>
                    {context.end_date}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  width: '90%',
                  marginTop: CSS.px(12),
                }}
              >
                <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                  {t('purpose')}:
                </Text>
                <Text style={{ marginLeft: CSS.px(20) }}>
                  {context.purpose}
                </Text>
              </View>
              {context.funding_source && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: CSS.px(12),
                  }}
                >
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('funding-source')}:
                  </Text>
                  <Text style={{ marginLeft: CSS.px(12) }}>
                    {context.funding_source}
                  </Text>
                </View>
              )}
              {context.per_diem && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: CSS.px(12),
                  }}
                >
                  <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                    {t('diem')}:
                  </Text>
                  <Text style={{ marginLeft: CSS.px(12) }}>
                    {context.per_diem}
                  </Text>
                </View>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {context.manager_position && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: CSS.px(40),
                    }}
                  >
                    <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                      {t('manager-position')}:
                    </Text>
                    <Text style={{ marginLeft: CSS.px(12) }}>
                      {context.manager_position}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: CSS.px(80),
                        paddingTop: CSS.px(20),
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: CSS.px(150),
                          height: CSS.px(2),
                          backgroundColor: 'black',
                        }}
                      ></View>
                      <Text
                        style={{ marginLeft: CSS.px(5), fontSize: CSS.px(14) }}
                      >
                        {t('signature')}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: CSS.px(40),
                }}
              >
                <Text style={{ fontSize: CSS.px(20), fontWeight: 'bold' }}>
                  {t('familiarization-order')}
                </Text>
                <Text style={{ marginLeft: CSS.px(12) }}></Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: CSS.px(20),
                    paddingTop: CSS.px(20),
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: CSS.px(100),
                      height: CSS.px(2),
                      backgroundColor: 'black',
                    }}
                  ></View>
                  <Text style={{ marginLeft: CSS.px(5), fontSize: CSS.px(14) }}>
                    {t('signature')}
                  </Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PdfBusinessTripWritContext.Provider>
    </I18nextProvider>
  );
};

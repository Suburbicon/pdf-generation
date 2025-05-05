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
  Image,
} from '@react-pdf/renderer';
import { FONTS_DIR } from '~/src/shared/config/index.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { theme } from '~/src/shared/config/b2b/theme.ts';
import type { PdfHotelTicketRequestTypeSchemaType } from '~/src/shared/lib/schema/index.ts';
import type { AdapterWarning } from '~/src/shared/lib/adapter-context.ts';
import { PdfHotelTicketContext } from './context.tsx';
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
    fontSize: CSS.px(12),
    paddingHorizontal: CSS.px(32),
    paddingTop: CSS.px(32),
    paddingBottom: CSS.px(20),
  },
});

type Props = {
  rawData: PdfHotelTicketRequestTypeSchemaType;
  i18n: i18next.i18n;
  onWarning(warning: AdapterWarning): void;
};

const DEFAULT_I18N_NS = 'hotel-ticket-pdf';

export const PdfHotelTicket: React.FC<Props> = ({
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
      <PdfHotelTicketContext.Provider value={context}>
        <Document style={styles.doc}>
          <Page style={styles.page}>
            <Header style={{ marginBottom: CSS.px(16) }} />
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: CSS.px(16),
                paddingHorizontal: CSS.px(20),
                border: '1px solid #F1F2F7',
                borderRadius: CSS.px(24),
              }}
            >
              <View style={{ width: '25%', flexDirection: 'column' }}>
                <Text style={{ marginBottom: CSS.px(8), color: '#696C72' }}>
                  {t('order-number')}
                </Text>
                <Text style={{ fontSize: CSS.px(14) }}>
                  {context.order.number}
                </Text>
              </View>
              {context.booking.hotel.country && (
                <View style={{ width: '25%', flexDirection: 'column' }}>
                  <Text style={{ marginBottom: CSS.px(8), color: '#696C72' }}>
                    {t('country')}
                  </Text>
                  <Text style={{ fontSize: CSS.px(14) }}>
                    {context.booking.hotel.country}
                  </Text>
                </View>
              )}
              <View style={{ width: '25%', flexDirection: 'column' }}>
                <Text style={{ marginBottom: CSS.px(8), color: '#696C72' }}>
                  {t('guest-amount')}
                </Text>
                <Text style={{ fontSize: CSS.px(14) }}>
                  {context.guests.length}
                </Text>
              </View>
              <View style={{ width: '25%', flexDirection: 'column' }}>
                <Text style={{ marginBottom: CSS.px(8), color: '#696C72' }}>
                  {t('room-amount')}
                </Text>
                <Text style={{ fontSize: CSS.px(14) }}>
                  {context.booking.rooms.length}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: CSS.px(16),
                paddingHorizontal: CSS.px(16),
                marginTop: CSS.px(16),
                border: '2px solid #55BB06',
                borderRadius: CSS.px(24),
              }}
            >
              <View style={{ width: CSS.px(225), marginRight: CSS.px(20) }}>
                <Image
                  src={context.booking.rooms[0].images[0]}
                  style={{
                    width: CSS.px(225),
                    height: CSS.px(148),
                    marginRight: CSS.px(16),
                    borderRadius: CSS.px(24),
                  }}
                />
              </View>
              <View style={{ width: CSS.px(275), flexDirection: 'column' }}>
                <Text
                  style={{
                    marginBottom: CSS.px(12),
                    fontSize: CSS.px(16),
                    fontWeight: 'bold',
                  }}
                >
                  {context.booking.rooms[0].name}
                </Text>
                <Text style={{ marginBottom: CSS.px(8), fontSize: CSS.px(14) }}>
                  {context.booking.hotel.address}
                </Text>
                {context.booking.hotel.phone && (
                  <Text style={{ fontSize: CSS.px(14) }}>
                    {context.booking.hotel.phone}
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: CSS.px(1),
                  height: CSS.px(142),
                  marginHorizontal: CSS.px(16),
                  backgroundColor: '#F4F4F4',
                }}
              ></View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: CSS.px(156),
                    marginBottom: CSS.px(18),
                  }}
                >
                  <View style={{ width: CSS.px(77), marginBottom: CSS.px(12) }}>
                    <Text style={{ fontWeight: 'bold', fontSize: CSS.px(16) }}>
                      {t('arr')}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: CSS.px(14) }}>
                      {context.booking.hotel.checkin_date}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', width: CSS.px(160) }}>
                  <View style={{ width: CSS.px(77), marginBottom: CSS.px(12) }}>
                    <Text style={{ fontWeight: 'bold', fontSize: CSS.px(16) }}>
                      {t('dep')}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: CSS.px(14) }}>
                      {context.booking.hotel.checkout_date}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: CSS.px(24) }}>
              <View style={{ flexDirection: 'column', marginTop: CSS.px(25) }}>
                <Text
                  style={{
                    fontSize: CSS.px(10),
                    color: '#696C72',
                    marginBottom: CSS.px(10),
                  }}
                >
                  {t('guests')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text>
                    {context.guests
                      .map(guest => guest.full_name.toUpperCase())
                      .join(', ')}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', marginTop: CSS.px(25) }}>
                <Text
                  style={{
                    fontSize: CSS.px(10),
                    color: '#696C72',
                    marginBottom: CSS.px(10),
                  }}
                >
                  {t('hotel-conditions')}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {context.booking.hotel.amenities &&
                    context.booking.hotel.amenities.map(amen => (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '50%',
                          marginBottom: CSS.px(20),
                        }}
                      >
                        <Text>{amen.value}</Text>
                      </View>
                    ))}
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '50%',
                    marginRight: CSS.px(20),
                  }}
                >
                  <Text
                    style={{
                      fontSize: CSS.px(10),
                      color: '#696C72',
                      marginBottom: CSS.px(10),
                    }}
                  >
                    {t('important-info')}
                  </Text>
                  <Text
                    style={{ fontSize: CSS.px(10), marginBottom: CSS.px(12) }}
                  >
                    Отели оставляют за собой право взимать дополнительные сборы,
                    которые подлежат оплате гостем напрямую в отеле . В том
                    числе, но не исключительно: оплату городского налога и/или
                    регистрационный сбор за пребывание иностранных граждан,
                    resort/facility fee.
                  </Text>
                  <Text
                    style={{ fontSize: CSS.px(10), marginBottom: CSS.px(12) }}
                  >
                    Отели могут попросить гостя предоставить кредитную карту или
                    наличный депозит в качестве гарантии оплаты дополнительных
                    слуг, таких как: мини-бар, платное телевидение и др.
                  </Text>
                  <Text style={{ fontSize: CSS.px(10) }}>
                    Агентство не несет ответственность за качество
                    предоставляемых гостиницей услуг. Претензии по объему и
                    качеству услуг клиент может предъявить непосредственно
                    администрации гостиницы. В случае возникновения проблем в
                    отеле при заселении или выезде, просим обращаться за
                    поддержкой к менеджерам агентства.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '50%',
                    marginRight: CSS.px(20),
                  }}
                >
                  <Text
                    style={{
                      fontSize: CSS.px(10),
                      color: '#696C72',
                      marginBottom: CSS.px(10),
                    }}
                  >
                    {t('cancel-conditions')}
                  </Text>
                  <Text
                    style={{ fontSize: CSS.px(10), marginBottom: CSS.px(12) }}
                  >
                    Изменение заказчиком Бронирования считается отменой
                    Бронирования и созданием нового Бронирования . Мы можем
                    попробовать согласовать корректировку заказа с поставщиком,
                    однако гарантировать положительный ответ не можем.
                  </Text>
                  <Text
                    style={{ fontSize: CSS.px(10), marginBottom: CSS.px(12) }}
                  >
                    При аннуляции заказа или неявке гостя в отель применяются
                    штрафные санкции в соответствии с условиями договора и
                    тарифа.
                  </Text>
                  <Text style={{ fontSize: CSS.px(10) }}>
                    Пожалуйста, предупредите заранее, если вы планируете
                    заселиться в отель после 18:00. В случае неявки гостя отель
                    вправе отменить бронирование, в также применить штрафные
                    санкции за незаезд.
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: CSS.px(24),
                backgroundColor: '#F1F2F7',
                borderRadius: CSS.px(24),
                marginTop: CSS.px(260),
              }}
            >
              <View style={{ width: '40%', marginRight: CSS.px(28) }}>
                <Text>+7 (727) 339-07-70, +7 (747) 339-07-70</Text>
              </View>
              <View style={{ width: '20%', marginRight: CSS.px(28) }}>
                <Text>corp@aviata.business</Text>
              </View>
              <View style={{ width: '31%' }}>
                <Text>Чат в WhatsApp +7 (747) 339-07-70</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PdfHotelTicketContext.Provider>
    </I18nextProvider>
  );
};

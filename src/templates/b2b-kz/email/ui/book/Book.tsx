import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Section,
  Row,
  Column,
} from '@react-email/components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { BookOrderSchemaType } from '~/src/shared/lib/schema/index.ts';
import { AviataB2BLogo } from '~/src/shared/ui/aviata-b2b-logo/index.tsx';
import { main, container, titleStyle, button, paragraph } from './styles.ts';

type Props = {
  order: BookOrderSchemaType;
};

export const Book: React.FC<Props> = ({ order }) => {
  const { t } = useTranslation();

  return (
    <Html>
      <Head />
      <Preview>
        На сайте aviata.business Вы cможете найти, забронировать и купить
        авиабилеты в Казахстане онлайн на рейсы практически любой авиакомпании в
        мире. Мы поможем найти дешевый билет на самолет на любое направление
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <AviataB2BLogo width={198} />
          <Text style={titleStyle}>
            {t('hello')}, {order.order.email}
          </Text>
          <Text style={paragraph}>{t('successfull-book')}</Text>
          <Section>
            <Row align={'left'}>
              <Column style={{ width: '35%', textAlign: 'left' }}>
                <Text style={paragraph}>{t('order-number')}</Text>
              </Column>
              <Column style={{ width: '70%', textAlign: 'left' }}>
                <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {order.order.number}
                </Text>
              </Column>
            </Row>
            <Row align={'left'}>
              <Column style={{ width: '35%', textAlign: 'left' }}>
                <Text style={paragraph}>{t('amount-to-be-paid')}</Text>
              </Column>
              <Column style={{ width: '70%', textAlign: 'left' }}>
                <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {order.order.total} ₸
                </Text>
              </Column>
            </Row>
            <Row align={'left'}>
              <Column style={{ width: '35%', textAlign: 'left' }}>
                <Text style={paragraph}>{t('pay-before')}</Text>
              </Column>
              <Column style={{ width: '70%', textAlign: 'left' }}>
                <Text
                  style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}
                >
                  {order.order.expires_at}
                </Text>
              </Column>
            </Row>
            <Row align={'left'}>
              <Column style={{ width: '35%', textAlign: 'left' }}></Column>
              <Column style={{ width: '70%', textAlign: 'left' }}>
                <Text style={{ margin: '0' }}>
                  {t('avia-company-day-paid')} {order.order.phone}
                </Text>
              </Column>
            </Row>
          </Section>
          <Button
            href={`https://aviata.business/ru/payment/${order.order.id}`}
            style={button}
          >
            <Text style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>
              {t('pay')} {order.order.total} ₸
            </Text>
          </Button>
          <Text
            style={{
              margin: '16px 0 2px 0',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            {t('passengers')}:
          </Text>
          {order.bookings[0].passengers.map(passenger => (
            <Text style={{ margin: '0', fontSize: '18px' }}>
              {passenger.full_name} — {passenger.document.number}
            </Text>
          ))}
          {order.bookings
            .flatMap(booking => booking.flights)
            .flatMap(flight => flight.segments)
            .map((segment, id) => (
              <Section>
                <Text
                  style={{
                    margin: '16px 0 0 0',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  {t('flight')} {id + 1}
                </Text>
                <Row align={'left'}>
                  <Column style={{ width: '25%', textAlign: 'left' }}>
                    <Text style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
                      {t('departure')}
                    </Text>
                  </Column>
                  <Column style={{ width: '70%', textAlign: 'left' }}>
                    <Text
                      style={{
                        margin: '10px 0 0 0',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    >
                      {segment.dep.city_name}: {segment.dep.at.formatted.time}{' '}
                      {segment.dep.at.formatted.date}
                      <br />
                      <Text
                        style={{
                          margin: '0 0 0 0',
                          fontSize: '14px',
                          color: '#A4A2B7',
                        }}
                      >
                        {t('airport')}: {segment.dep.airport_name}
                      </Text>
                    </Text>
                  </Column>
                </Row>
                <Row align={'left'}>
                  <Column style={{ width: '25%', textAlign: 'left' }}>
                    <Text style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
                      {t('arrive')}
                    </Text>
                  </Column>
                  <Column style={{ width: '70%', textAlign: 'left' }}>
                    <Text
                      style={{
                        margin: '10px 0 0 0',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    >
                      {segment.arr.city_name}: {segment.arr.at.formatted.time}{' '}
                      {segment.arr.at.formatted.date}
                      <br />
                      <Text
                        style={{
                          margin: '0 0 0 0',
                          fontSize: '14px',
                          color: '#A4A2B7',
                        }}
                      >
                        {t('airport')}: {segment.arr.airport_name}
                      </Text>
                    </Text>
                  </Column>
                </Row>
              </Section>
            ))}
          <Text>{t('recomendation.one')}</Text>
          <Text>{t('recomendation.two')}</Text>
        </Container>
      </Body>
    </Html>
  );
};

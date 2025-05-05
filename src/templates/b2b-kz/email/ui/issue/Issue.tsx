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
import { useTranslation } from 'react-i18next';
import type { IssueOrderSchemaType } from '~/src/shared/lib/schema/index.ts';
import { AviataB2BLogo } from '~/src/shared/ui/aviata-b2b-logo/index.tsx';
import { main, container, paragraph } from './styles.ts';

type Props = {
  order: IssueOrderSchemaType;
};

export const Issue: React.FC<Props> = ({ order }) => {
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
          <Text
            style={{ margin: '16px 0 0 0', fontSize: '24px', fontWeight: 700 }}
          >
            {t('order-number')}: {order.order.number}
          </Text>
          <Text style={{ margin: '16px 0 0 0', ...paragraph }}>
            {t('passengers')}:
          </Text>
          {order.passengers.map(passenger => (
            <Row
              key={passenger.idx}
              style={{ height: '32px', verticalAlign: 'start' }}
            >
              <Column style={{ height: '32px', verticalAlign: 'start' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    stroke="#A4A2B7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 21v0a9 9 0 0 1-9-9v0a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v0a9 9 0 0 1-9 9Z"
                    clipRule="evenodd"
                  />
                  <path
                    stroke="#A4A2B7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13.591 7.659a2.25 2.25 0 1 1-3.182 3.182 2.25 2.25 0 0 1 3.182-3.182M16.321 16.54a2.905 2.905 0 0 0-2.865-2.452h-2.912a2.904 2.904 0 0 0-2.865 2.453"
                  />
                </svg>
              </Column>
              <Column style={{ height: '32px', verticalAlign: 'start' }}>
                <Text
                  style={{
                    marginLeft: '8px',
                    fontSize: '18px',
                    lineHeight: '28px',
                  }}
                >
                  {passenger.full_name} — {passenger.document.number} •{' '}
                  {t('ticket-number')} — {passenger.ticket_numbers}
                </Text>
              </Column>
            </Row>
          ))}
          {order.bookings.map(booking => (
            <Section
              key={booking.id}
              style={{
                marginBottom: '16px',
                padding: '16px',
                border: '2px solid #F0F1F4',
                borderRadius: '16px',
              }}
            >
              <Text style={{ margin: '0', ...paragraph }}>
                {t('reservation')} {booking.provider_reference}
              </Text>
              {booking.segments.map((segment, idx) => (
                <Section key={idx}>
                  <Text style={{ margin: '16px 0 8px 0', ...paragraph }}>
                    {t('flight')} {idx + 1}
                  </Text>
                  <Row align={'left'}>
                    <Column style={{ width: '70%', textAlign: 'left' }}>
                      <Text style={{ margin: '0 0 12px 0', fontSize: '18px' }}>
                        {segment.dep.city_name} ({segment.dep.city_code}) —{' '}
                        {segment.arr.city_name} ({segment.arr.city_code}) •{' '}
                        {segment.dep.at.formatted.time}
                        {', '}
                        {segment.dep.at.formatted.date}
                        <br />
                        {segment.dep.terminal
                          ? `${t('terminal')} ${segment.dep.terminal}`
                          : ''}
                      </Text>
                    </Column>
                  </Row>
                  <Text style={{ margin: '12px 0 0 0', fontSize: '18px' }}>
                    {segment.baggage.value ? (
                      <svg
                        style={{ width: '20px', height: '18px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        fill="none"
                      >
                        <path
                          stroke="#55BB06"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M16.667 5.917 7.5 15.083l-4.167-4.166"
                        />
                      </svg>
                    ) : (
                      <svg
                        style={{ width: '20px', height: '16px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        fill="none"
                      >
                        <path
                          stroke="#9C9EA3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m12 4.5-8 8M4 4.5l8 8"
                        />
                      </svg>
                    )}
                    <span style={{ margin: '0 0 12px 8px' }}>
                      {t('baggage')}: {segment.baggage_formatted}
                    </span>
                  </Text>
                  <Text style={{ margin: '12px 0 0 0', fontSize: '18px' }}>
                    {segment.luggage?.value ? (
                      <svg
                        style={{ width: '20px', height: '18px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        fill="none"
                      >
                        <path
                          stroke="#55BB06"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M16.667 5.917 7.5 15.083l-4.167-4.166"
                        />
                      </svg>
                    ) : (
                      <svg
                        style={{ width: '20px', height: '16px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        fill="none"
                      >
                        <path
                          stroke="#9C9EA3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m12 4.5-8 8M4 4.5l8 8"
                        />
                      </svg>
                    )}
                    {segment.luggage?.value ? (
                      <span style={{ margin: '0 0 12px 8px' }}>
                        {t('hand-luggage')}: {segment.luggage?.value}{' '}
                        {segment.luggage?.unit}
                      </span>
                    ) : (
                      <span style={{ margin: '0 0 12px 8px' }}>
                        {t('hand-luggage')}: {segment.luggage?.value || '?'}
                      </span>
                    )}
                  </Text>
                </Section>
              ))}
              {booking.fare_family.name ? (
                <Container>
                  <Text style={paragraph}>
                    {t('rate')} {booking.fare_family.name}
                  </Text>
                  {booking.fare_family.descriptions?.map((desc, idx) => (
                    <Text key={idx} style={{ fontSize: '18px' }}>
                      {desc.state === 'INCLUDE' ? (
                        <svg
                          style={{ width: '20px', height: '18px' }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="21"
                          fill="none"
                        >
                          <path
                            stroke="#55BB06"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16.667 5.917 7.5 15.083l-4.167-4.166"
                          />
                        </svg>
                      ) : (
                        ''
                      )}
                      {desc.state === 'CHARGABLE' ? (
                        <svg
                          style={{ width: '20px', height: '18px' }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="21"
                          fill="none"
                        >
                          <path
                            stroke="#202122"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M10 15.5V9.875m0 0h4m-4 0H6M6 6.5h8"
                          />
                        </svg>
                      ) : (
                        ''
                      )}
                      {desc.state === 'NOT OFFER' ? (
                        <svg
                          style={{ width: '20px', height: '18px' }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          fill="none"
                        >
                          <path
                            stroke="#9C9EA3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m12 4.5-8 8M4 4.5l8 8"
                          />
                        </svg>
                      ) : (
                        ''
                      )}
                      <span style={{ marginLeft: '8px' }}>{desc.name}</span>
                    </Text>
                  ))}
                </Container>
              ) : (
                ''
              )}
            </Section>
          ))}
          <Text style={{ fontSize: '18px' }}>
            {t('amount')}{' '}
            <span style={{ fontSize: '24px', fontWeight: '700' }}>
              {order.bill.amount} ₸
            </span>
          </Text>
          <Text style={{ fontSize: '18px' }}>{t('recomendation.one')}</Text>
          <Text style={{ fontSize: '24px', fontWeight: '700' }}>
            {t('recomendation.two')}
          </Text>
          <Text style={{ fontSize: '18px' }}>{t('recomendation.three')}</Text>
        </Container>
      </Body>
    </Html>
  );
};

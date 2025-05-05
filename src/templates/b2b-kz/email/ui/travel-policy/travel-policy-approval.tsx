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
} from '@react-email/components';
import React from 'react';
import type { TravelPolicySchema } from '~/src/shared/lib/schema/index.ts';
import { AviataB2BLogo } from '~/src/shared/ui/aviata-b2b-logo/index.tsx';
import { main, container, button } from './styles.ts';

type Props = {
  data: TravelPolicySchema.TravelPolicyApprovalSchemaType;
};

export const TravelPolicyApprovalEmail: React.FC<Props> = ({ data }) => (
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
        <Container style={{ marginTop: '16px' }}>
          <Text style={{ fontSize: '18px' }}>
            Пользователь {data.email} просит одобрить билет.
          </Text>
          <Section>
            <Row style={{ marginBottom: '6px', fontSize: '18px' }}>
              <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                Сработали следующие ограничения:
              </Text>
            </Row>
            <Row>
              {data.restrictions &&
                data.restrictions.map(res => (
                  <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                    - {res}
                  </Text>
                ))}
            </Row>
          </Section>
          <Text style={{ fontSize: '18px' }}>
            Комментарий: "{data.comment}"
          </Text>
          {data.passenger_names.length && (
            <Section>
              <Row style={{ marginBottom: '6px', fontSize: '18px' }}>
                <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                  Пассажиры:
                </Text>
              </Row>
              <Row>
                <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                  {data.passenger_names}
                </Text>
              </Row>
            </Section>
          )}
          <Button
            style={{ ...button, width: '40%', marginTop: '14px' }}
            href={`https://aviata.business/ru/avia/order-details/${data.order_id}`}
          >
            <Text style={{ fontSize: '18px', fontWeight: '700' }}>
              Посмотреть детали
            </Text>
          </Button>
        </Container>
      </Container>
    </Body>
  </Html>
);

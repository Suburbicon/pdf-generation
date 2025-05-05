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
import { main, container, button } from './styles.ts';
import { Logo } from '../Logo.tsx';

type Props = {
  data: TravelPolicySchema.TravelPolicySendingSchemaType;
};

export const TravelPolicySendingEmail: React.FC<Props> = ({ data }) => (
  <Html>
    <Head />
    <Preview>
      На сайте aviata.business Вы cможете найти, забронировать и купить
      авиабилеты в Казахстане онлайн на рейсы практически любой авиакомпании в
      мире. Мы поможем найти дешевый билет на самолет на любое направление
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Logo />
        <Container style={{ marginTop: '16px' }}>
          <Text style={{ fontSize: '18px' }}>
            Вы отправили билет на согласование.
          </Text>
          <Button
            style={{ ...button, width: '40%', marginBottom: '16px' }}
            href="https://aviata.business/ru"
          >
            <Text style={{ fontSize: '18px', fontWeight: '700' }}>
              Детали билета
            </Text>
          </Button>
          <Section>
            {data.approving_users.map((el, index) => (
              <Row>
                <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                  Согласующие лица на этапе {index + 1}:{' '}
                  {el.map(user => `${user}`).join(', ')}
                </Text>
              </Row>
            ))}
          </Section>
          <Text style={{ fontSize: '18px' }}>
            Для выкупа дождитесь одобрения на всех этапах.
          </Text>
        </Container>
      </Container>
    </Body>
  </Html>
);

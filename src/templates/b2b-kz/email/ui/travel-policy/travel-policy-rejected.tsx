import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import React from 'react';
import type { TravelPolicySchema } from '~/src/shared/lib/schema/index.ts';
import { main, container, button } from './styles.ts';
import { Logo } from '../Logo.tsx';

type Props = {
  data: TravelPolicySchema.TravelPolicyRejectedSchemaType;
};

export const TravelPolicyRejectedEmail: React.FC<Props> = ({ data }) => (
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
            Пользователь {data.approving_user} отказал вам в покупке билета.
            {data.comment && ` Комментарий: "${data.comment}"`}
          </Text>
        </Container>
        <Button
          style={{ ...button, width: '40%' }}
          href="https://aviata.business/ru"
        >
          <Text style={{ fontSize: '18px', fontWeight: '700' }}>
            К поиску билетов
          </Text>
        </Button>
      </Container>
    </Body>
  </Html>
);

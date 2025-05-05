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
  data: TravelPolicySchema.TravelPolicyApprovedSchemaType;
};

export const TravelPolicyApprovedEmail: React.FC<Props> = ({ data }) => (
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
            Пользователь {data.approving_user} одобрил вам покупку билета.
            <br />
            {data.comment && ` Комментарий: "${data.comment}"`}
          </Text>
        </Container>
        {data.is_fully_approved ? (
          <Button
            style={{ ...button, width: '45%', backgroundColor: '#FFA254' }}
            href={`https://aviata.business/ru/payment/${data.order_id}`}
          >
            <Text style={{ fontSize: '18px', fontWeight: '700' }}>
              Перейти к оплате
            </Text>
          </Button>
        ) : (
          <Container style={{ marginTop: '16px' }}>
            <Text style={{ fontSize: '18px' }}>
              Дождитесь одобрения {data.users}
            </Text>
          </Container>
        )}
      </Container>
    </Body>
  </Html>
);

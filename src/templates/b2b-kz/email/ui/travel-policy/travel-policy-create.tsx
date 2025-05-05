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
  data: TravelPolicySchema.TravelPolicyCreateSchemaType;
};

export const TravelPolicyCreateEmail: React.FC<Props> = ({ data }) => (
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
            Вы создали тревел политику «{data.name}»
          </Text>
          <Button
            style={{ ...button, width: '40%' }}
            href="https://aviata.business/ru"
          >
            <Text style={{ fontSize: '18px', fontWeight: '700' }}>
              Посмотреть
            </Text>
          </Button>
        </Container>
      </Container>
    </Body>
  </Html>
);

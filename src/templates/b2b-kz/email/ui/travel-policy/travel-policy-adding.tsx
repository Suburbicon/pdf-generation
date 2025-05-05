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
  data: TravelPolicySchema.TravelPolicyAddingSchemaType;
};

export const TravelPolicyAddingEmail: React.FC<Props> = ({ data }) => (
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
            Пользователь {data.email} добавил вас в тревел политику "
            {data.travel_policy_name}"
          </Text>
          <Section>
            <Row style={{ marginBottom: '6px', fontSize: '18px' }}>
              <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                Ограничения для покупки билетов:
              </Text>
            </Row>
            <Row>
              <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                - Запрещен бизнес класс
              </Text>
            </Row>
            <Row>
              <Text style={{ margin: '2px 0', fontSize: '18px' }}>
                - Доступны билеты только с багажом
              </Text>
            </Row>
          </Section>
        </Container>
      </Container>
    </Body>
  </Html>
);

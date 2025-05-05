import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import { AviataB2BLogo } from '~/src/shared/ui/aviata-b2b-logo/index.tsx';
import { main, container, titleStyle, paragraph } from './styles.ts';
import './index.css';

export const CommonEmail = ({
  title,
  text,
  additional,
}: {
  title: string;
  text: string;
  additional?: string;
}) => (
  <Html>
    <Head />
    <Preview>
      На сайте aviata.business Вы cможете найти, забронировать и купить
      авиабилеты в Казахстане онлайн на рейсы практически любой авиакомпании в
      мире. Мы поможем найти дешевый билет на самолет на любое направление
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <AviataB2BLogo width={200} />
        <Text style={titleStyle}>{title}</Text>
        <Text style={paragraph}>{text}</Text>
        {additional && (
          <Container>
            <Text
              style={paragraph}
              dangerouslySetInnerHTML={{ __html: additional }}
            ></Text>
          </Container>
        )}
      </Container>
    </Body>
  </Html>
);

export default CommonEmail;

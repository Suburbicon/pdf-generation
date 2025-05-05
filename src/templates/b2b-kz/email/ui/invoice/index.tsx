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
import { main, container, titleStyle, paragraph, styles } from './styles.ts';
import './index.css';

export const InvoiceEmail = ({
  title,
  text,
  link,
  is_avia,
}: {
  title: string;
  text: string;
  link: string;
  is_avia: boolean;
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
        <AviataB2BLogo width={198} />
        <Text style={titleStyle}>{title}</Text>
        <Text style={paragraph}>{text}</Text>
        <Button href={link} style={styles.linkStyle}>
          <Text style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>
            Открыть счет инвойс
          </Text>
        </Button>
        {is_avia && (
          <Text>
            Обращаем Ваше внимание на то, что авиакомпания имеет право в любой
            момент изменить предельный срок оплаты заказа или аннулировать его
            без предупреждения
          </Text>
        )}
        <Text>Спасибо, что выбираете Aviata Busienss</Text>
      </Container>
    </Body>
  </Html>
);

export default InvoiceEmail;

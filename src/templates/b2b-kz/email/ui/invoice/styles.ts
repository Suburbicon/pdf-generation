import { StyleSheet } from '@react-pdf/renderer';
import { CSS } from '~/src/shared/lib/css/index.ts';

export const main = {
  backgroundColor: '#F1F2F7',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  minWidth: '800px',
};

export const container = {
  margin: '0 auto',
  marginTop: '50px',
  padding: '52px 58px 30px 58px',
  backgroundColor: '#FFFFFF',
  borderRadius: '24px',
};

export const titleStyle = {
  fontSize: '18px',
  fontWeight: '700',
};

export const paragraph = {
  fontSize: '16px',
  lineHeight: '29px',
};

export const styles = StyleSheet.create({
  linkStyle: {
    width: '240px',
    height: '54px',
    backgroundColor: '#55BB06',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '18px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
  },
});

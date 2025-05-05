import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import type { BookOrderSchemaType } from '~/src/shared/lib/schema/index.ts';
import { Book } from './Book.tsx';

type Props = {
  order: BookOrderSchemaType;
  i18n: i18next.i18n;
};

const DEFAULT_I18N_NS = 'book';

export const BookEmail: React.FC<Props> = ({ order, i18n }) => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={DEFAULT_I18N_NS}>
      <Book order={order} />
    </I18nextProvider>
  );
};

export default BookEmail;

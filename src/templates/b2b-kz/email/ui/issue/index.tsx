import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import type { IssueOrderSchemaType } from '~/src/shared/lib/schema/index.ts';
import { Issue } from './Issue.tsx';

type Props = {
  order: IssueOrderSchemaType;
  i18n: i18next.i18n;
};

const DEFAULT_I18N_NS = 'issue';

export const IssueEmail: React.FC<Props> = ({ order, i18n }) => (
  <I18nextProvider i18n={i18n} defaultNS={DEFAULT_I18N_NS}>
    <Issue order={order} />
  </I18nextProvider>
);

export default IssueEmail;

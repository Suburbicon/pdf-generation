import { TFunction } from 'i18next';
import { AdapterContext } from '~/src/shared/lib/adapter-context.ts';
import type { AdapterWarning } from '~/src/shared/lib/adapter-context.ts';
import { PdfBusinessTripWritRequestSchemaType } from '~/src/shared/lib/schema/index.ts';
import type { PdfBusinessTripWritContextSpec } from '../types.ts';

type I18nParams = {
  t: TFunction;
  lng: string;
};

function convertRawRequestData(
  data: PdfBusinessTripWritRequestSchemaType,
  params: I18nParams
): [PdfBusinessTripWritContextSpec.Entity, Array<AdapterWarning>] {
  const adapterContext = new AdapterContext();
  const converted = {
    organization_name: data.organization_name,
    document_number: data.document_number,
    document_date: data.document_date.split('-').join('.'),
    employee_number: data.employee_number,
    employee_full_name: data.employee_full_name,
    department: data.department,
    position: data.position,
    destination: data.destination,
    duration_days: data.duration_days,
    start_date: data.start_date.split('-').join('.'),
    end_date: data.end_date.split('-').join('.'),
    purpose: data.purpose,
    funding_source: data.funding_source,
    manager_position: data.manager_position,
    per_diem: data.per_diem,
  };

  return [converted, adapterContext.getWarnings()];
}

export const contextAdapterLib = {
  convertRawRequestData,
};

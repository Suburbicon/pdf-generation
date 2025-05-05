/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-use-before-define */

export namespace PdfBusinessTripWritContextSpec {
  export type Entity = {
    organization_name: string;
    document_number?: string | null;
    document_date: string;
    employee_number?: string | null;
    employee_full_name: string;
    department?: string | null;
    position: string;
    destination: string;
    duration_days: number;
    start_date: string;
    end_date: string;
    purpose: string;
    funding_source?: string | null;
    manager_position?: string | null;
    per_diem?: number | null;
  };
}

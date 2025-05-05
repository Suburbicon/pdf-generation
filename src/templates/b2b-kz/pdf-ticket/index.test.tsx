import { kebabCase, noop } from 'lodash-es';
import { describe, it, expect } from 'vitest';
import { testLib } from '~/src/shared/lib/test/index.ts';
import { i18nInstance } from '~/src/shared/lib/i18n/index.ts';
import { PdfTicketRequestSchemaType } from '~/src/shared/lib/schema/pdf-receipt-schema.ts';
import { PdfTicket } from './index.tsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function expectPdfToMatchImageSnapshot(fixturePromise: Promise<any>) {
  const rawData = await fixturePromise.then(
    m => m.default as PdfTicketRequestSchemaType
  );

  const pages = await testLib.reactPdfToImage(
    <PdfTicket rawData={rawData} i18n={i18nInstance} onWarning={noop} />
  );

  for (const page of pages) {
    expect(page.content).toMatchImageSnapshot({
      customSnapshotIdentifier(options) {
        const [, ...descriptions] = options.currentTestName.split(' > ');

        return descriptions
          .map(kebabCase)
          .join('-')
          .concat(`-${options.counter}`);
      },
    });
  }
}

describe('b2b/pdf-ticket', () => {
  it('OW Base Case', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW.json')
    );
  });

  it('RT Base Case', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_RT.json')
    );
  });

  it('ML Base Case', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_ML.json')
    );
  });

  it('Base OWC/VI', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OWC_VI.json')
    );
  });

  it('Base OW with 2 ADT', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW_2_ADT.json')
    );
  });

  it('Base OW with ADT, CHD', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW_ADT_CHD.json')
    );
  });

  it('Base OW with ADT, CHD, INF', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW_ADT_CHD_INF.json')
    );
  });

  describe('Ancillary', () => {
    it('Base OW', () => {
      return expectPdfToMatchImageSnapshot(
        import('~/src/__mocks__/pdf-ticket-payload/base_OW_ancillary_ADT.json')
      );
    });

    it('OW with multiple segments', () => {
      return expectPdfToMatchImageSnapshot(
        import(
          '~/src/__mocks__/pdf-ticket-payload/base_OW_ancillary_ADT_multiple_segments.json'
        )
      );
    });
  });

  it('Base OW cabin class business/economy', () => {
    return expectPdfToMatchImageSnapshot(
      import(
        '~/src/__mocks__/pdf-ticket-payload/base_OW_cabin_class_segments.json'
      )
    );
  });

  it('Base OW Charter', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW_charter.json')
    );
  });

  it('Segment durations with different time zones', () => {
    return expectPdfToMatchImageSnapshot(
      import(
        '~/src/__mocks__/pdf-ticket-payload/base_OW_different_timezones.json'
      )
    );
  });

  it('Base OW pricing products', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW_pricing.json')
    );
  });

  describe('Fare Family', () => {
    it('Base fare variations', () => {
      return expectPdfToMatchImageSnapshot(
        import(
          '~/src/__mocks__/pdf-ticket-payload/base_OW_base_fare_variations.json'
        )
      );
    });

    it('INCLUDED 2 column', () => {
      return expectPdfToMatchImageSnapshot(
        import(
          '~/src/__mocks__/pdf-ticket-payload/base_OW_fare_included_features.json'
        )
      );
    });

    it('CHARGEABLE 2 column', () => {
      return expectPdfToMatchImageSnapshot(
        import(
          '~/src/__mocks__/pdf-ticket-payload/base_OW_fare_chargeable_features.json'
        )
      );
    });
  });

  it('OW with stops', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW_stops.json')
    );
  });

  it('OW segment connections guarantee', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/base_OW_connections.json')
    );
  });

  it('negative timezone', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/negative_timezone.json')
    );
  });

  it('render multi PNR with line break', () => {
    return expectPdfToMatchImageSnapshot(
      import('~/src/__mocks__/pdf-ticket-payload/multi_PNR.json')
    );
  });
});

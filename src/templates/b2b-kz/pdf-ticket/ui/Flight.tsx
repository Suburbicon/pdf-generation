import { Image, StyleSheet, Text, View, Svg, Path } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { theme } from '~/src/shared/config/b2b/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { PdfTicketContextSpec } from '../types.ts';
import { usePdfTicketContext } from '../context.tsx';
import { FareInfo } from './FareInfo.tsx';
import { Connection } from './Connection.tsx';
import { Stop } from './Stop.tsx';
import { Message } from './Message.tsx';

const styles = StyleSheet.create({
  root: {},
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: CSS.px(24),
  },
  flightHeading: {
    marginLeft: CSS.px(12),
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    textTransform: 'uppercase',
  },
  segmentContainer: {
    backgroundColor: theme.colors.black,
    borderRadius: CSS.px(12),
  },
  rootHeader: {
    paddingLeft: CSS.px(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flightDirections: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    textTransform: 'uppercase',
  },
  columnTitle: {
    height: CSS.px(24),
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[450],
  },
  segmentInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  segmentInfoText: {
    marginTop: CSS.px(4),
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    minHeight: CSS.px(24),
  },
  airlineWrapper: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationsBox: {
    justifyContent: 'space-between',
    flexGrow: 1,
    position: 'relative',
  },
  locationTime: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  locationDate: {
    marginTop: CSS.px(4),
    fontSize: CSS.px(12),
  },
  locationCityBox: {
    minHeight: CSS.px(24),
    justifyContent: 'center',
  },
  locationAirportCode: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
  locationAirport: {
    marginTop: CSS.px(4),
    fontSize: CSS.px(13),
  },
  locationRow: {
    flexDirection: 'row',
    paddingRight: CSS.px(20),
  },
  locationTerminal: {
    marginTop: CSS.px(4),
    fontSize: CSS.px(13),
  },
  segmentWrapper: {
    marginHorizontal: CSS.px(2),
    marginBottom: CSS.px(2),
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: CSS.px(10),
    borderBottomRightRadius: CSS.px(10),
  },
  headerBadge: {
    position: 'relative',
    paddingTop: CSS.px(2),
    paddingRight: CSS.px(2),
  },
  angleShape: {
    position: 'absolute',
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: CSS.px(16),
    alignItems: 'center',
    backgroundColor: theme.colors.green[600],
    transform: 'skew(-30px)',
    width: CSS.px(40),
    left: CSS.px(-20),
    top: CSS.px(2),
    bottom: 0,
  },
  headerBadgeTextWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: CSS.px(16),
    alignItems: 'center',
    backgroundColor: theme.colors.green[600],
    borderTopRightRadius: CSS.px(10),
  },
  headerBadgeText: {
    marginLeft: CSS.px(4),
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
});

type SegmentInfoProps = {
  segment: PdfTicketContextSpec.Segment.Entity;
};

const SegmentInfo: React.FC<SegmentInfoProps> = ({ segment }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.segmentInfo}>
      <View style={{ width: '50%' }}>
        <Text style={styles.segmentInfoText}>{segment.duration}</Text>
        <Text style={styles.columnTitle}>{t('flight-duration')}</Text>
      </View>
      <View style={{ width: '50%' }}>
        <Image src={segment.airlineLogoSrc} style={{ width: CSS.px(94) }} />
      </View>
      <View style={{ marginTop: CSS.px(16), width: '50%' }}>
        <Text style={styles.segmentInfoText}>{segment.pnr}</Text>
        <Text style={styles.columnTitle}>{t('pnr')}</Text>
      </View>
      <View style={{ marginTop: CSS.px(16), width: '50%' }}>
        <Text style={styles.segmentInfoText}>{segment.ticketNumber}</Text>
        <Text style={styles.columnTitle}>{t('e-ticket-number')}</Text>
      </View>
      <View style={{ marginTop: CSS.px(16), width: '50%' }}>
        <Text style={styles.segmentInfoText}>{segment.cabinClass}</Text>
        <Text style={styles.columnTitle}>{t('cabin-class')}</Text>
      </View>
      <View style={{ marginTop: CSS.px(16), width: '50%' }}>
        <Text style={styles.segmentInfoText}>{segment.flightNumber}</Text>
        <Text
          style={[
            styles.columnTitle,
            {
              color: segment.isCharter ? theme.colors.blue[500] : undefined,
              fontWeight: segment.isCharter
                ? theme.fontWeight.semibold
                : undefined,
            },
          ]}
        >
          {segment.isCharter ? t('flight_charter') : t('flight')}
        </Text>
      </View>
    </View>
  );
};

type SegmentLocationsProps = {
  segment: PdfTicketContextSpec.Segment.Entity;
};

const locationChartLine = (
  <View
    style={{
      position: 'absolute',
      top: CSS.px(4),
      bottom: CSS.px(0),
      left: CSS.px(125),
      borderLeftWidth: CSS.px(2),
      borderLeftStyle: 'solid',
      borderLeftColor: theme.colors.green[600],
    }}
  />
);

const locationChartPoint = (
  <View
    style={{
      height: CSS.px(24),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: CSS.px(20),
      backgroundColor: theme.colors.white,
    }}
  >
    <View
      style={{
        width: CSS.px(14),
        height: CSS.px(14),
        backgroundColor: theme.colors.green[600],
        borderRadius: '50%',
      }}
    />
  </View>
);

const SegmentLocations: React.FC<SegmentLocationsProps> = ({ segment }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.locationsBox}>
      {locationChartLine}
      <View style={styles.locationRow}>
        <View style={{ width: '40%' }}>
          <View style={{ minHeight: CSS.px(24) }}>
            <Text style={styles.locationTime}>{segment.orig.time}</Text>
          </View>
          <Text style={styles.locationDate}>{segment.orig.date}</Text>
        </View>
        {locationChartPoint}
        <View style={{ width: '55%' }}>
          <View style={styles.locationCityBox}>
            <Text style={[styles.locationAirportCode]}>
              {segment.orig.airportCode}
            </Text>
          </View>
          <Text style={styles.locationAirport}>{segment.orig.airport}</Text>
          {segment.orig.terminal && (
            <Text style={styles.locationTerminal}>
              {t('terminal', { terminal: segment.orig.terminal })}
            </Text>
          )}
        </View>
      </View>

      {segment.stops &&
        segment.stops.map((stop, index) => (
          <Stop key={index} stop={stop} style={{ marginTop: CSS.px(16) }} />
        ))}

      <View style={[styles.locationRow, { marginTop: CSS.px(16) }]}>
        <View style={{ width: '40%' }}>
          <View style={{ minHeight: CSS.px(24) }}>
            <Text style={styles.locationTime}>{segment.dest.time}</Text>
          </View>
          <Text style={styles.locationDate}>{segment.dest.date}</Text>
        </View>
        <View style={{ backgroundColor: theme.colors.white }}>
          {locationChartPoint}
        </View>
        <View style={{ width: '55%' }}>
          <View style={styles.locationCityBox}>
            <Text style={[styles.locationAirportCode]}>
              {segment.dest.airportCode}
            </Text>
          </View>
          <Text style={styles.locationAirport}>{segment.dest.airport}</Text>
          {segment.dest.terminal && (
            <Text style={styles.locationTerminal}>
              {t('terminal', { terminal: segment.dest.terminal })}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

type SegmentProps = {
  segment: PdfTicketContextSpec.Segment.Entity;
};

const Segment: React.FC<SegmentProps> = ({ segment }) => {
  return (
    <View
      wrap={false}
      style={{
        flexDirection: 'row',
        paddingVertical: CSS.px(20),
        paddingHorizontal: CSS.px(24),
      }}
    >
      <View style={{ width: '50%', paddingRight: CSS.px(28) }}>
        <SegmentLocations segment={segment} />
      </View>
      <View style={{ width: '50%' }}>
        <SegmentInfo segment={segment} />
      </View>
    </View>
  );
};

const AviataPlane: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => (
  <Svg
    width={CSS.px(24)}
    height={CSS.px(24)}
    viewBox="0 0 24 24"
    style={{
      transform: reverse ? 'rotate(180deg)' : undefined,
    }}
  >
    <Path
      d="M7.51744 0.251786C7.51744 0.251786 8.82297 0.147292 9.43363 0.481672C10.0078 0.796076 15.9823 8.66911 16.9389 9.93852C17.0594 10.0972 17.2479 10.202 17.4614 10.2099C20.9769 10.3377 23.8003 10.8986 23.9842 11.8924C23.995 11.9246 24.0003 11.9623 24 11.9999C24.0003 12.0375 23.995 12.0752 23.9842 12.1074C23.8003 13.1012 20.9769 13.6621 17.4614 13.7898C17.2479 13.7978 17.0594 13.9026 16.9389 14.0613C15.9823 15.3307 10.0078 23.2037 9.43364 23.5181C8.82298 23.8525 7.51743 23.748 7.51743 23.748C7.51743 23.748 10.3812 17.6247 10.7813 16.308C11.1182 15.1795 11.2235 14.0928 11.1814 13.6539C8.06492 13.4867 5.24325 13.2359 3.9377 13.006L1.43189 15.9319C1.43189 15.9319 1.32661 16.0573 1.09498 16.0782C0.884403 16.0991 0 16.0991 0 16.0991L1.0318 12.3791C1.0318 12.3791 0.694888 12.2537 0.463259 12.1701C0.273744 12.1074 0.252637 12.0208 0.252637 11.9999C0.252637 11.979 0.273749 11.8924 0.463264 11.8297C0.694893 11.7461 1.03181 11.6207 1.03181 11.6207L5.0576e-06 7.90072C5.0576e-06 7.90072 0.884408 7.90073 1.09498 7.92162C1.32661 7.94252 1.4319 8.06792 1.4319 8.06792L3.93771 10.9937C5.24326 10.7639 8.06491 10.5131 11.1814 10.3459C11.2235 9.90701 11.1182 8.82027 10.7813 7.69174C10.3812 6.37512 7.51744 0.251786 7.51744 0.251786Z"
      fill="#55BB06"
    />
  </Svg>
);

type SegmentContainerProps = {
  segment: PdfTicketContextSpec.Segment.Entity;
} & WithStyle;

const SegmentContainer: React.FC<SegmentContainerProps> = ({
  segment,
  style = {},
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.segmentContainer, style]}>
      <View wrap={false}>
        <View style={styles.rootHeader}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}
          >
            <Text style={styles.flightDirections}>
              {segment.orig.city} — {segment.dest.city}
            </Text>
          </View>
          <View style={styles.headerBadge}>
            <View style={styles.angleShape} />
            <View style={styles.headerBadgeTextWrapper}>
              <Text style={styles.headerBadgeText}>
                {t('segment-flight-index', { index: segment.index + 1 })}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.segmentWrapper]}>
          <Segment segment={segment} />
        </View>
      </View>
    </View>
  );
};

type FlightProps = {
  flight: PdfTicketContextSpec.Flight.Entity;
  isInfant: boolean;
  index: number;
} & WithStyle;

export const Flight: React.FC<FlightProps> = ({
  flight,
  isInfant,
  index,
  style = {},
}) => {
  const { isRT } = usePdfTicketContext();
  const { t } = useTranslation();
  const [firstSegment, ...restSegments] = flight.segments;

  return (
    <View style={[styles.root, style]}>
      <View wrap={false}>
        <View style={styles.flightHeader}>
          <AviataPlane reverse={isRT && index === 1} />
          <Text style={styles.flightHeading}>
            {flight.orig} — {flight.dest}
          </Text>
        </View>
        <SegmentContainer segment={firstSegment} />
      </View>
      {firstSegment.fare && (
        <FareInfo fare={firstSegment.fare} style={{ marginTop: CSS.px(16) }} />
      )}
      {isInfant && (
        <Message variant="info" style={{ marginTop: CSS.px(16) }}>
          {t('inf-luggage-info')}
        </Message>
      )}
      {firstSegment.connection && (
        <Connection
          connection={firstSegment.connection}
          style={{ marginTop: CSS.px(16) }}
        />
      )}
      {restSegments.map((s, index) => (
        <React.Fragment key={index}>
          <SegmentContainer segment={s} style={{ marginTop: CSS.px(16) }} />
          {s.fare && (
            <FareInfo fare={s.fare} style={{ marginTop: CSS.px(16) }} />
          )}
          {s.connection && (
            <Connection
              connection={s.connection}
              style={{ marginTop: CSS.px(16) }}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

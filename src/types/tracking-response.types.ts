// Types for new tracking-response.json structure

export interface TrackingResponse {
  data: {
    trackings: Tracking[];
  };
}

export interface Tracking {
  tracker: Tracker;
  shipment: Shipment;
  events: TrackingEvent[];
  statistics: TrackingStatistics;
}

export interface Tracker {
  trackerId: string;
  trackingNumber: string;
  shipmentReference: string | null;
  courierCode: string[];
  clientTrackerId: string | null;
  isSubscribed: boolean;
  isTracked: boolean;
  createdAt: string;
}

export interface Shipment {
  shipmentId: string;
  statusCode: string | null;
  statusCategory: string | null;
  statusMilestone: string | null;
  originCountryCode: string | null;
  destinationCountryCode: string | null;
  delivery: ShipmentDelivery;
  trackingNumbers: { tn: string }[];
  recipient: ShipmentRecipient;
}

export interface ShipmentDelivery {
  estimatedDeliveryDate: string | null;
  service: string | null;
  signedBy: string | null;
}

export interface ShipmentRecipient {
  name: string | null;
  address: string | null;
  postCode: string | null;
  city: string | null;
  subdivision: string | null;
}

export interface TrackingEvent {
  eventId: string;
  trackingNumber: string;
  eventTrackingNumber: string;
  status: string;
  occurrenceDatetime: string;
  order: number | null;
  datetime: string;
  hasNoTime: boolean;
  utcOffset: string | null;
  location: string;
  sourceCode: string;
  courierCode: string;
  statusCode: string | null;
  statusCategory: string | null;
  statusMilestone: string | null;
}

export interface TrackingStatistics {
  timestamps: {
    infoReceivedDatetime: string | null;
    inTransitDatetime: string | null;
    outForDeliveryDatetime: string | null;
    failedAttemptDatetime: string | null;
    availableForPickupDatetime: string | null;
    exceptionDatetime: string | null;
    deliveredDatetime: string | null;
  };
}

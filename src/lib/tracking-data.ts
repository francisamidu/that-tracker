export type TrackingEvent = {
  date: string
  time: string
  carrier: string
  status: string
  location: string
}

export const trackingData: TrackingEvent[] = [
  {
    date: "Jun 20, 2025",
    time: "18:49",
    carrier: "UNIVERSAL POSTAL UNION",
    status: "Your package is in transit with the carrier.",
    location: "Estimated delivery",
  },
  {
    date: "Jun 14, 2025",
    time: "13:14",
    carrier: "UNIVERSAL POSTAL UNION",
    status: "Your parcel has arrived at a transit centre, it is on its way.",
    location: "Departure from outward office of exchange, GBASFY",
  },
  {
    date: "Jun 14, 2025",
    time: "13:13",
    carrier: "UNIVERSAL POSTAL UNION",
    status: "Your package is being cleared through customs.",
    location: "Item returned from export Customs-Security",
  },
  {
    date: "Jun 14, 2025",
    time: "11:54",
    carrier: "UNIVERSAL POSTAL UNION",
    status: "Your package is in transit with the carrier.",
    location: "Posting-Collection",
  },
  {
    date: "Jun 10, 2025",
    time: "09:38",
    carrier: "CAINAO",
    status: "Your parcel has arrived at a transit centre, it is on its way.",
    location: "Arrived at linehaul office",
  },
  {
    date: "Jun 10, 2025",
    time: "02:00",
    carrier: "MAILAMERICAS",
    status: "The carrier has been informed and will soon collect your package.",
    location: "Transshipment - Transfer, Arrived at Dubai",
  },
  {
    date: "Jun 9, 2025",
    time: "01:47",
    carrier: "CAINAO",
    status: "Your package is in transit with the carrier.",
    location: "Left from departure country-region",
  },
]

export type APIResponse = {
  trackingNumber: string;
  status: string;
  events: {
    date: string;
    status: string;
    location: string;
  }[];
};

export type Ticket = {
  supportId: string;
  subject: string;
  dateLogged: string;
  supportReplyCount: number;
  status: "Open" | "Closed";
};

export const TicketDetails: Ticket[] = [
  {
    supportId: "323454",
    subject: "My Profit has not dropped",
    dateLogged: "29, Apr 2025",
    supportReplyCount: 0,
    status: "Open",
  },
  {
    supportId: "323454",
    subject: "My Profit has not dropped",
    dateLogged: "29, Apr 2025",
    supportReplyCount: 2,
    status: "Closed",
  },
  {
    supportId: "323454",
    subject: "My Profit has not dropped",
    dateLogged: "29, Apr 2025",
    supportReplyCount: 2,
    status: "Open",
  },
  {
    supportId: "323454",
    subject: "My Profit has not dropped",
    dateLogged: "29, Apr 2025",
    supportReplyCount: 5,
    status: "Closed",
  },
  {
    supportId: "323454",
    subject: "My Profit has not dropped",
    dateLogged: "29, Apr 2025",
    supportReplyCount: 1,
    status: "Closed",
  },
  {
    supportId: "323454",
    subject: "My Profit has not dropped",
    dateLogged: "29, Apr 2025",
    supportReplyCount: 2,
    status: "Open",
  },
];

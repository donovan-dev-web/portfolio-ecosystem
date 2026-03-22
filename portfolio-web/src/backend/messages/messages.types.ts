export type MessageType = {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  content: string;
  read?: boolean;
  dateSent?: Date;
  dateRead?: Date;
};

export type MessageReadUpdate = {
  read: boolean;
  dateRead?: Date;
};

export type PaginatedMessagesResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: MessageType[];
};

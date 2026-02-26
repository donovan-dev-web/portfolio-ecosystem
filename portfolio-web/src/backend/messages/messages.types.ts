export type MessageType = {
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

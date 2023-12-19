export type Mail = {
  id?: string;
  name?: string;
  email?: string;
  message?: string;
  isRead?: boolean;
};

export type ReplyMail = {
  id?: string;
  name?: string;
  email?: string;
  message?: string;
  isRead?: boolean;
  adminMail?: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
  disabledAt: Date | null;
  metadata?: UserMetadata | null;
};

export type UserMetadata = {
  isUnreadableDocWarningRead?: boolean;
};

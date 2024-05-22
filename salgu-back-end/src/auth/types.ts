export type CommonUserDataPayload = {
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
};

export interface JwtPayload extends CommonUserDataPayload {
  sub: number;
}

export interface UserFromPayload extends CommonUserDataPayload {
  id: number;
}

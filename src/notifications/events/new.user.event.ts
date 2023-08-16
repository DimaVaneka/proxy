/* eslint-disable prettier/prettier */
export class NewUserEvent {
  constructor(public email: string, public password: string, public confirmPassword: string) {}
}

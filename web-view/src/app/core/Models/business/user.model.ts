export class UserModel {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: _company;
}

class _company {
  bs: string
  catchPhrase: string
  name: string
}
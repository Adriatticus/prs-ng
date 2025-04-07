export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  characterName: string;
  job: string;
  title: string;
  reviewer: boolean;
  admin: boolean;

  constructor(
    id: number = 0,
    username = '',
    password = '',
    firstName = '',
    lastName = '',
    phoneNumber = 0,
    email = '',
    characterName = '',
    job = '',
    title = '',
    reviewer = false,
    admin = false
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.characterName = characterName;
    this.job = job;
    this.title = title;
    this.reviewer = reviewer;
    this.admin = admin;
  }
}

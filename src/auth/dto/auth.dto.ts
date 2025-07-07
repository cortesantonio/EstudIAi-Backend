export class RegisterDto {
  email: string;
  password: string;
  name: string;
  avatarUrl?: string;
  birthdate: Date;
}

export class LoginDto {
  email: string;
  password: string;
}

export class AuthResponse {
  user: {
    id: number;
    email: string;
    name: string;
    avatarUrl: string;
    birthdate: Date;
  };
  token: string;
} 
export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "organizer" | "customer";
      userId: string;
    };
  }
}

import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-socials";
import { tursoDB } from "./db.server";
import { v4 as uuid } from "uuid";

export const remixAuthenticator = new Authenticator(sessionStorage);

remixAuthenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "openid", "profile"],
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://rangavilas.vercel.app/auth/google/callback"
          : "http://localhost:3000/auth/google/callback",
    },
    async ({ profile }) => {
      const existingProfile = await tursoDB
        .selectFrom("User")
        .where("User.email", "=", profile?.emails[0].value)
        .selectAll()
        .executeTakeFirst();

      const userProfile = !existingProfile
        ? await tursoDB
            .insertInto("User")
            .values({
              id: uuid(),
              email: profile?.emails[0].value,
              first_name: profile?.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              is_admin: false,
              image: profile?.photos[0].value,
            })
            .returning([
              "User.email",
              "User.first_name",
              "User.last_name",
              "User.id",
              "User.image",
            ])
            .executeTakeFirst()
        : existingProfile;

      return userProfile;
    }
  )
);

import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

export const remixAuthenticator = new Authenticator(sessionStorage);

async function handleProfileCreateCallback(resParams: any) {
  return resParams.profile;
}

remixAuthenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "openid", "profile"],
      callbackURL: `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    handleProfileCreateCallback
  )
);
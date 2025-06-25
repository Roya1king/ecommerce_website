

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createUser, getExistingUser } from "./lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

callbacks: {
  async signIn({ profile }) {
    try {
      if (!profile?.email) throw new Error("No email in profile");

      const userData = {
        email: profile.email,
        username: profile.email.split("@")[0],
        first_name: profile.given_name || "",
        last_name: profile.family_name || "",
        profile_picture_url: profile.picture || ""
      };

      // Check if user exists
      const userExists = await getExistingUser(profile.email);
      
      if (!userExists?.exists) {
        console.log("Creating new user:", userData);
        await createUser(userData);
      }

      return true;
    } catch (error) {
      console.error("SignIn error:", error);
      return false;
    }
  }
}
})
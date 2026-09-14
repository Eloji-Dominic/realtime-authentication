import { createAuthClient } from "better-auth/client";
import toast from "react-hot-toast";
const authClient = createAuthClient();

export const signInWithGitHub = async () => {
  const { error } = await authClient.signIn.social({
    provider: "github",
  });

  if(error){
    toast.error(error.message as string);
    return;
  }
};

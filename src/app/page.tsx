import FileUpload from "@/components/FileUpload";
import SubscriptionButton from "@/components/SubscriptionButton";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();
  const isAuth = !!userId;
  const isProMember = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-r from-gray-900 to-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-semibold text-white">
                Chat with any PDF
              </h1>
              <UserButton afterSignOutUrl="/" />
            </div>

            <div className="flex mt-2">
              {isAuth && firstChat && (
                <Link href={`/chat/${firstChat.id}`}>
                  <Button className="text-white">
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              )}
              <div className="ml-3">
                <SubscriptionButton isProMember={isProMember} />
              </div>
            </div>

            <p className="max-w-xl mt-1 text-lg text-slate-400">
              Joined lot of peoples to understand pdf and extract usefull info
              from the pdf using AI.
            </p>

            <div className="w-full mt-4">
              {isAuth ? (
                <FileUpload />
              ) : (
                <Link href="./sign-in">
                  <Button>
                    Log In to get started
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

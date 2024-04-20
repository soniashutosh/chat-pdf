import HandleViewing from "@/components/HandleViewing";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const page = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");
  // get all the chats for this specific user
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  if (!_chats) return redirect("/");
  if (!_chats.find((chat) => chat.id === parseInt(chatId)))
    return redirect("/");

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isProMember = await checkSubscription();

  return (
    <>
      <div className="flex flex-col max-h-screen overflow-scroll">
        <HandleViewing
          pdf_url={currentChat?.pdfUrl || ""}
          chatId={parseInt(chatId)}
          chats={_chats}
          isProMember={isProMember}
        />
      </div>
    </>
  );
};

export default page;

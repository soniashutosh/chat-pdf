import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
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
      <div className="flex max-h-screen overflow-scroll">
        <div className="flex w-full max-h-screen overflow-scroll">
          {/* Chats sidebar */}
          <div className="flex-[1] max-w-xs">
            <ChatSideBar
              chats={_chats}
              chatId={parseInt(chatId)}
              isProMember={isProMember}
            />
          </div>
          {/* Main Pdf viewer */}
          <div className="max-h-screen p-4 overflow-scroll flex-[5]">
            <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
          </div>
          {/* Chat component to chat with gpt */}
          <div className="flex-[3] border-l-4 border-l-slate-200">
            <ChatComponent chatId={parseInt(chatId)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

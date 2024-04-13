"use client";
import { DrizzleChat } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SubscriptionButton from "./SubscriptionButton";
import { Button } from "./ui/button";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isProMember: boolean;
};

const ChatSideBar = ({ chats, chatId, isProMember }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          Create New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href="/">Home</Link>
          <Link href="/">Source</Link>
        </div>
        <SubscriptionButton isProMember={isProMember} />
      </div>
    </div>
  );
};

export default ChatSideBar;

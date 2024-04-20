"use client";
import React, { useEffect, useState } from "react";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";
import { DrizzleChat } from "@/lib/db/schema";
import ChatSideBar from "@/components/ChatSideBar";

type Props = {
  pdf_url: string;
  chats: DrizzleChat[];
  chatId: number;
  isProMember: boolean;
};

const HandleViewing = ({ pdf_url, chatId, chats, isProMember }: Props) => {
  const [isMobileDisplay, setIsMobileDisplay] = useState(false);
  const [isOpenCounter, setIsOpenCounter] = useState(0);

  useEffect(() => {
    // Determine display type based on width
    const displayWidth = window.innerWidth;
    if (displayWidth <= 768) {
      setIsMobileDisplay(true);
    }
  }, []);

  return (
    <>
      {isMobileDisplay && (
        <>
          <div className="w-full flex py-6 justify-between items-center navbar bg-black z-10">
            <ul className="list-none flex justify-center items-start flex-1">
              <li
                className="font-normal cursor-pointer text-[16px] py-2 px-3 rounded-xl bg-gray-600 text-white hover:text-sky-400 mr-5"
                onClick={() => setIsOpenCounter(0)}
              >
                Select Pdf to Chat
              </li>
              <li
                className="font-normal cursor-pointer text-[16px] py-2 px-3 rounded-xl bg-gray-600 text-white hover:text-sky-400 mr-5"
                onClick={() => setIsOpenCounter(1)}
              >
                PDF
              </li>
              <li
                className="font-normal cursor-pointer text-[16px] py-2 px-3 rounded-xl bg-gray-600 text-white hover:text-sky-400 mr-5"
                onClick={() => setIsOpenCounter(2)}
              >
                CHAT
              </li>
            </ul>
          </div>
          <div className="w-full max-h-screen overflow-scroll">
            {isOpenCounter == 0 && (
              <div className="w-full">
                <ChatSideBar
                  chats={chats}
                  chatId={chatId}
                  isProMember={isProMember}
                />
              </div>
            )}
            {isOpenCounter == 1 && (
              <div className="max-h-screen p-4 overflow-scroll w-full bg-black">
                <PDFViewer pdf_url={pdf_url} />
              </div>
            )}
            {isOpenCounter == 2 && (
              <div className="w-full border-l-4 border-l-slate-200">
                <ChatComponent chatId={chatId} />
              </div>
            )}
          </div>
        </>
      )}

      {!isMobileDisplay && (
        <div className="flex w-full max-h-screen overflow-scroll">
          {/* Chats sidebar */}
          <div className="flex-[1] max-w-xs">
            <ChatSideBar
              chats={chats}
              chatId={chatId}
              isProMember={isProMember}
            />
          </div>

          {/* Main Pdf viewer */}
          <div className="max-h-screen p-4 overflow-scroll flex-[5]">
            <PDFViewer pdf_url={pdf_url} />
          </div>
          {/* Chat component to chat with gpt */}
          <div className="flex-[3] border-l-4 border-l-slate-200">
            <ChatComponent chatId={chatId} />
          </div>
        </div>
      )}
    </>
  );
};

export default HandleViewing;

import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const POST = async (req: Request) => {
  try {
    const request = await req.json();
    const _messages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, request.chatId));
    return NextResponse.json(_messages);
  } catch (error) {
    console.error("Error while fetching chat regarding this page", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
};

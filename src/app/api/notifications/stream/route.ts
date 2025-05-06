import { addClient, broadcast, getClientCount, removeClient } from "@/lib/notifications/sse-pubsub";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const clientId = uuidv4();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => controller.enqueue(encoder.encode(data));
      addClient(clientId, send);
      console.log("Connected clients:", getClientCount());

      req.signal.addEventListener("abort", () => {
        removeClient(clientId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    broadcast(body);
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

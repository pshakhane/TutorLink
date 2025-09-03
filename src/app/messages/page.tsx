"use client";

import Image from "next/image";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { conversations, messages } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[1]);

  const activeMessages = messages[selectedConversation.id as keyof typeof messages] || [];

  return (
    <div className="grid w-full min-h-[calc(100vh-8rem)] md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
      <div className="hidden flex-col border-r bg-card md:flex">
        <div className="flex h-[60px] items-center border-b px-6">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </div>
          <nav className="grid gap-1 px-4">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setSelectedConversation(convo)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all hover:bg-accent",
                  selectedConversation.id === convo.id && "bg-accent"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <div className="font-medium">{convo.name}</div>
                  <p className="text-xs text-muted-foreground truncate">
                    {convo.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end text-xs text-muted-foreground">
                  <span>{convo.lastMessageTime}</span>
                  {convo.unreadCount > 0 && (
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      {convo.unreadCount}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-[60px] items-center gap-4 border-b bg-card px-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
              <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">{selectedConversation.name}</h2>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {activeMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-3",
                  message.from === "me" && "flex-row-reverse"
                )}
              >
                {message.from === "other" && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                <Card
                  className={cn(
                    "max-w-[70%] rounded-2xl p-3",
                    message.from === "me"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary rounded-bl-none"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t bg-card p-4">
          <div className="relative">
            <Input placeholder="Type your message..." className="pr-20" />
            <Button type="submit" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

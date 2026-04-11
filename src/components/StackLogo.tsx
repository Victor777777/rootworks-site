"use client";

import { useState } from "react";

interface Props {
  name: string;
  slug?: string;
  color?: string;
}

export default function StackLogo({ name, slug, color = "1A1A1A" }: Props) {
  const [failed, setFailed] = useState(!slug);

  return (
    <div className="flex items-center gap-3 opacity-75 transition-opacity duration-300 hover:opacity-100">
      {!failed && slug ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/${color}`}
          alt={name}
          width={28}
          height={28}
          className="h-7 w-7"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card/70 font-heading text-[13px] text-text backdrop-blur-sm">
          {name.charAt(0)}
        </div>
      )}
      <span className="text-[14px] font-medium text-text">{name}</span>
    </div>
  );
}

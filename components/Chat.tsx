"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall, { Character } from "./StartCall";
import { ComponentRef, useRef, useState } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(null);

  const getConfigId = () => {
    return selectedCharacter === "arthur"
      ? "6eb190cd-d88a-4ce8-b87f-ec3da5db4f98"
      : "fcff0079-d758-4cae-bf21-3d4e59b819f8";
  };

  return (
    <div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
    >
      <VoiceProvider
        configId={getConfigId()}
        auth={{ type: "accessToken", value: accessToken }}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <Messages ref={ref} />
        <Controls />
        <StartCall onCharacterSelect={setSelectedCharacter} />
      </VoiceProvider>
    </div>
  );
}

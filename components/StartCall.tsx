import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { useState } from "react";

export type Character = "arthur" | "elizabeth" | null;

export default function StartCall({ 
  onCharacterSelect 
}: { 
  onCharacterSelect: (character: Character) => void 
}) {
  const { status, connect } = useVoice();
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(null);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    onCharacterSelect(character);
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={
            "fixed inset-0 p-4 flex flex-col items-center justify-center bg-background"
          }
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <div className="flex gap-4 mb-4">
            <Button
              variant={selectedCharacter === "arthur" ? "default" : "outline"}
              onClick={() => handleCharacterSelect("arthur")}
            >
              Arthur
            </Button>
            <Button
              variant={
                selectedCharacter === "elizabeth" ? "default" : "outline"
              }
              onClick={() => handleCharacterSelect("elizabeth")}
            >
              Elizabeth
            </Button>
          </div>
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center gap-1.5"}
                onClick={handleConnect}
                disabled={!selectedCharacter}
              >
                <span>
                  <Phone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span>Start Call</span>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingDots } from "@/components/ui/loading-dots";
import { cn } from "@/lib/utils";
import { agentConfig } from "@/services/AgentConfigService";
import type { AgentType } from "@/types/chat";

interface AgentResponseProps {
  agent: AgentType;
  response: string;
  isLoading?: boolean;
}

export function AgentResponse({ agent, response, isLoading = false }: AgentResponseProps) {
  const [isOpen, setIsOpen] = useState(true);
  const config = agentConfig.getConfig(agent);
  const Icon = config.icon;

  return (
    <div className="mb-2 w-full">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg bg-gradient-to-r p-2",
          config.gradientClass,
          "text-white transition-all duration-200 hover:opacity-90",
          "shadow-lg hover:shadow-xl",
        )}
        variant="ghost"
      >
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{config.label}</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "mt-1 rounded-b-lg p-3",
              "bg-white/80 dark:bg-gray-900/80",
              "backdrop-blur-lg backdrop-saturate-150",
              "border border-white/20 dark:border-gray-800/20",
              "shadow-lg shadow-black/5 dark:shadow-white/5",
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <LoadingDots className={config.loadingColor} />
              </div>
            ) : (
              <p className="text-sm text-gray-800 dark:text-gray-200">{response}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

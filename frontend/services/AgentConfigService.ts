import type { AgentType } from "@/types/chat";
import { Brain, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AgentConfig {
  icon: LucideIcon;
  label: string;
  gradientClass: string;
  loadingColor: string;
}

type AgentConfigs = Record<AgentType, AgentConfig>;

const configs: AgentConfigs = {
  PFC: {
    icon: Brain,
    label: "PFC Agent",
    gradientClass: "from-violet-500 to-purple-600",
    loadingColor: "bg-violet-500",
  },
  General: {
    icon: Globe,
    label: "General Agent",
    gradientClass: "from-blue-500 to-cyan-600",
    loadingColor: "bg-blue-500",
  },
} as const;

export function getConfig(type: AgentType): AgentConfig {
  return configs[type];
}

export function getTypes(): AgentType[] {
  return Object.keys(configs) as AgentType[];
}

export const agentConfig = {
  getConfig,
  getTypes,
} as const;

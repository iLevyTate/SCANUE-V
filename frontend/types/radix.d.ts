import "@radix-ui/react-tooltip";
import "@radix-ui/react-context-menu";

declare module "@radix-ui/react-tooltip" {
  interface TooltipProviderProps {
    children: React.ReactNode;
  }
}

declare module "@radix-ui/react-context-menu" {
  interface ContextMenuPortalProps {
    children: React.ReactNode;
  }
}

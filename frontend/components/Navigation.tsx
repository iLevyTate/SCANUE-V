"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, User, LogIn } from "lucide-react";
import { cn } from "@/utils/ui";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/chat", icon: MessageSquare, label: "Chat" },
  { href: "/account", icon: User, label: "Account" },
  { href: "/login", icon: LogIn, label: "Login" },
];

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg p-2 transition-colors",
        "hover:bg-accent hover:shadow-md",
        isActive && "font-medium text-primary",
      )}
    >
      <Icon className="nav-icon h-6 w-6" />
      <span className="nav-label text-xs">{label}</span>
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const isScrollingDown = useScrollDirection();

  return (
    <nav
      className={cn(
        "nav-container",
        "motion-safe:transition-transform motion-safe:duration-300",
        isScrollingDown && "-translate-y-full transform",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-around">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

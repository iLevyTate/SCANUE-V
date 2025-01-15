declare module "lodash" {
  export interface DebouncedFunc<T extends (...args: unknown[]) => unknown> {
    (...args: Parameters<T>): ReturnType<T>;
    cancel(): void;
    flush(): ReturnType<T>;
  }
}

declare module "lodash/debounce" {
  export interface DebouncedFunc<T extends (...args: unknown[]) => unknown> {
    (...args: Parameters<T>): ReturnType<T>;
    cancel(): void;
    flush(): ReturnType<T>;
  }

  export default function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait?: number,
    options?: {
      leading?: boolean;
      trailing?: boolean;
      maxWait?: number;
    },
  ): DebouncedFunc<T>;
}

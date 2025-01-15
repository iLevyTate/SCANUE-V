export interface MediaQueryList extends globalThis.MediaQueryList {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
}

export interface MediaQueryListEvent extends globalThis.MediaQueryListEvent {
  matches: boolean;
  media: string;
  type: "change";
}

import type * as React from "react";

declare module "react" {
  interface ReactElement<
    P = Record<string, unknown>,
    T extends string | React.JSXElementConstructor<P> = string | React.JSXElementConstructor<P>,
  > {
    type: T;
    props: P;
    key: React.Key | null;
  }
}

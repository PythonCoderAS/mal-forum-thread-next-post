declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare namespace JSX {
  interface IntrinsicElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [elemName: string]: any;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
declare function GM_setValue(
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number | Record<string, any>
): void;

// eslint-disable-next-line @typescript-eslint/naming-convention
declare function GM_getValue(
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): string | number | Record<string, any> | undefined;

// eslint-disable-next-line no-redeclare, @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any
declare function GM_getValue<T extends string | number | Record<string, any>>(
  name: string,
  defaultValue: T
): T;

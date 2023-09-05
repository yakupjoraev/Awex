import { PropsWithChildren } from "react";

export type MyActivesChecksProps = PropsWithChildren<{}>;

export function MyActivesChecks(props: MyActivesChecksProps) {
  return <ul className="my-actives__checks">{props.children}</ul>;
}

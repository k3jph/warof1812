import type { AnchorHTMLAttributes } from "react";

type SafeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * A plain document link. Keeping navigation independent of the client router
 * makes every route usable before hydration, with JavaScript disabled, and in
 * authenticated embedded views that may block SPA navigation requests.
 */
export default function SafeLink({ href, ...props }: SafeLinkProps) {
  return <a href={href} {...props} />;
}

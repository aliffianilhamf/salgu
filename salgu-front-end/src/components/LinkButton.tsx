import Link from "next/link";
import { Button as ButtonBootstrap, ButtonProps } from "react-bootstrap";

interface Props extends ButtonProps {
  href: string;
}

/**
 * Button for links.
 *
 * Use this when you want a link that looks like a button.
 */
export default function LinkButton({ href, ...props }: Props) {
  return (
    <Link href={href} passHref legacyBehavior>
      <ButtonBootstrap {...props} />
    </Link>
  );
}

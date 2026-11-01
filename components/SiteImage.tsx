import Image, { type ImageProps } from "next/image";

// Local images go through the Next image optimizer. Uploaded images
// (full https URLs) are shown as-is so any host works.
export function SiteImage(props: ImageProps & { src: string }) {
  const remote = props.src.startsWith("http");
  return <Image {...props} alt={props.alt} unoptimized={remote || props.unoptimized} />;
}

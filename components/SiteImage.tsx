import Image, { type ImageProps } from "next/image";

// Local raster images go through the Next image optimizer. Uploaded images
// (full https URLs) and SVGs are shown as-is.
export function SiteImage(props: ImageProps & { src: string }) {
  const asIs = props.src.startsWith("http") || props.src.endsWith(".svg");
  return <Image {...props} alt={props.alt} unoptimized={asIs || props.unoptimized} />;
}

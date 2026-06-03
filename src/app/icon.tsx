import { ImageResponse } from "next/og";
import { brandIconMarkup } from "@/lib/brand-icon-markup";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(brandIconMarkup(size.width), { ...size });
}

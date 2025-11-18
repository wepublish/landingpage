type MetaPixelFallbackProps = {
  pixelId?: string;
};

export function MetaPixelFallback({ pixelId }: MetaPixelFallbackProps) {
  if (!pixelId) return null;

  const encodedPixelId = encodeURIComponent(pixelId);
  const src = `https://www.facebook.com/tr?id=${encodedPixelId}&ev=PageView&noscript=1`;

  return (
    <noscript>
      <img height="1" width="1" style={{ display: "none" }} src={src} alt="" />
    </noscript>
  );
}

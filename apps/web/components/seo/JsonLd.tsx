type JsonLdProps = {
  data:
    | Record<string, unknown>
    | Array<Record<string, unknown> | null | undefined>
    | null
    | undefined;
};

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const payload = Array.isArray(data)
    ? data.filter((item): item is Record<string, unknown> => !!item)
    : data;
  if (Array.isArray(payload) && payload.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}

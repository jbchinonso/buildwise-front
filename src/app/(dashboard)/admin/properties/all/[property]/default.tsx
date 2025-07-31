export default async function Default({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}

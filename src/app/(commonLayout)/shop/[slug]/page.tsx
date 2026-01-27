const DetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div>
      <div></div>
    </div>
  );
};

export default DetailsPage;

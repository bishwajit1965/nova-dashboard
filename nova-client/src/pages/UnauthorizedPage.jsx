const UnauthorizedPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="mt-4 text-gray-600">
        You do not have permission to view this page.
      </p>
    </div>
  );
};

export default UnauthorizedPage;

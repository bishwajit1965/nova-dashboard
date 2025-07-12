import API_PATHS from "../../../common/apiPaths/apiPaths";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import Pagination from "../../../pagination/Pagination";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useApiQuery } from "../../../common/hooks/useApiQuery";
import { useState } from "react";

const AdminNewsletterList = () => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const {
    data: newsLetters,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.NEWS_LETTER.ENDPOINT,
    queryKey: API_PATHS.NEWS_LETTER.KEY,
  });
  const [paginatedData, setPaginatedData] = useState(newsLetters || []);

  const { mutate: deleteNewsletter } = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.NEWS_LETTER.ENDPOINT}/${id}`,
    key: API_PATHS.NEWS_LETTER.KEY,
    onSuccess: () => {
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast.error("Error deleting permission");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  console.log("News Letter", newsLetters);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center">
        <p>{isError.message}</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center">
        <p>{error.message}</p>
      </div>
    );
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Subscribed At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <div className="flex justify-center">No newsLetters!</div>
            ) : (
              paginatedData.map((nl, i) => (
                <tr key={nl._id}>
                  <th>{i + 1}</th>
                  <td>{nl?.email}</td>
                  <td>{new Date(nl.subscribedAt).toLocaleDateString()}</td>
                  <td className="flex items-center space-x-2">
                    <MiniIconButton
                      onClick={() => setConfirmDelete(nl)}
                      variant="danger"
                      icon="delete"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* pagination begins*/}
        <Pagination
          items={newsLetters}
          onPaginatedDataChange={setPaginatedData}
        />

        {/* Newsletter Delete Confirm Dialogue */}
        {confirmDelete && (
          <ConfirmDialog
            isOpen={confirmDelete}
            onClose={() => setConfirmDelete(null)}
            onConfirm={() => deleteNewsletter(confirmDelete._id)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminNewsletterList;

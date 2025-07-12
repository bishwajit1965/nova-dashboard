import API_PATHS from "../../../common/apiPaths/apiPaths";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import Modal from "../../../components/ui/Modal";
import Pagination from "../../../pagination/Pagination";
import StarRating from "../../../components/ui/StartRating";
import TestimonialForm from "../../../components/testimonials/TestimonialForm";
import toast from "react-hot-toast";
import { useApiMutation } from "../../../common/hooks/useApiMutation";
import { useApiQuery } from "../../../common/hooks/useApiQuery";
import { useState } from "react";

const AdminTestimonialsPage = () => {
  const [testimonialData, setTestimonialData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [displayTestimonial, setDisplayTestimonial] = useState(null);
  const [viewCard, setViewCard] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const {
    data: testimonials,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.TESTIMONIALS.ENDPOINT,
    queryKey: API_PATHS.TESTIMONIALS.KEY,
  });

  const [paginatedData, setPaginatedData] = useState(testimonials || []);

  const { mutate: deleteTestimonial } = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.TESTIMONIALS.ENDPOINT}/${id}`,
    key: API_PATHS.TESTIMONIALS.KEY,
    onSuccess: () => {
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast.error("Error deleting permission");
      setConfirmDelete(null);
      console.error(error);
    },
  });

  const handLeView = (t) => {
    setDisplayTestimonial(t);
    setViewCard(true);
  };

  const handleEdit = (t) => {
    setTestimonialData(t);
    setShowForm(true);
  };

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
              <th>Author Name</th>
              <th>Job Title</th>
              <th>Rating</th>
              <th>Message Content</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <div className="flex justify-center">No testimonials yet.</div>
            ) : (
              paginatedData.map((t, i) => (
                <tr key={t._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={t.avatarUrl} alt={t.authorName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{t.authorName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {t.authorTitle}
                    </span>
                  </td>
                  <td>{t.rating}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {t.content}
                    </button>
                  </th>
                  <td className="flex items-center space-x-2">
                    <MiniIconButton
                      onClick={() => handleEdit(t)}
                      icon="edit"
                      variant="primary"
                    />
                    <MiniIconButton
                      onClick={() => handLeView(t)}
                      icon="view"
                      variant="success"
                    />
                    <MiniIconButton
                      onClick={() => setConfirmDelete(t)}
                      icon="delete"
                      variant="danger"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Author Name</th>
              <th>Job Title</th>
              <th>Rating</th>
              <th>Message Content</th>
              <th>Action</th>
              <th></th>
            </tr>
          </tfoot>
        </table>

        {/* pagination begins*/}
        <Pagination
          items={testimonials}
          onPaginatedDataChange={setPaginatedData}
        />
        {/* Testimonial & Modal with Form */}
        {showForm && (
          <Modal
            isOpen={testimonialData}
            onClose={() => setShowForm(false)}
            title={testimonialData ? "Update Testimonial" : "Add Testimonial"}
          >
            <TestimonialForm
              editData={testimonialData}
              onSuccess={testimonialData}
              onCancel={() => setShowForm(false)}
            />
          </Modal>
        )}
        {viewCard && (
          <Modal
            isOpen={displayTestimonial}
            onClose={() => setViewCard(false)}
            title={
              displayTestimonial
                ? `Testimonial by- ${displayTestimonial.authorName} `
                : " "
            }
          >
            <div className="flex justify-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <img
                    src={displayTestimonial.avatarUrl}
                    className="rounded-full w-20 h-20"
                    alt=""
                  />
                </div>
                <div className="font-bold italic text-center">
                  {displayTestimonial.authorName}
                </div>
                <div className="font-bold italic text-center">
                  {displayTestimonial.authorTitle}
                </div>
                <div className="font-bold text-sm italic text-center w-full">
                  <StarRating rating={displayTestimonial.rating} />
                </div>
                <div className="font-bold text-md italic text-center w-full text-base-content">
                  {displayTestimonial.content}
                </div>
                <div className="font-bold text-md italic text-center w-full text-base-content">
                  Uploaded on:{" "}
                  {new Date(displayTestimonial.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* Testimonial Delete Confirm Dialogue */}
        {confirmDelete && (
          <ConfirmDialog
            isOpen={confirmDelete}
            onClose={() => setConfirmDelete(null)}
            onConfirm={() => deleteTestimonial(confirmDelete._id)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;

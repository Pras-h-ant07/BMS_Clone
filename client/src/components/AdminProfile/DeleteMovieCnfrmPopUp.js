import { Modal, message } from "antd";
import { deleteMovie } from "../../services/movies";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function DeleteMovieCnfrmPopUp({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
}) {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const id = selectedMovie._id;
      const response = await deleteMovie({ id });
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
        setSelectedMovie(null);
      }
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
      window.location.reload();
    } catch (error) {
      dispatch(hideLoading);
      setIsDeleteModalOpen(false);
      message.error(error.messagae);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <Modal
        title="Delete Movie?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this movie?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this movie data.
        </p>
      </Modal>
    </>
  );
}

export default DeleteMovieCnfrmPopUp;

import { useState } from "react";
import UpdatePlantModal from "../../Modal/UpdatePlantModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const PlantDataRow = ({ mobile }) => {
  const axiosSecure = useAxiosSecure();
  // console.log(bookData);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //myInventory delete work

  const { name, image, category, quantity, price, _id } = mobile;
  const handleInventoryDelete = (id) => {
    // console.log(id);
    //sweet alert work
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-books/${id}`).then((res) => {
          // console.log(res.data);

          if (res.data.deletedCount) {
            // refresh the data in the ui

            Swal.fire({
              title: "Deleted!",
              text: "Your Book request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img alt="profile" src={image} className="mx-auto object-cover rounded h-10 w-15 " />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          // onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-amber-500 opacity-50 rounded-full"
          ></span>
          <span onClick={() => handleInventoryDelete(_id)} className="relative">
            Delete
          </span>
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-blue-500 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdatePlantModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          mobile={mobile}
        />
      </td>
    </tr>
  );
};

export default PlantDataRow;
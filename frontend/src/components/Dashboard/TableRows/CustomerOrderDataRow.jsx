import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerOrderDataRow = ({ order, refetch }) => { // refetch add kora hoyeche
  const axiosSecure = useAxiosSecure();
  const { image, name, category, price, quantity, status, _id } = order;

  const handleMyOrdersData = async (id) => {
   Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
       
          const res = await axiosSecure.delete(`/orders/${id}`);
          
          if (res.data.deletedCount > 0) {
            refetch(); 
            Swal.fire("Deleted!", "Order has been deleted.", "success");
          }
        } catch (err) {
          // console.log(err);
          // Swal.fire("Error!", "Delete failed. Check console.", "error");
         location.reload()
        }
      }
    });
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <img alt={name} src={image} className="w-12 h-12 rounded-full object-cover" />
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className={`px-2 py-1 rounded-full text-xs ${status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'}`}>
            {status}
        </span>
      </td>

    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleMyOrdersData(_id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <MdDelete size={24} />
        </button>
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
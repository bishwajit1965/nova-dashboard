import { SquarePen, UserPen } from "lucide-react";

const UserSettings = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
        <UserPen size={25} style={{ fontWeight: "bold", marginRight: "8px" }} />
        User Settings
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <SquarePen
            size={20}
            style={{ marginRight: "6px", fontWeight: "bold" }}
          />{" "}
          Update Settings
        </button>
      </form>
    </div>
  );
};

export default UserSettings;

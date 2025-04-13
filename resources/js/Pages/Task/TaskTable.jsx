import {

  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import SortableHeader from "@/Components/SortableHeader";
import { Link, router } from "@inertiajs/react";


export default function TaskTable({ tasks, queryParams = null}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      // Jika ada nilai (value) yang dimasukkan, tambahkan ke queryParams
      queryParams[name] = value;
    } else {
      // Jika tidak ada nilai (misalnya input dikosongkan), hapus key dari queryParams
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    // Jika tombol yang ditekan adalah 'Enter', maka lakukan pencarian
    if (e.key === "Enter") {
      // Update queryParams dengan nilai input jika tombol 'Enter' ditekan
      searchFieldChanged(name, e.target.value);
    }
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_order === "asc") {
        queryParams.sort_order = "desc";
      } else {
        queryParams.sort_order = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_order = "asc";
    }
    router.get(route("task.index"), queryParams);
  };
  return (
    <>
      <div className="overflow-auto ">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:text-gray-300 dark:bg-gray-700">
            <tr>
              <SortableHeader
                label="ID"
                sortKey="id"
                currentSortField={queryParams.sort_field}
                currentSortOrder={queryParams.sort_order}
                onSort={sortChanged}
              />
              <th className="px-6 py-4">Image</th>

              <SortableHeader
                label="Name"
                sortKey="name"
                currentSortField={queryParams.sort_field}
                currentSortOrder={queryParams.sort_order}
                onSort={sortChanged}
              />

              <SortableHeader
                label="Status"
                sortKey="status"
                currentSortField={queryParams.sort_field}
                currentSortOrder={queryParams.sort_order}
                onSort={sortChanged}
                extraClasses="min-w-40"
              />

              <SortableHeader
                label="Create Date"
                sortKey="created_at"
                currentSortField={queryParams.sort_field}
                currentSortOrder={queryParams.sort_order}
                onSort={sortChanged}
              />

              <SortableHeader
                label="Due Date"
                sortKey="due_date"
                currentSortField={queryParams.sort_field}
                currentSortOrder={queryParams.sort_order}
                onSort={sortChanged}
              />

              <th className="px-6 py-4">Created By</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:text-gray-300 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4">
                <TextInput
                  className="w-full "
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={(e) =>
                    // Saat kehilangan fokus, kita kirim data ke fungsi `searchFieldChanged`
                    // untuk cari proyek berdasarkan nama yang sudah diketik
                    searchFieldChanged("name", e.target.value)
                  }
                  onKeyPress={(e) =>
                    // Saat tombol dipencet, kita kirim nama field 'name' dan event key-nya
                    onKeyPress("name", e)
                  }
                />
              </th>
              <th className="px-6 py-4">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.data.map((task) => (
              <tr
                key={task.id}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {task.id}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={task.image_path}
                    alt={task.name}
                    className="object-cover w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {task.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={
                      "px-3 py-1 rounded-full text-xs font-medium " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {task.created_at}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {task.due_date}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {task.createdBy.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={route("task.edit", task.id)}
                      className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Pencil size={18} />
                    </Link>
                    <Link
                      href={route("task.destroy", task.id)}
                      className="text-gray-600 transition-colors dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </Link>
                    <Link className="text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      <MoreHorizontal size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      <Pagination links={tasks.meta.links} />
    </>
  );
}

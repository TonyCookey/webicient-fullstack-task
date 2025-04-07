export default function TaskCard({ task }: { task: any }) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200 mb-4">
      <h4 className="text-lg font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Status: {task.status}</span>
        {task.dueDate && (
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>
    </div>
    )
  }
  
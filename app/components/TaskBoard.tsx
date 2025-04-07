import { useState } from 'react'
import TaskCard from './TaskCard'
import FormModal from './FormModal'

export default function TaskBoard({ tasks, projectId }: { tasks: any[], projectId: string }) {
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskList, setTaskList] = useState(tasks)

  const handleNewTask = () => {
    setEditingTask(null)
    setShowModal(true)
  }

  const handleSubmit = async (task: any) => {
    const token = localStorage.getItem('token')
    const method = task.id ? 'PUT' : 'POST'
    const url = task.id ? `/api/tasks/${task.id}` : '/api/tasks'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(task)
    })

    if (res.ok) {
      const updated = await res.json()
      const updatedList = task.id
        ? taskList.map((t) => (t.id === updated.id ? updated : t))
        : [...taskList, updated]
      setTaskList(updatedList)
    }

    setShowModal(false)
  }

  const handleEdit = (task: any) => {
    setEditingTask(task)
    setShowModal(true)
  }

  const columns = ['todo', 'in-progress', 'done']

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleNewTask}>
          + Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((status) => (
          <div key={status}>
            <h2 className="text-lg font-semibold capitalize mb-2">{status.replace('-', ' ')}</h2>
            <div className="space-y-2">
              {taskList
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task.id} onClick={() => handleEdit(task)}>
                    <TaskCard task={task} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <FormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={editingTask}
        projectId={projectId}
        type='task'
      />
    </div>
  )
}

// components/FormModal.tsx
'use client'
import { useState, useEffect } from 'react'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
  type: 'task' | 'project'
  projectId?: string // Only needed for task
}
type TaskFormData = {
    title: string
    description: string
    status?: string
    dueDate?: string
    project_id?: string
    id?: string
  }
  
  type ProjectFormData = {
    title: string
    description: string
    id?: string
  }
  
export default function FormModal({ isOpen, onClose, onSubmit, initialData, type, projectId }: FormModalProps) {
  const isTask = type === 'task'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('todo')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setDescription(initialData.description || '')
      setStatus(initialData.status || 'todo')
      setDueDate(initialData.dueDate?.slice(0, 10) || '')
    } else {
      setTitle('')
      setDescription('')
      setStatus('todo')
      setDueDate('')
    }
  }, [initialData, isOpen])

  const handleSubmit = () => {
    let data: TaskFormData | ProjectFormData = {
      title,
      description,
      ...(isTask ? { status, dueDate, project_id: projectId } : {})
    }
  
    if (initialData?.id) {
      data = { ...data, id: initialData.id }
    }
  
    onSubmit(data)
  }
  

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl mb-4">{initialData ? `Edit ${type}` : `New ${type}`}</h2>
        <input className="border p-2 w-full mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="border p-2 w-full mb-4" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {isTask && (
          <>
            <select className="border p-2 w-full mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <input type="date" className="border p-2 w-full mb-4" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </>
        )}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}

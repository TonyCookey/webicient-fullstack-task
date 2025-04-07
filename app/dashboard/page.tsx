'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FormModal from '../components/FormModal'
import { Project } from '@prisma/client'
import LogoutButton from '../components/LogoutButton'

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetch('/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then(setProjects)
  }, [])

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setShowModal(true)
  }

  const handleSubmit = async (project: any) => {
    const token = localStorage.getItem('token')
    const method = project.id ? 'PUT' : 'POST'
    const url = project.id ? `/api/projects/${project.id}` : '/api/projects'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(project)
    })

    if (res.ok) {
      const updated = await res.json()
      const updatedList = project.id
        ? projects.map((p) => (p.id === updated.id ? updated : p))
        : [...projects, updated]
      setProjects(updatedList)
    }

    setShowModal(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <div className="flex gap-4 items-center">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => {
          setEditingProject(null)
          setShowModal(true)
        }}>
          + Add Project
        </button>
        <LogoutButton/>
        </div>
       
      </div>

      <div className="grid gap-4">
        {projects.map((project: any) => (
          <div
            key={project.id}
            className="border p-4 rounded-md shadow hover:cursor-pointer hover:bg-gray-50 transition"
            onClick={() => router.push(`/project/${project.id}`)}
            onDoubleClick={(e) => {
              e.stopPropagation()
              handleEdit(project)
            }}
          >
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>

      <FormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={editingProject}
        type="project"
      />
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TaskBoard from '@/app/components/TaskBoard'
import { Project, Task } from '@prisma/client'
import LogoutButton from '@/app/components/LogoutButton'


export default function ProjectPage() {
  const router = useRouter()
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const fetchData = async () => {
      const projectRes = await fetch(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const taskRes = await fetch(`/api/tasks?projectId=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (projectRes.ok && taskRes.ok) {
        const projectData = await projectRes.json()
        const taskData = await taskRes.json()
        setProject(projectData)
        setTasks(taskData)
      } else {
        router.push('/dashboard')
      }
    }

    fetchData()
  }, [id])

  if (!project) return <div className="p-6">Loading project...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <LogoutButton />
      </div>
      <p className="mb-6 text-gray-700">{project.description}</p>
      <TaskBoard tasks={tasks} projectId={project.id} />
    </div>

  )
}

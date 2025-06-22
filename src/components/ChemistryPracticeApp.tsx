'use client'

import { useState } from 'react'
import SetupForm from './SetupForm'
import QuestionInterface from './QuestionInterface'

export interface StudentSettings {
  level: 'havo' | 'vwo'
  year: number
  topic: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
  difficulty: string
}

export default function ChemistryPracticeApp() {
  const [settings, setSettings] = useState<StudentSettings | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = (studentSettings: StudentSettings) => {
    setSettings(studentSettings)
    setIsStarted(true)
  }

  const handleReset = () => {
    setSettings(null)
    setIsStarted(false)
  }

  if (!isStarted || !settings) {
    return <SetupForm onStart={handleStart} />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <QuestionInterface 
        settings={settings} 
        onReset={handleReset}
      />
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { StudentSettings, Question } from './ChemistryPracticeApp'
import MarkdownRenderer from './MarkdownRenderer'

interface QuestionInterfaceProps {
  settings: StudentSettings
  onReset: () => void
}

type QuestionState = 'answering' | 'correct' | 'incorrect' | 'guidance'

export default function QuestionInterface({ settings, onReset }: QuestionInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [questionState, setQuestionState] = useState<QuestionState>('answering')
  const [isLoading, setIsLoading] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [feedback, setFeedback] = useState<string>('')
  const [guidanceStep, setGuidanceStep] = useState<number>(0)
  const [guidanceMessages, setGuidanceMessages] = useState<string[]>([])

  useEffect(() => {
    generateNewQuestion()
  }, [])

  const generateNewQuestion = async () => {
    setIsLoading(true)
    setQuestionState('answering')
    setSelectedAnswer(null)
    setFeedback('')
    setGuidanceStep(0)
    setGuidanceMessages([])

    try {
      const prompt = `Genereer een scheikunde multiple choice vraag voor ${settings.level.toUpperCase()} jaar ${settings.year} over het onderwerp "${settings.topic}".

De vraag moet:
- Geschikt zijn voor het niveau (${settings.level.toUpperCase()} jaar ${settings.year})
- Gaan over: ${settings.topic}
- 4 antwoordmogelijkheden hebben (A, B, C, D)
- Duidelijk en ondubbelzinnig zijn
- Een goede uitleg hebben waarom het antwoord correct is

Geef het antwoord in dit exacte JSON formaat:
{
  "question": "De vraag hier...",
  "options": ["A. Optie 1", "B. Optie 2", "C. Optie 3", "D. Optie 4"],
  "correctAnswer": 0,
  "explanation": "Uitleg waarom dit antwoord correct is...",
  "topic": "${settings.topic}",
  "difficulty": "${settings.level}_year_${settings.year}"
}`

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          aiModel: 'smart'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate question')
      }

      const data = await response.json()
      
      // Parse JSON from response
      const jsonMatch = data.response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const questionData = JSON.parse(jsonMatch[0])
        const question: Question = {
          id: Date.now().toString(),
          ...questionData
        }
        setCurrentQuestion(question)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error generating question:', error)
      // Fallback vraag
      setCurrentQuestion({
        id: Date.now().toString(),
        question: "Wat is de chemische formule van water?",
        options: ["A. H2O", "B. CO2", "C. NaCl", "D. CH4"],
        correctAnswer: 0,
        explanation: "Water heeft de chemische formule H2O, bestaande uit 2 waterstofatomen en 1 zuurstofatoom.",
        topic: settings.topic,
        difficulty: `${settings.level}_year_${settings.year}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (questionState !== 'answering') return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !currentQuestion) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    setScore(prev => ({ 
      correct: prev.correct + (isCorrect ? 1 : 0), 
      total: prev.total + 1 
    }))

    if (isCorrect) {
      setQuestionState('correct')
      setFeedback(currentQuestion.explanation)
    } else {
      setQuestionState('incorrect')
      await generateSocraticGuidance()
    }
  }

  const generateSocraticGuidance = async () => {
    if (!currentQuestion) return

    try {
      const wrongAnswer = currentQuestion.options[selectedAnswer!]
      const correctAnswer = currentQuestion.options[currentQuestion.correctAnswer]

      const prompt = `Een leerling (${settings.level.toUpperCase()} jaar ${settings.year}) heeft de volgende scheikunde vraag fout beantwoord:

Vraag: ${currentQuestion.question}
Gegeven antwoord: ${wrongAnswer}
Correct antwoord: ${correctAnswer}

Geef socratische begeleiding om de leerling stap voor stap naar het juiste antwoord te leiden. Gebruik geen directe antwoorden, maar stel vragen die de leerling aan het denken zetten.

Geef 3-4 begeleidende vragen/hints in dit formaat:
1. [Eerste hint/vraag]
2. [Tweede hint/vraag]  
3. [Derde hint/vraag]
4. [Finale uitleg]

Maak het geschikt voor het niveau van de leerling.`

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          aiModel: 'smart'
        })
      })

      if (response.ok) {
        const data = await response.json()
        const guidance = data.response.split(/\d+\./).filter((item: string) => item.trim())
        setGuidanceMessages(guidance.map((msg: string) => msg.trim()))
        setQuestionState('guidance')
      }
    } catch (error) {
      console.error('Error generating guidance:', error)
      setFeedback("Dat is niet het juiste antwoord. Probeer nog eens na te denken over de eigenschappen van de stoffen in de vraag.")
    }
  }

  const showNextGuidance = () => {
    if (guidanceStep < guidanceMessages.length - 1) {
      setGuidanceStep(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    generateNewQuestion()
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Nieuwe vraag wordt gegenereerd...</p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <p className="text-red-600">Er is een fout opgetreden bij het laden van de vraag.</p>
          <button 
            onClick={generateNewQuestion}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Probeer opnieuw
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header met score en instellingen */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{settings.level.toUpperCase()}</span> • 
              <span className="ml-1">Jaar {settings.year}</span> • 
              <span className="ml-1">{settings.topic}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="font-semibold text-green-600">{score.correct}</span>
              <span className="text-gray-500">/{score.total}</span>
              {score.total > 0 && (
                <span className="ml-2 text-blue-600">
                  ({Math.round((score.correct / score.total) * 100)}%)
                </span>
              )}
            </div>
            
            <button
              onClick={onReset}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Nieuwe sessie
            </button>
          </div>
        </div>
      </div>

      {/* Vraag interface */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={questionState !== 'answering'}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : questionState === 'answering'
                    ? 'border-gray-200 hover:border-blue-300'
                    : index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : selectedAnswer === index
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                }`}
              >
                {option}
                {questionState !== 'answering' && index === currentQuestion.correctAnswer && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
                {questionState !== 'answering' && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                  <span className="ml-2 text-red-600">✗</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        {questionState === 'answering' && (
          <div className="flex justify-center">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              Controleer Antwoord
            </button>
          </div>
        )}

        {/* Feedback sectie */}
        {questionState === 'correct' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🎉</span>
              <h3 className="text-lg font-semibold text-green-800">Correct!</h3>
            </div>
            <MarkdownRenderer content={feedback} className="text-green-700" />
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Volgende Vraag
            </button>
          </div>
        )}

        {questionState === 'incorrect' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🤔</span>
              <h3 className="text-lg font-semibold text-red-800">Niet helemaal juist...</h3>
            </div>
            <p className="text-red-700 mb-4">
              Laten we samen kijken hoe je tot het juiste antwoord kunt komen!
            </p>
          </div>
        )}

        {questionState === 'guidance' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">💡</span>
              <h3 className="text-lg font-semibold text-yellow-800">Laten we samen nadenken...</h3>
            </div>
            
            {guidanceMessages.slice(0, guidanceStep + 1).map((message, index) => (
              <div key={index} className="mb-3 p-3 bg-white rounded border-l-4 border-yellow-400">
                <MarkdownRenderer content={message} className="text-gray-700" />
              </div>
            ))}
            
            <div className="flex space-x-3 mt-4">
              {guidanceStep < guidanceMessages.length - 1 ? (
                <button
                  onClick={showNextGuidance}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Volgende Hint
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Volgende Vraag
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
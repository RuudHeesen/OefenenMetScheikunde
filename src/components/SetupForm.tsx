'use client'

import { useState } from 'react'
import { StudentSettings } from './ChemistryPracticeApp'

interface SetupFormProps {
  onStart: (settings: StudentSettings) => void
}

const CHEMISTRY_TOPICS = [
  'Atoomstructuur en periodiek systeem',
  'Chemische binding',
  'Stoichiometrie en molrekenen',
  'Zuren en basen',
  'Redoxreacties',
  'Organische chemie',
  'Thermochemie',
  'Reactiesnelheid en evenwicht',
  'Elektrochemie',
  'Polymeren en biomoleculen'
]

export default function SetupForm({ onStart }: SetupFormProps) {
  const [level, setLevel] = useState<'havo' | 'vwo'>('havo')
  const [year, setYear] = useState<number>(4)
  const [topic, setTopic] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic) {
      onStart({ level, year, topic })
    }
  }

  const getAvailableYears = () => {
    return level === 'havo' ? [4, 5] : [4, 5, 6]
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Stel je oefensessie in
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Niveau selectie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Welk niveau volg je?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setLevel('havo')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  level === 'havo'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-lg font-semibold">HAVO</div>
                <div className="text-sm text-gray-600">Hoger Algemeen Voortgezet Onderwijs</div>
              </button>
              
              <button
                type="button"
                onClick={() => setLevel('vwo')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  level === 'vwo'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-lg font-semibold">VWO</div>
                <div className="text-sm text-gray-600">Voorbereidend Wetenschappelijk Onderwijs</div>
              </button>
            </div>
          </div>

          {/* Leerjaar selectie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Welk leerjaar zit je in?
            </label>
            <div className="flex space-x-3">
              {getAvailableYears().map((yearOption) => (
                <button
                  key={yearOption}
                  type="button"
                  onClick={() => setYear(yearOption)}
                  className={`px-6 py-3 rounded-lg border-2 transition-all ${
                    year === yearOption
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-lg font-semibold">Jaar {yearOption}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Onderwerp selectie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Over welk onderwerp wil je oefenen?
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Kies een onderwerp...</option>
              {CHEMISTRY_TOPICS.map((topicOption) => (
                <option key={topicOption} value={topicOption}>
                  {topicOption}
                </option>
              ))}
            </select>
          </div>

          {/* Start knop */}
          <button
            type="submit"
            disabled={!topic}
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
          >
            🧪 Start Oefenen
          </button>
        </form>

        {/* Info sectie */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Hoe werkt het?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Je krijgt multiple choice vragen op jouw niveau</li>
            <li>• Bij een goed antwoord krijg je directe feedback</li>
            <li>• Bij een fout antwoord word je stap voor stap naar het goede antwoord geleid</li>
            <li>• De AI past de vragen aan op basis van jouw prestaties</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
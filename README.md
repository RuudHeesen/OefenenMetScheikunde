# 🧪 Scheikunde Oefenen - AI Powered Learning

> **Een intelligente scheikunde oefenapp voor HAVO en VWO leerlingen**
>
> **Gemaakt door Tom Naberink**

Een geavanceerde Next.js app die AI gebruikt om gepersonaliseerde scheikunde vragen te genereren. Leerlingen kunnen hun niveau kiezen, onderwerpen selecteren en krijgen socratische begeleiding bij foute antwoorden.

## ✨ Features

### 🎯 **Gepersonaliseerd Leren**
- 📚 **Niveau selectie**: HAVO (jaar 4-5) en VWO (jaar 4-6)
- 🎓 **Leerjaar aanpassing**: Vragen aangepast aan het specifieke leerjaar
- 📖 **Onderwerp keuze**: 10+ scheikunde onderwerpen beschikbaar
- 🤖 **AI-gegenereerde vragen**: Unieke multiple choice vragen per sessie

### 💡 **Intelligente Feedback**
- ✅ **Directe feedback**: Bij goede antwoorden krijg je uitleg waarom het correct is
- 🤔 **Socratische begeleiding**: Bij foute antwoorden word je stap voor stap naar het juiste antwoord geleid
- 📊 **Score tracking**: Houd je voortgang bij tijdens de oefensessie
- 🎯 **Adaptief leren**: AI past vragen aan op basis van je niveau

### 🎨 **Gebruiksvriendelijke Interface**
- 📱 **Responsive design**: Werkt perfect op alle apparaten
- 🎨 **Moderne UI**: Strakke interface met duidelijke feedback
- ⚡ **Snelle responses**: Optimaal gebruik van Gemini AI
- 🔄 **Eenvoudige navigatie**: Intuïtieve flow van setup naar oefenen

## 🚀 Quick Start

### Stap 1: 🔑 API Key Verkrijgen
Ga naar [Google AI Studio](https://makersuite.google.com/app/apikey) om je gratis Gemini API key aan te maken.

### Stap 2: 🛠️ Project Setup
```bash
# Clone het project
git clone [repository-url]
cd scheikunde-oefenen

# Dependencies installeren
npm install

# Environment variables
cp .env.example .env.local
# Edit .env.local en voeg je API key toe
```

### Stap 3: 🔧 Environment Configuration
Maak `.env.local` aan met je API key:

```env
# VEREIST: Voor alle AI functionaliteiten
GEMINI_API_KEY=your_gemini_api_key_here
```

### Stap 4: 🎉 Start & Test
```bash
npm run dev
# Open http://localhost:3000
# Kies je niveau en begin met oefenen!
```

### Stap 5: 🚀 Deploy naar Netlify
1. **In Bolt.new**: "Deploy to Netlify"
2. **Environment Variables toevoegen** in Netlify dashboard:
   - `GEMINI_API_KEY` (vereist voor alle functionaliteiten)
3. **Deploy** en je app is live!

## 📚 Beschikbare Onderwerpen

De app biedt vragen over deze scheikunde onderwerpen:

1. **Atoomstructuur en periodiek systeem**
2. **Chemische binding**
3. **Stoichiometrie en molrekenen**
4. **Zuren en basen**
5. **Redoxreacties**
6. **Organische chemie**
7. **Thermochemie**
8. **Reactiesnelheid en evenwicht**
9. **Elektrochemie**
10. **Polymeren en biomoleculen**

## 🎓 Voor Docenten

### 📊 **Educatieve Voordelen**
- 🎯 **Gepersonaliseerd leren**: Elke leerling krijgt vragen op zijn/haar niveau
- 🤖 **AI-begeleiding**: Socratische methode helpt leerlingen zelf tot antwoorden te komen
- 📈 **Directe feedback**: Leerlingen zien meteen waar ze staan
- 🔄 **Onbeperkte vragen**: AI genereert steeds nieuwe, unieke vragen

### 🏫 **Classroom Integration**
```bash
# Voor gebruik in de klas:
1. Leerlingen gaan naar de live URL
2. Iedereen kiest zijn eigen niveau en onderwerp
3. Docent kan meekijken en ondersteunen waar nodig
4. Resultaten kunnen besproken worden in de klas
```

## 🛠️ Technical Architecture

### 📂 **Project Structure**
```
├── 🔑 .env.local                 # API Keys (maak zelf aan)
├── 📦 package.json               # Dependencies & scripts
├── ⚙️ next.config.js             # Next.js configuration
├── 🌐 netlify.toml               # Netlify deployment config
└── src/
    ├── 🎨 app/
    │   ├── 🌍 globals.css         # Tailwind CSS styling
    │   ├── 📱 layout.tsx          # App layout & metadata
    │   ├── 🏠 page.tsx            # Main page
    │   └── 🔌 api/
    │       └── 💬 chat/route.ts   # Gemini AI endpoint
    └── 🧩 components/
        ├── 🧪 ChemistryPracticeApp.tsx  # Main app component
        ├── ⚙️ SetupForm.tsx             # Level & topic selection
        ├── ❓ QuestionInterface.tsx     # Question display & interaction
        └── 📝 MarkdownRenderer.tsx     # Response formatting
```

### 🔌 **API Integration**

| Endpoint | Functie | Input | Output |
|----------|---------|-------|--------|
| `/api/chat` | Gemini AI Vragen | `niveau`, `onderwerp`, `prompt` | Gegenereerde vraag + uitleg |

### 🎯 **AI Prompt Engineering**

De app gebruikt geavanceerde prompts voor:
- **Vraag generatie**: Niveau-specifieke multiple choice vragen
- **Socratische begeleiding**: Stapsgewijze hints bij foute antwoorden
- **Uitleg generatie**: Duidelijke uitleg waarom antwoorden correct zijn

## 🔧 Customization & Development

### 🎨 **Styling Aanpassen**
```css
/* globals.css - Pas het kleurenschema aan */
:root {
  --primary-color: #2563eb;     /* Blauw accent */
  --secondary-color: #f3f4f6;   /* Light background */
  --success-color: #059669;     /* Groen voor correct */
  --error-color: #dc2626;       /* Rood voor incorrect */
}
```

### 📚 **Onderwerpen Toevoegen**
```typescript
// src/components/SetupForm.tsx
const CHEMISTRY_TOPICS = [
  'Bestaand onderwerp...',
  'Nieuw onderwerp hier toevoegen',
  // Voeg meer onderwerpen toe
]
```

### 🤖 **AI Model Aanpassen**
```typescript
// src/components/QuestionInterface.tsx
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: prompt,
    aiModel: 'smart' // 'pro', 'smart', of 'internet'
  })
})
```

## 🌐 Production Deployment

### 🎯 **Netlify (Aanbevolen)**
**Via Bolt.new:**
1. ✅ "Deploy to Netlify" button
2. ✅ Build settings: `npm run build`
3. ✅ Environment variables toevoegen
4. ✅ Automatische HTTPS & CDN

### ⚡ **Vercel Alternative**
```bash
# Vercel deployment
npm install -g vercel
vercel --prod
# Vergeet niet environment variables in te stellen!
```

### 🔧 **Environment Variables (Production)**
```
GEMINI_API_KEY=gai_xxxxxxxxxxxxx     # Google AI Studio
NODE_ENV=production                   # Auto-set door Netlify
```

## 🚨 Troubleshooting

### ❌ **Veel Voorkomende Problemen**

| Probleem | Oorzaak | Oplossing |
|----------|---------|-----------|
| `GEMINI_API_KEY not found` | Missing env var | Check Netlify environment variables |
| Vragen laden niet | API quota | Check Gemini API quota/billing |
| Build faalt | Wrong build settings | Set build command to `npm run build` |
| Socratische begeleiding werkt niet | AI response parsing | Check API response format |

### 🔧 **Debug Tips**
```bash
# Local development debugging:
npm run dev                    # Start development server
# Check browser console voor errors
# Check Network tab voor API calls
# Verify .env.local heeft correcte API key
```

## 🎓 Educational Use Cases

### 👨‍🏫 **Voor Docenten**
- 📝 **Huiswerk ondersteuning**: Leerlingen kunnen thuis extra oefenen
- 🎯 **Gerichte oefening**: Focus op specifieke onderwerpen waar leerlingen moeite mee hebben
- 📊 **Voortgang monitoring**: Zie welke onderwerpen meer aandacht nodig hebben
- 🤝 **Klassikale discussie**: Gebruik interessante vragen voor klassengesprekken

### 👩‍🎓 **Voor Leerlingen**
- 📚 **Examen voorbereiding**: Oefen specifieke onderwerpen voor toetsen
- 🎯 **Zwakke punten versterken**: Focus op onderwerpen die je moeilijk vindt
- 💡 **Begrip verdiepen**: Socratische begeleiding helpt je echt begrijpen
- ⏰ **Flexibel leren**: Oefen wanneer het jou uitkomt

### 🏫 **Institutionele Deployment**
```bash
# Multi-class setup
GEMINI_API_KEY=shared_school_key
SCHOOL_MODE=true                    # Simplified interface
ANALYTICS_ENABLED=true              # Usage tracking
```

## 🔒 Privacy & Security

### 🛡️ **Data Protection**
- ✅ **Server-side API keys**: Nooit client-side exposed
- ✅ **Geen data opslag**: Vragen en antwoorden niet permanent opgeslagen
- ✅ **Privacy first**: Geen tracking van individuele leerlingen
- ✅ **GDPR compliant**: Voldoet aan privacy wetgeving

## 🤝 Contributing & Development

### 🛠️ **Development Setup**
```bash
# Development mode
npm run dev

# Type checking  
npm run lint

# Production build test
npm run build && npm start
```

### 📈 **Feature Roadmap**
- [ ] **Uitgebreide analytics**: Gedetailleerde voortgang tracking
- [ ] **Meer vakken**: Uitbreiding naar andere exacte vakken
- [ ] **Docent dashboard**: Interface voor docenten om voortgang te volgen
- [ ] **Offline mode**: Vragen downloaden voor gebruik zonder internet
- [ ] **Gamification**: Punten, badges en leaderboards

## 📚 Resources & Links

### 🔗 **API Documentation**
- [Gemini API Docs](https://ai.google.dev/docs) - Google AI ontwikkelaar resources
- [Next.js 15](https://nextjs.org/docs) - Framework documentatie

### 🎥 **Setup Tutorials**
- [Gemini API Setup](https://makersuite.google.com/app/apikey) - API key verkrijgen
- [Netlify Deployment](https://netlify.com) - Hosting platform

### 💡 **Community**
- [GitHub Repository](https://github.com/TomNaberink/scheikunde-oefenen)
- [Tom Naberink LinkedIn](https://linkedin.com/in/tomnaberink) - Direct contact

---

## 🎉 **Ready to Transform Chemistry Education?**

Deze app biedt een moderne, AI-gedreven manier om scheikunde te leren. Van gepersonaliseerde vragen tot intelligente begeleiding - alles wat leerlingen nodig hebben om succesvol te zijn in scheikunde!

**🧪 Gemaakt met passie door Tom Naberink**  
**🚀 Deploy nu en help leerlingen excelleren in scheikunde!**

---

*Versie 1.0 - Scheikunde Oefenapp*  
*Last updated: December 2024*
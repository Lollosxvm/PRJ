# React + Vite + Tailwind + Redux + Nodejs

Tema n.1 
8. Sviluppo di una dashboard in JavaScript per l'analisi delle prestazioni aziendali nel settore primario

## 💡 Recap

1. **Frontend**  
   - Scaffold Vite + React + TypeScript (`npm init vite@latest --template react-ts`).  
   - Aggiunta di **Tailwind CSS** per styling utility-first.  
   - Configurato **Redux Toolkit** (in vista di fetch centralizzato dello stato).  
   - Installato **Recharts** per la visualizzazione dei grafici.  
   - Impostato un **proxy** in `vite.config.ts` che inoltra tutte le chiamate `/api/*` al backend Next.js (eliminando problemi di CORS).  
2. **Backend**  
   - Scaffold Next.js (App Router) per definire **solo API-Routes**.  
   - Creato `backend/.env.local` con la chiave `OPENWEATHER_API_KEY`.  
   - Scritto l’handler `src/app/api/weather/route.js` che:  
     1. Legge `lat` e `lon` dai query-params.  
     2. Richiama l’endpoint **One Call 3.0** di OpenWeather.  
     3. Filtra ed esporta i primi 24 record orari (`ts`, `temp`, `humidity`).  
     4. Gestisce e logga eventuali errori 4xx/5xx.  
3. **End-to-end**  
   - Testato l’API standalone su  
     ```
     http://localhost:3000/api/weather?lat=44.5&lon=11.3
     ```  
   - Realizzato il componente `<WeatherChart>` che effettua il `fetch('/api/weather?...')`, gestisce `loading`/`error` e visualizza i dati con un grafico a linee a doppio asse.

---

## 🚀 Tecnologie usate

| Livello       | Tecnologia                  | Scopo                                                |
|---------------|-----------------------------|------------------------------------------------------|
| **Versioning**| Git                         | Controllo versione e collaborazione                  |
| **Dev & Build** | Vite                      | Dev-server rapido, HMR, bundle ottimizzato           |
| **UI**        | React + TypeScript          | Componenti declarative e tipizzazione statica        |
| **Styling**   | Tailwind CSS                | Utility-first CSS, responsive out-of-the-box         |
| **Stato**     | Redux Toolkit               | (Futuro) fetch e caching centralizzato dello stato   |
| **Charting**  | Recharts                    | Grafici interattivi React-friendly                   |
| **API**       | Next.js App Router          | Micro-API senza server aggiuntivo, environment vars  |
| **Env vars**  | `.env.local`                | Archiviazione sicura delle chiavi (non committato)   |

---

## 🔧 Prerequisiti

- Node.js ≥ 16  
- npm (o yarn)  
- Chiave API OpenWeather (gratuita fino a 1 000 chiamate/giorno)

---

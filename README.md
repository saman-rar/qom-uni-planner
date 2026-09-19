# Qom University Course Planner — Demo

A Vercel-ready mock prototype for planning course registration before the official enrollment period.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style component structure
- lucide-react icons
- RTL Persian UI

## shadcn preset
The requested preset is recorded in the project and can be re-applied with:

```bash
npx shadcn@latest init --preset b2oDXqElM --rtl
```

## Run locally
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel
1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Framework Preset: **Next.js**.
4. Build command: `npm run build`.
5. No environment variables are required for the mock demo.

## Demo features
- Course list with faculty/group filters and search
- Add/remove courses
- Weekly visual calendar from 07:00 to 19:00
- Schedule conflict warning
- Selected course chips and total unit count
- Mock exam schedule view
- Automatic conflict-free sample plan
- Dark/light theme toggle
- Responsive layout

## API integration later
The mock data is isolated in `lib/mock-data.ts`. When the university API becomes available, replace this source with a server-side fetch layer or route handler while keeping the UI unchanged.

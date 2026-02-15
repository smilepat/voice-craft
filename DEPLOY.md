
# Voice Craft Deployment Guide (Vercel)

## Prerequisites

1. **Vercel Account:** Sign up at [vercel.com](https://vercel.com).
2. **Node.js & npm:** Ensure you have Node.js installed.

## Deployment Steps

### 1. Stop Development Server & Clean Build

If you are running `npm run dev`, stop it (Ctrl+C).
Then, clear the build cache to avoid errors:

```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force .next
```

### 2. Verify Build Locally

Run the build command to ensure there are no errors:

```bash
npm run build
```

If the build succeeds, you are ready to deploy.

### 3. Deploy to Vercel

Run the following command to deploy directly:

```bash
npx vercel
```

- **Set up and deploy?** -> `y`
- **Which scope?** -> Select your team/account
- **Link to existing project?** -> `n` (unless you already created one)
- **Project name?** -> `voice-craft`
- **In which directory?** -> `./`
- **Want to modify these settings?** -> `n` (defaults are usually fine for Next.js)

### 4. Production Deployment

Once tested, deploy to production:

```bash
npx vercel --prod
```

## Troubleshooting

- **Build Errors:** Check the error message. Ensure no duplicate imports or type errors exist.
- **Locked Files:** If you see `EPERM` errors, ensure no other process is using the `.next` folder (e.g., VS Code extensions, running sever).

## Environment Variables

If you use API keys (like Gemini), add them to Vercel:

1. Go to your project settings in Vercel dashboard.
2. Navigate to **Environment Variables**.
3. Add `NEXT_PUBLIC_GEMINI_API_KEY` with your key.

Happy Deploying! 🚀

# AI Image Generator

A modern AI-powered image generator built with React, TypeScript, and Subscribe.dev.

## Features

- 🎨 **AI Image Generation** - Generate high-quality images from text prompts using FLUX-Schnell
- 🔐 **Authentication** - Secure sign-in with Subscribe.dev
- 💾 **Cloud Storage** - Your generation history is automatically synced to the cloud
- 📊 **Usage Tracking** - Monitor your credits and subscription status
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Subscribe.dev** - Authentication, billing, and AI models
- **FLUX-Schnell** - AI image generation model

## Getting Started

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Then update `.env` with your Subscribe.dev project token:
   ```env
   VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=your_token_here
   ```

   Get your token from the [Subscribe.dev dashboard](https://subscribe.dev).

### Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Usage

1. **Sign In** - Click "Sign In to Get Started" on the landing page
2. **Generate Images** - Enter a text prompt describing the image you want
3. **View History** - Access your previous generations from the sidebar
4. **Download** - Click the download button to save your generated images
5. **Manage Subscription** - Click "Upgrade" to manage your plan and credits

## Project Structure

```
src/
├── components/
│   ├── SignInScreen.tsx    # Authentication landing page
│   └── ImageGenerator.tsx  # Main image generation interface
├── App.tsx                 # Root component with auth routing
├── main.tsx               # Entry point with SubscribeDevProvider
├── App.css                # Component styles
└── index.css              # Global styles
```

### Deployment

This project includes automated deployment via VGit workflows. Push to any branch to trigger a preview deployment.

## VGit Workflows

This repository includes the following VGit workflows:

- **Create Feature**: Implement new features using AI assistance
- **Ask Codebase**: Get AI-powered answers about your code
- **Merge Branch**: Safely merge branches with validation
- **Deploy Preview**: Automated preview deployments

---

*Generated with [VGit](https://vgit.app) 🤖*

# Stage

A modern, interactive canvas editor built with Next.js, React, and Konva for creating and editing visual designs. Add images, text, backgrounds, and export your creations.

## Features

### Canvas Editing
- **Interactive Canvas**: Full-featured canvas editor with drag-and-drop functionality
- **Object Management**: Add, select, transform, and delete objects (images and text)
- **Transform Controls**: Move, scale, and rotate objects with visual handles
- **Center Guides**: Snap-to-center guides when dragging objects
- **Responsive Design**: Auto-scales canvas to fit viewport

### Image Support
- **Image Upload**: Drag-and-drop or click to upload images
- **Supported Formats**: JPEG, PNG, WebP
- **File Size Limit**: Up to 10MB per image
- **Image Manipulation**: Resize, rotate, and position images on canvas

### Text Editing
- **Text Overlays**: Add customizable text to your canvas
- **Font Controls**: Adjust font size and color
- **Positioning**: Drag and position text anywhere on canvas
- **Transformations**: Scale and rotate text like other objects

### Backgrounds
- **Solid Colors**: Choose any solid color background
- **Gradients**: Create linear or radial gradients with multiple colors
- **Background Images**: Upload and use images as canvas backgrounds
- **Template System**: Pre-built templates for quick starts

### Export
- **Multiple Formats**: Export as PNG or JPG
- **Quality Control**: Adjustable quality settings for JPG exports
- **High Resolution**: Export at full canvas resolution (1920x1080 default)

### Additional Features
- **Undo/Redo**: Full history management for canvas operations
- **Object Selection**: Click to select and transform objects
- **Error Boundaries**: Graceful error handling with React error boundaries

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Canvas Library**: Konva & React-Konva
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (Dialog, Slider, Tabs)
- **Type Safety**: TypeScript 5
- **File Upload**: React Dropzone

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KartikLabhshetwar/stage
cd stage
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
stage/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── canvas/            # Canvas-related components
│   │   ├── CanvasContext.tsx    # Canvas state management
│   │   ├── CanvasEditor.tsx     # Main canvas editor
│   │   └── CanvasToolbar.tsx    # Toolbar with controls
│   ├── controls/          # Control panels
│   │   ├── ExportControls.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── TextControls.tsx
│   │   └── TransformControls.tsx
│   ├── editor/
│   │   └── EditorLayout.tsx     # Main editor layout
│   ├── templates/         # Template components
│   └── ui/                # Reusable UI components
├── hooks/
│   ├── useCanvas.ts       # Canvas operations hook
│   └── useTemplate.ts     # Template management hook
├── lib/
│   ├── canvas/
│   │   ├── templates.ts   # Template definitions
│   │   └── utils.ts       # Canvas utilities
│   └── constants.ts       # App constants
└── types/
    ├── canvas.ts          # Canvas type definitions
    └── editor.ts          # Editor type definitions
```

## Usage

### Adding an Image

1. Click the **Upload** button in the toolbar
2. Drag and drop an image or click to browse
3. The image will be added to the center of the canvas
4. Click and drag to reposition
5. Use the corner handles to resize and rotate

### Adding Text

1. Click the **Text** button in the toolbar
2. Enter your text in the dialog
3. Adjust font size and color
4. Click "Add Text" to place it on canvas
5. Transform the text like any other object

### Changing Background

1. Click the **Background** button in the toolbar
2. Choose between:
   - **Solid Color**: Pick a color from the color picker
   - **Gradient**: Create linear or radial gradients
   - **Image**: Upload a background image
3. Apply the background to your canvas

### Exporting

1. Click the **Export** button in the toolbar
2. Choose format (PNG or JPG)
3. Adjust quality if exporting as JPG
4. Click "Export" to download your design

### Transforming Objects

- **Move**: Click and drag an object
- **Resize**: Drag the corner handles (hold Shift to maintain aspect ratio)
- **Rotate**: Drag the rotation handle
- **Select**: Click on any object to select it
- **Delete**: Select an object and press Delete key

## Default Settings

- **Canvas Size**: 1920 × 1080 pixels
- **Default Font Size**: 48px
- **Default Text Color**: Black (#000000)
- **Max Image Size**: 10MB
- **Supported Image Types**: JPEG, PNG, WebP

## Development

### Key Technologies

- **Konva**: 2D canvas library for drawing and manipulating graphics
- **React-Konva**: React bindings for Konva
- **Next.js App Router**: Modern React framework with server components
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Context API for state management
- Component-based architecture

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See [LICENSE](LICENSE) file for details.

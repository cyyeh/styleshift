# StyleShift - AI Photo Restyler

This is the StyleShift application, a project built in Firebase Studio. StyleShift allows users to upload their photos and restyle them using AI by selecting various emotions and artistic styles.

## About The App

StyleShift leverages generative AI to transform your images. You can:

*   Upload a photo from your device.
*   Choose from a predefined list of emotions (e.g., Happy, Calm, Energetic).
*   Select different artistic styles (e.g., Abstract, Surreal, Cyberpunk).
*   Generate a new, restyled image based on your selections.
*   Download the restyled image.
*   Toggle between light and dark themes.

## Tech Stack

The application is built with a modern web development stack:

*   **Next.js:** React framework for server-side rendering and static site generation.
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript for type safety.
*   **ShadCN UI:** Re-usable UI components.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Genkit (with Google AI):** For integrating generative AI models (specifically Gemini for image generation).
*   **Firebase:** (Implicitly, as it's a Firebase Studio project, though not heavily used in the current feature set beyond App Hosting).

## Getting Started

To get started with the application:

1.  **Key Files:**
    *   The main page UI logic is in `src/app/page.tsx`.
    *   The AI image restyling flow is defined in `src/ai/flows/restyled-image-generation.ts`.
    *   Global styles and theme configuration are in `src/app/globals.css`.

2.  **Running the Development Server:**
    *   To run the Next.js frontend:
        ```bash
        npm run dev
        ```
        This will typically start the app on `http://localhost:9002`.
    *   To run the Genkit development server (for local AI flow testing, if needed separately):
        ```bash
        npm run genkit:dev
        ```

3.  **Building for Production:**
    ```bash
    npm run build
    ```

## Project Structure Highlights

*   `src/app/`: Contains the Next.js pages and layout components.
*   `src/components/`: Houses the React UI components, categorized into:
    *   `core/`: Essential app-wide components like header and footer.
    *   `features/`: Components specific to application features (e.g., photo upload, option selection).
    *   `ui/`: ShadCN UI components.
*   `src/ai/`: Contains all AI-related code, primarily Genkit flows.
    *   `flows/`: Specific AI processing flows (like image restyling).
    *   `genkit.ts`: Genkit global configuration.
*   `src/lib/`: Utility functions, constants, and type definitions.
*   `public/`: Static assets.

This project was bootstrapped and can be further developed within Firebase Studio.

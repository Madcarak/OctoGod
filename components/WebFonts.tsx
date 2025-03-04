import React, { useEffect } from 'react';
import { Platform } from 'react-native';

/**
 * WebFonts component to load web-specific fonts
 * This component only runs on web platform and injects the necessary
 * font styles into the document head
 */
export default function WebFonts() {
  useEffect(() => {
    // Only run on web platform
    if (Platform.OS !== 'web') return;

    try {
      // Import the font CSS
      import('@fontsource-variable/pixelify-sans');
      
      // Create style element for additional CSS customization
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        /* Map the static font names to specific weights */
        .PixelifySans-Regular {
          font-family: "Pixelify Sans Variable", sans-serif;
          font-weight: 400;
          font-style: normal;
        }
        
        .PixelifySans-Medium {
          font-family: "Pixelify Sans Variable", sans-serif;
          font-weight: 500;
          font-style: normal;
        }
        
        .PixelifySans-SemiBold {
          font-family: "Pixelify Sans Variable", sans-serif;
          font-weight: 600;
          font-style: normal;
        }
        
        .PixelifySans-Bold {
          font-family: "Pixelify Sans Variable", sans-serif;
          font-weight: 700;
          font-style: normal;
        }
      `;
      
      // Append style element to document head
      document.head.appendChild(styleElement);
      
      // Cleanup function to remove elements when component unmounts
      return () => {
        document.head.removeChild(styleElement);
      };
    } catch (error) {
      console.error('Error loading web fonts:', error);
    }
  }, []);
  
  // This component doesn't render anything
  return null;
}
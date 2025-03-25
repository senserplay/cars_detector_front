import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react';

const buttonRecipe = defineRecipe({
  base: {
    display: 'flex'
  },
  variants: {
    visual: {
      navigation: {
        colorPalette: 'blue', padding: '3px', borderRadius: '15px', borderColor: "colorPalette.500",
        cursor: "pointer", fontFamily: "heading", fontWeight: "500", fontSize: "16px", lineHeight: "28px"
      }
    }
  }
});

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          100: { value: '#e6f2ff' },
          200: { value: '#505FFF' }
        }
      },
      
    },
    recipes: {
      button: buttonRecipe
    }
  }
});

export const system = createSystem(defaultConfig, customConfig);

export const theme = {
  colors: {
    primary: '#007AFF',    
    secondary: '#5856D6',  
    
    background: {
      primary: '#000000',  
      secondary: '#1C1C1E',
      tertiary: '#2C2C2E', 
    },
    
    surface: {
      primary: 'rgba(28, 28, 30, 0.9)',    
      secondary: 'rgba(44, 44, 46, 0.8)', 
      elevated: 'rgba(58, 58, 60, 0.7)',    
    },

    text: {
      primary: '#FFFFFF',      
      secondary: '#8E8E93',   
      tertiary: '#48484A',   
      accent: '#007AFF',      
    },

    status: {
      success: '#34C759',   
      warning: '#FF9500',     
      error: '#FF3B30',      
      info: '#5856D6',        
    },

    gradients: {
      primary: ['#007AFF', '#5856D6'],    
      success: ['#34C759', '#30D158'],     
      warning: ['#FF9500', '#FF3B30'],     
      dark: ['#1C1C1E', '#2C2C2E'],         
      glass: [
        'rgba(28, 28, 30, 0.9)',
        'rgba(44, 44, 46, 0.8)',
      ],
    },

    effects: {
      glass: {
        background: 'rgba(28, 28, 30, 0.8)',
        blur: 20,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      shadow: {
        light: {
          color: '#000',
          opacity: 0.1,
          offset: { width: 0, height: 2 },
          radius: 8,
        },
        medium: {
          color: '#000',
          opacity: 0.15,
          offset: { width: 0, height: 4 },
          radius: 16,
        },
      },
    },
  },

  typography: {
    fontFamily: {
      sans: 'System',      
      mono: 'Menlo',       
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    }
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
  },

  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 22,
    full: 9999,
  },

  layout: {
    safeArea: {
      top: 47,      
      bottom: 34,   
    },
    navigationBar: {
      height: 44,
    },
    tabBar: {
      height: 49,
    },
  }
};
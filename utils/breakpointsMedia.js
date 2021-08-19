import { breakpoints } from "../styles/breakpoints";

export function breakpointsMedia(breakpointsStyle) {
  const breakpointsStylesMap = Object.entries(breakpointsStyle);

  const mediaQuery = breakpointsStylesMap.map(([key, value]) => {
    return `
      @media (max-width: ${breakpoints[key]}) {
        ${value}
      }
    `
  }).join('')

  return mediaQuery; 
}


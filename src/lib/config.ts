import siteConfig from '../config/config.json';
import deployConfig from '../config/deploy.json';
import menuConfig from '../config/menu.json';
import socialConfig from '../config/social.json';
import themeConfig from '../config/theme.json';

export { siteConfig, deployConfig, menuConfig, socialConfig, themeConfig };

export type Locale = keyof typeof menuConfig;

export function getMenu(locale: Locale = 'en') {
  return menuConfig[locale];
}

export function getCopyright(year = new Date().getFullYear()) {
  return siteConfig.params.copyright.replace('{year}', String(year));
}

export function isActiveNav(url: string, currentPath: string) {
  if (url === '/') return currentPath === '/' || currentPath === '';
  return currentPath === url || currentPath.startsWith(`${url}/`) || currentPath.startsWith(url);
}

export function getThemeCssVars() {
  const colors = themeConfig.colors.default;
  return {
    '--color-primary': colors.theme_color.secondary,
    '--color-primary-dark': colors.theme_color.tertiary,
    '--color-primary-light': colors.theme_color.light,
    '--color-body': colors.theme_color.body,
    '--color-border': colors.theme_color.border,
    '--color-text': colors.text_color.text,
    '--color-text-dark': colors.text_color['text-dark'],
    '--color-text-light': colors.text_color['text-light'],
    '--font-primary': `${themeConfig.fonts.font_family.primary}, ${themeConfig.fonts.font_family.primary_type}`,
    '--font-secondary': `${themeConfig.fonts.font_family.secondary}, ${themeConfig.fonts.font_family.secondary_type}`,
  } as Record<string, string>;
}
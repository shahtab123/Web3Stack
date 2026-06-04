import Script from "next/script";

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("atlas-theme");if(t==="light"||t==="dark"){document.documentElement.classList.add(t);}else{document.documentElement.classList.add("light");}}catch(e){document.documentElement.classList.add("light");}})();`;

export function ThemeScript() {
  return (
    <Script
      id="atlas-theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  );
}

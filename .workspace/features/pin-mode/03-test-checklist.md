# Test Checklist: pin-mode

## Items

1. **Shift+Click toggles pin state** — In inspect mode, Shift+Click op een element voegt het toe aan pinnedElements met dashed outline. Nogmaals Shift+Click verwijdert het.
2. **Gepinde elementen hebben visuele styling** — Gepind element toont `2px dashed #4a90d9` outline met `-2px` offset.
3. **Reguliere click cleert alle pins** — Klik zonder Shift wist alle pins en kopieert het aangeklikte element naar clipboard.
4. **Alt+C kopieert alle gepinde elementen** — Alt+C in inspect mode kopieert alle gepinde elementen met "--- 1/N ---" headers naar clipboard.
5. **Pin bar toont aantal en Copy knop** — Bottom bar verschijnt met "{N} pinned" tekst en "Copy All (Alt+C)" knop. Verborgen bij 0 pins.
6. **HMR state persistence** — Na code-wijziging (HMR reload) blijven gepinde elementen behouden en worden outlines hersteld.

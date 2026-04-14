# Brand — [NOM CLIENT]
# À dupliquer dans /client/[nom-client]/brand.md pour chaque projet

---

## Informations client

- **Nom** : [Nom de la marque]
- **Secteur** : [ex: mode, tech, consulting, restauration...]
- **Marché** : [ ] Local CI  [ ] Africain régional  [ ] International  [ ] Les 3
- **Positionnement** : [1 phrase — ex: "la référence premium du conseil en stratégie à Abidjan"]
- **Ton de communication** : [ex: professionnel & chaleureux / luxe & distant / jeune & dynamique]

---

## Palette de couleurs

```css
:root {
  /* Couleurs principales */
  --color-primary:      #______;   /* couleur signature de la marque */
  --color-primary-dark: #______;   /* version foncée pour hover */
  --color-accent:       #______;   /* CTA, éléments d'attention */

  /* Surfaces */
  --color-surface:      #______;   /* fond principal (souvent blanc/crème/noir) */
  --color-surface-alt:  #______;   /* fond sections alternées */
  --color-surface-card: #______;   /* fond cartes et composants */

  /* Texte */
  --color-text:         #______;   /* texte principal */
  --color-text-muted:   #______;   /* texte secondaire, captions */
  --color-text-on-primary: #_____;  /* texte sur fond primary */

  /* Utilitaires */
  --color-border:       #______;   /* bordures légères */
  --color-success:      #______;   /* validations, succès */
  --color-error:        #______;   /* erreurs, alertes */
}
```

### Inspiration couleurs (si charte non définie)

**Option A — Luxe sombre**
```
primary: #0A0A0A  |  accent: #C9A84C  |  surface: #F5F3EE
text: #1A1A1A     |  muted: #6B6B6B   |  border: #E8E5DF
```

**Option B — Premium clair**
```
primary: #1C1C2E  |  accent: #E8C547  |  surface: #FFFFFF
text: #0F0F1A     |  muted: #7A7A8A   |  border: #EBEBF0
```

**Option C — Chaleur africaine**
```
primary: #2D1B0E  |  accent: #D4845A  |  surface: #FAF6F1
text: #1A0F07     |  muted: #8A6E5A   |  border: #EDE5DB
```

**Option D — Contemporain neutre**
```
primary: #111111  |  accent: #4F7AFF  |  surface: #FAFAFA
text: #111111     |  muted: #717171   |  border: #EBEBEB
```

---

## Typographie

```css
/* À charger via Google Fonts ou next/font */

--font-display: '[Police titre]', serif;
/* Exemples premium : Cormorant Garamond, Playfair Display, DM Serif Display */
/* Exemples modernes : Syne, Cabinet Grotesk, Instrument Serif */

--font-body: '[Police corps]', sans-serif;
/* Exemples : DM Sans, Satoshi, Sora, Plus Jakarta Sans */

--font-mono: '[Police code]', monospace;
/* Pour code ou éléments techniques uniquement */
```

### Échelle typographique
```css
--text-xs:   12px;
--text-sm:   14px;
--text-base: 16px;
--text-lg:   18px;
--text-xl:   22px;
--text-2xl:  28px;
--text-3xl:  36px;
--text-4xl:  48px;
--text-5xl:  64px;
--text-hero: clamp(52px, 8vw, 96px);  /* headline héro responsive */
```

---

## Logo & assets

- **Logo principal** : `/client/[nom]/assets/logo.svg`
- **Logo fond sombre** : `/client/[nom]/assets/logo-white.svg`
- **Favicon** : `/client/[nom]/assets/favicon.png` (32x32 et 180x180)
- **Images clés** : `/client/[nom]/assets/images/`

### Règles d'usage du logo
- Espace de protection minimum : [à définir]
- Ne jamais étirer ou déformer
- Ne jamais changer les couleurs hors versions approuvées

---

## Contenu & messaging

### Tagline principale
> [À compléter par le client]

### Proposition de valeur (pour hero)
> [1-2 phrases percutantes sur ce que la marque apporte]

### Points de différenciation (pour section bénéfices)
1. [Différenciateur 1]
2. [Différenciateur 2]
3. [Différenciateur 3]

### Appels à l'action (CTA) préférés
- Principal : [ex: "Démarrer un projet", "Réserver un appel", "Découvrir nos offres"]
- Secondaire : [ex: "En savoir plus", "Voir nos réalisations"]

---

## Présence digitale

- **Site actuel** : [URL ou "À créer"]
- **Instagram** : [@handle]
- **LinkedIn** : [URL]
- **WhatsApp Business** : [+225 XX XX XX XX XX]
- **Email contact** : [email]
- **Adresse** : [Ville, Pays]

---

## Canaux de paiement à intégrer

- [ ] Wave CI
- [ ] Orange Money
- [ ] MTN MoMo
- [ ] Stripe (cartes internationales)
- [ ] Virement bancaire
- [ ] PayPal

---

## Notes spécifiques au projet

[Contraintes techniques, intégrations spéciales, remarques du client, délais, etc.]

---

*Template créé par [Ton nom/studio] · Mise à jour : [Date]*

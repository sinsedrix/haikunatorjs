import Haikunator from '../index'

const haikunator = new Haikunator()

test('general functionality', () => {
  const tests = [
    [{}, /[a-z]+-[a-z]+-[0-9]{4}$/],
    [{ tokenHex: true }, /[a-z]+-[a-z]+-[0-f]{4}$/],
    [{ tokenLength: 9 }, /[a-z]+-[a-z]+-[0-9]{9}$/],
    [{ tokenLength: 9, tokenHex: true }, /[a-z]+-[a-z]+-[0-f]{9}$/],
    [{ tokenLength: 0 }, /[a-z]+-[a-z]+$/],
    [{ delimiter: '.' }, /[a-z]+.[a-z]+.[0-9]{4}$/],
    [{ tokenLength: 0, delimiter: ' ' }, /[a-z]+ [a-z]+/],
    [{ tokenLength: 0, delimiter: '' }, /[a-z]+$/],
    [{ tokenChars: 'xyz' }, /[a-z]+-[a-z]+-[x-z]{4}$/]
  ]

  tests.forEach(test => {
    const options = test[0]
    const regex = test[1]

    // @ts-ignore
    expect(haikunator.haikunate(options)).toMatch(regex)
  })
})

test('wont return the same name for subsequent calls', () => {
  const tests = [new Haikunator(), new Haikunator()]

  tests.forEach(h1 => {
    tests.forEach(h2 => {
      expect(h1.haikunate()).not.toBe(h2.haikunate())
    })
  })
})

test('returns the same name if seed is provided', () => {
  const seed = 'definitively random seed'

  const h1 = new Haikunator({ seed: seed })
  const h2 = new Haikunator({ seed: seed })

  expect(h1.haikunate()).toBe(h2.haikunate())
  expect(h1.haikunate()).toBe(h2.haikunate())
})

test('class wide defaults', () => {
  const wordHaikunator = new Haikunator({
    defaults: {
      tokenLength: 0,
      delimiter: ''
    }
  })

  expect(wordHaikunator.haikunate()).toMatch(/((?:[a-z][a-z]+))$/i)
})

test('class wide defaults can get overridden by function parameters', () => {
  const wordHaikunator = new Haikunator({
    defaults: {
      tokenLength: 0,
      delimiter: ''
    }
  })

  const opts = {
    delimiter: '.'
  }

  expect(wordHaikunator.haikunate()).toMatch(/[a-z]+$/)
  expect(wordHaikunator.haikunate(opts)).toMatch(/[a-z]+.[a-z]+$/)
})

test('custom adjectives & nouns', () => {
  const customHaikunator = new Haikunator({
    adjectives: ['adjective'],
    nouns: ['noun']
  })

  expect(customHaikunator.haikunate()).toMatch(/adjective-noun-\d{4}$/)
})

test('fr tests', () => {
/**
 * Adjectifs utilisés par haikunator
 */
const frAdjectives = [
  'age', 'ancien', 'automnal', 'flottant', 'amer', 'noir', 'bleu', 'audacieux',
  'large', 'casse', 'calme', 'froid', 'frais', 'cramoisi', 'boucle', 'humide',
  'sombre', 'aube', 'delicat', 'divin', 'sec', 'vide', 'tombant', 'fantaisiste',
  'plat', 'floral', 'parfume', 'glacial', 'doux', 'vert', 'cache', 'sacre',
  'glace', 'joyeux', 'tardif', 'persistant', 'petit', 'vivant', 'long', 'chanceux',
  'brumeux', 'matinal', 'boueux', 'muet', 'sans nom', 'bruyant', 'etrange', 'vieux',
  'orange', 'patient', 'simple', 'poli', 'fier', 'violet', 'silencieux', 'rapide',
  'rauque', 'rouge', 'agite', 'rugueux', 'rond', 'royal', 'brillant', 'strident',
  'timide', 'silencieux', 'petit', 'enneige', 'doux', 'solitaire', 'etincelant', 'printanier',
  'carre', 'abrupte', 'immobile', 'estival', 'super', 'sucre', 'palpitant', 'serre',
  'minuscule', 'crepusculaire', 'errant', 'use', 'blanc', 'sauvage', 'hivernal', 'vaporeux',
  'fletri', 'jaune', 'jeune'
]

/**
 * Noms utilisés par haikunator
 */
const frNouns = [
  'art', 'groupe', 'bar', 'base', 'oiseau', 'bloc', 'bateau', 'bonus',
  'pain', 'brise', 'ruisseau', 'buisson', 'papillon', 'gateau', 'cellule', 'cerise',
  'nuage', 'credit', 'obscurite', 'aube', 'rosee', 'disque', 'reve', 'poussiere',
  'plume', 'champ', 'feu', 'luciole', 'fleur', 'brouillard', 'foret', 'grenouille',
  'givre', 'clairiere', 'eclat', 'herbe', 'hall', 'chapeau', 'brume', 'coeur',
  'colline', 'roi', 'laboratoire', 'lac', 'feuille', 'limite', 'mathematiques', 'prairie',
  'mode', 'lune', 'matin', 'montagne', 'souris', 'boue', 'nuit', 'papier',
  'pin', 'poesie', 'etang', 'reine', 'pluie', 'recette', 'resonance', 'riz',
  'riviere', 'salade', 'scene', 'mer', 'ombre', 'forme', 'silence', 'ciel',
  'fumee', 'neige', 'flocon', 'son', 'etoile', 'soleil', 'coucher de soleil',
  'vague', 'terme', 'tonnerre', 'dent', 'arbre', 'verite', 'union', 'unite',
  'violette', 'voix', 'eau', 'cascade', 'vague', 'fleur sauvage', 'vent', 'bois'
]

  const frHaikunator = new Haikunator({
    adjectives: frAdjectives,
    nouns: frNouns
  })

  console.log(frHaikunator.haikunate())
})
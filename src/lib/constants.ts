export const COLORS = {
  base: {
    charcoal: '#0B0F14',
    surface: '#121826',
    text: '#E6EDF3',
  },
  accents: {
    blue: '#4EA8FF',
    lime: '#A3FF12',
    coral: '#FF7A59',
  },
} as const;

export const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'playground', label: 'Demos' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
] as const;

export const PROJECTS = [
  {
    id: 'dream-sketch-ai',
    title: 'Dream Sketch AI',
    summary: 'Studio Ghibli-style image generator with custom diffusion pipeline.',
    stack: ['React', 'Django', 'PyTorch', 'Three.js'],
    role: 'Full-Stack Developer',
    links: {
      live: 'https://dream-sketch.demo',
      github: 'https://github.com/boss/dream-sketch-ai',
    },
    highlights: [
      'Custom diffusion pipeline optimized for anime-style generation',
      'GPU-accelerated inference with WebGL previews',
      'Real-time style transfer with 3D composition',
    ],
    cover: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    id: 'snake-game',
    title: 'Snake Game',
    summary: 'Classic Snake game built with Django backend and vanilla JavaScript.',
    stack: ['Django', 'JavaScript', 'HTML', 'CSS'],
    role: 'Full-Stack Developer',
    links: {
      live: 'https://snake-game.demo',
      github: 'https://github.com/boss/snake-game',
    },
    highlights: [
      'Real-time game mechanics with smooth animations',
      'Django REST API for high score management',
      'Responsive design with touch controls for mobile',
    ],
    cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
];

export const SKILLS = {
  frontend: {
    title: 'Frontend',
    items: [
      { name: 'React', level: 90 },
      { name: 'HTML', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  backend: {
    title: 'Backend',
    items: [
      { name: 'Django', level: 85 },
      { name: 'MySQL', level: 75 },
      { name: 'Python', level: 80 },
    ],
  },
  ai: {
    title: 'AI/ML',
    items: [
      { name: 'PyTorch', level: 85 },
      { name: 'Transformers', level: 80 },
      { name: 'OpenAI API', level: 85 },
      { name: 'NumPy', level: 75 },
    ],
  },
  automation: {
    title: 'Automation',
    items: [
      { name: 'n8n', level: 80 },
      { name: 'GitHub Actions', level: 75 },
      { name: 'REST APIs', level: 85 },
    ],
  },
} as const;
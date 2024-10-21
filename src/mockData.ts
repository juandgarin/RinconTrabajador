import { Category, Worker, Job, JobStatus, Asset } from './types';

export const initialCategories: Category[] = [
  { id: 1, name: 'Aire Acondicionado' },
  { id: 2, name: 'Limpieza' },
  { id: 3, name: 'Catering' },
  { id: 4, name: 'Electricidad' },
  { id: 5, name: 'Fontanería' },
  { id: 6, name: 'Jardinería' },
  { id: 7, name: 'Carpintería' },
  { id: 8, name: 'Pintura' },
  { id: 9, name: 'Albañilería' },
  { id: 10, name: 'Informática' },
];

const mockAssets: Asset[] = [
  {
    url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189',
    title: 'Herramientas eléctricas',
    description: 'Set completo de herramientas eléctricas profesionales',
    additionalPrice: { amount: 20, unit: 'hour' },
  },
  {
    url: 'https://images.unsplash.com/photo-1540103711724-ebf833bde8d1',
    title: 'Equipo de limpieza',
    description: 'Equipamiento profesional para limpieza de hogares y oficinas',
    additionalPrice: { amount: 15, unit: 'hour' },
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f',
    title: 'Utensilios de cocina',
    description: 'Set completo de utensilios de cocina para catering',
    additionalPrice: { amount: 50, unit: 'job' },
  },
];

export const initialWorkers: Worker[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    category: 1,
    phone: '666111222',
    email: 'juan@example.com',
    rating: 4.5,
    description: 'Especialista en instalación y mantenimiento de aires acondicionados con 10 años de experiencia.',
    assets: [mockAssets[0]],
    history: [
      { comment: 'Excelente trabajo, muy profesional', rating: 5 },
      { comment: 'Buen servicio, pero llegó un poco tarde', rating: 4 },
    ],
  },
  {
    id: 2,
    name: 'María García',
    category: 2,
    phone: '666333444',
    email: 'maria@example.com',
    rating: 4.8,
    description: 'Limpieza profunda de hogares y oficinas. Uso productos ecológicos.',
    assets: [mockAssets[1]],
    history: [
      { comment: 'Dejó la casa impecable, muy recomendable', rating: 5 },
      { comment: 'Muy eficiente y cuidadosa con los detalles', rating: 5 },
    ],
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    category: 3,
    phone: '666555666',
    email: 'carlos@example.com',
    rating: 4.2,
    description: 'Chef profesional especializado en eventos y catering para grandes grupos.',
    assets: [mockAssets[2]],
    history: [
      { comment: 'La comida estaba deliciosa, pero el servicio un poco lento', rating: 4 },
      { comment: 'Excelente presentación y sabor', rating: 5 },
    ],
  },
  {
    id: 4,
    name: 'Ana Martínez',
    category: 4,
    phone: '666777888',
    email: 'ana@example.com',
    rating: 4.7,
    description: 'Electricista certificada con experiencia en instalaciones residenciales y comerciales.',
    assets: [mockAssets[0]],
    history: [
      { comment: 'Solucionó el problema rápidamente, muy profesional', rating: 5 },
      { comment: 'Excelente trabajo y asesoramiento', rating: 5 },
    ],
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    category: 5,
    phone: '666999000',
    email: 'pedro@example.com',
    rating: 4.4,
    description: 'Fontanero con más de 15 años de experiencia en todo tipo de instalaciones y reparaciones.',
    assets: [mockAssets[0]],
    history: [
      { comment: 'Reparó la fuga rápidamente, buen precio', rating: 4 },
      { comment: 'Muy profesional y puntual', rating: 5 },
    ],
  },
  // Add more workers here to test pagination
  {
    id: 6,
    name: 'Laura Fernández',
    category: 6,
    phone: '666111333',
    email: 'laura@example.com',
    rating: 4.6,
    description: 'Jardinera paisajista con experiencia en diseño y mantenimiento de jardines.',
    assets: [mockAssets[1]],
    history: [
      { comment: 'Transformó nuestro jardín, quedó precioso', rating: 5 },
      { comment: 'Muy creativa y profesional', rating: 4 },
    ],
  },
  {
    id: 7,
    name: 'Miguel Ángel Torres',
    category: 7,
    phone: '666222444',
    email: 'miguel@example.com',
    rating: 4.9,
    description: 'Carpintero artesano especializado en muebles a medida y restauración.',
    assets: [mockAssets[0]],
    history: [
      { comment: 'Trabajo impecable, superó nuestras expectativas', rating: 5 },
      { comment: 'Muy detallista y puntual', rating: 5 },
    ],
  },
  {
    id: 8,
    name: 'Carmen Ruiz',
    category: 8,
    phone: '666333555',
    email: 'carmen@example.com',
    rating: 4.3,
    description: 'Pintora decorativa con experiencia en interiores y exteriores.',
    assets: [mockAssets[1]],
    history: [
      { comment: 'Excelente trabajo, muy limpia y ordenada', rating: 4 },
      { comment: 'Buenos acabados, pero tardó más de lo previsto', rating: 4 },
    ],
  },
  {
    id: 9,
    name: 'Javier López',
    category: 9,
    phone: '666444666',
    email: 'javier@example.com',
    rating: 4.7,
    description: 'Albañil especializado en reformas integrales y obra nueva.',
    assets: [mockAssets[0]],
    history: [
      { comment: 'Reforma perfecta, cumplió con los plazos', rating: 5 },
      { comment: 'Muy profesional y buen precio', rating: 5 },
    ],
  },
  {
    id: 10,
    name: 'Sofía Navarro',
    category: 10,
    phone: '666555777',
    email: 'sofia@example.com',
    rating: 4.8,
    description: 'Técnica informática especializada en reparación y mantenimiento de equipos.',
    assets: [mockAssets[2]],
    history: [
      { comment: 'Solucionó el problema rápidamente, muy eficiente', rating: 5 },
      { comment: 'Excelente servicio y asesoramiento', rating: 5 },
    ],
  },
  // Add even more workers to ensure pagination works correctly
];

export const initialJobs: Job[] = [
  {
    id: '1',
    workerId: 1,
    clientId: '2',
    status: JobStatus.COMPLETED,
    description: 'Instalación de aire acondicionado en sala de estar',
    date: '2023-05-15',
    time: '10:00',
    clientComment: 'Excelente trabajo, muy profesional y rápido.',
  },
  {
    id: '2',
    workerId: 2,
    clientId: '3',
    status: JobStatus.ACCEPTED,
    description: 'Limpieza profunda de oficina',
    date: '2023-05-20',
    time: '09:00',
  },
  {
    id: '3',
    workerId: 3,
    clientId: '4',
    status: JobStatus.OPEN,
    description: 'Catering para evento corporativo de 50 personas',
    date: '2023-06-01',
    time: '18:00',
  },
  {
    id: '4',
    workerId: 4,
    clientId: '5',
    status: JobStatus.COMPLETED,
    description: 'Instalación de luces LED en todo el hogar',
    date: '2023-05-10',
    time: '14:00',
    clientComment: 'Ana hizo un trabajo excepcional, muy recomendable.',
  },
  {
    id: '5',
    workerId: 5,
    clientId: '1',
    status: JobStatus.REJECTED,
    description: 'Reparación de tuberías en baño principal',
    date: '2023-05-18',
    time: '11:00',
  },
  {
    id: '6',
    workerId: 1,
    clientId: '3',
    status: JobStatus.OPEN,
    description: 'Mantenimiento de sistema de aire acondicionado',
    date: '2023-05-25',
    time: '15:00',
  },
  {
    id: '7',
    workerId: 2,
    clientId: '4',
    status: JobStatus.COMPLETED,
    description: 'Limpieza de fin de obra en apartamento',
    date: '2023-05-12',
    time: '08:00',
    clientComment: 'María dejó el apartamento impecable, excelente servicio.',
  },
  // Add more jobs here to test the job list functionality
];
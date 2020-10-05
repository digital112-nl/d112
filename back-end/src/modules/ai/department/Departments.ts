export interface Department {
  name: string;
  default: DepartmentSettings;
  categories: DepartmentCategory[];
}

export interface DepartmentSettings {
  message: string;
  fire_department?: boolean;
  police?: boolean;
  ambulance?: boolean;
  disable_location_required?: boolean;
  disable_services_message?: boolean;
}

export interface DepartmentCategory extends DepartmentSettings {
  name: string;
}

export const Departments: Department[] = [
  {
    name: 'fire_department',
    default: {
      message: 'We have determined you need the fire department.',
      fire_department: true,
      disable_services_message: true
    },
    categories: [
      {
        name: 'fire',
        message: 'We understand that there is a fire going on at your location.',
        fire_department: true
      },
      {
        name: 'accident',
        message: 'We understand you have either seen or are in an accident.',
        fire_department: true,
        ambulance: true,
        police: true
      }
    ]
  },
  {
    name: 'police',
    default: {
      message: 'We have determined you need the police department.',
      police: true
    },
    categories: [
      {
        name: 'theft',
        message: 'You seem to have witnessed or been stolen from.',
        police: true
      }
    ]
  }
];

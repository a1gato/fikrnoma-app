export type ClassName =
    | '5A' | '6A' | '6B' | '7A' | '7B' | '7V' | '7G'
    | '8A' | '8B' | '8G' | '8V' | '9A' | '9B' | '9V' | '9G' | '9D'
    | '10A' | '10B' | '10V' | '10G' | '10D' | '11A' | '11B';

export const CLASSES: ClassName[] = [
    '5A', '6A', '6B', '7A', '7B', '7V', '7G',
    '8A', '8B', '8G', '8V', '9A', '9B', '9V', '9G', '9D',
    '10A', '10B', '10V', '10G', '10D', '11A', '11B'
];

export interface Teacher {
    id: string;
    name: string;
    subject: string;
}

const createTeachers = (names: string[]): Teacher[] => {
    return names.map(name => {
        const trimmedName = name.trim();
        // Create a stable ID by slugifying the name
        const id = trimmedName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        return {
            id,
            name: trimmedName,
            subject: 'O\'qituvchi'
        };
    });
};

// Real Data Mapping
export const TEACHERS_BY_CLASS: Record<ClassName, Teacher[]> = {
    '5A': createTeachers([
        'Meliyeva Sevinch Iskandarovna',
        'Ilxomov Amirbek Abdurashidovich',
        'Tursunova Shoira Bohodirovna',
        'Ubaydullayeva Dilbar Anvarovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich'
    ]),
    '6A': createTeachers([
        'Usmanova To`lg`anoy Tuychiyevna',
        'Ishankulova Gulchexra Gafurovna',
        'Sirojeva Xiromon Asliddinovna',
        'Fazliddinova Gulnihol Alisherovna',
        'Ubaydullayeva Dilbar Anvarovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna'
    ]),
    '6B': createTeachers([
        'Tursunova Shoira Bohodirovna',
        'Ubaydullayeva Dilbar Anvarovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich'
    ]),
    '7A': createTeachers([
        'Usmanova To`lg`anoy Tuychiyevna',
        'Ishankulova Gulchexra Gafurovna',
        'Sirojeva Xiromon Asliddinovna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Tursunova Shoira Bohodirovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Ubaydullayeva Dilbar Anvarovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna'
    ]),
    '7B': createTeachers([
        'Usmanova To`lg`anoy Tuychiyevna',
        'Ishankulova Gulchexra Gafurovna',
        'Sirojeva Xiromon Asliddinovna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Fazliddinova Gulnihol Alisherovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Ubaydullayeva Dilbar Anvarovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna'
    ]),
    '7V': createTeachers([
        'Ergasheva Nilufar Xolmurotovna',
        'Ismatova Nozanin Ixtiyorovna',
        'Ilxomov Amirbek Abdurashidovich',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Ubaydullayeva Dilbar Anvarovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich'
    ]),
    '7G': createTeachers([
        'Ergasheva Nilufar Xolmurotovna',
        'Musurmonova Zulxumor Uzakovna',
        'Ilxomov Amirbek Abdurashidovich',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Ubaydullayeva Dilbar Anvarovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich'
    ]),
    '8A': createTeachers([
        'Eshkuvatova Mavluda Ibroximovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Fazliddinova Gulnihol Alisherovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich'
    ]),
    '8B': createTeachers([
        'Eshkuvatova Mavluda Ibroximovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Fazliddinova Gulnihol Alisherovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich'
    ]),
    '8V': createTeachers([
        'Ergasheva Nilufar Xolmurotovna',
        'Ilxomov Amirbek Abdurashidovich',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich',
        'Amediyeva Yelena Aleksandrovna'
    ]),
    '8G': createTeachers([
        'Ergasheva Nilufar Xolmurotovna',
        'Ilxomov Amirbek Abdurashidovich',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich',
        'Amediyeva Yelena Aleksandrovna'
    ]),
    '9A': createTeachers([
        'Eshkuvatova Mavluda Ibroximovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Sirojeva Xiromon Asliddinovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Tursunova Shoira Bohodirovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich'
    ]),
    '9B': createTeachers([
        'Eshkuvatova Mavluda Ibroximovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Sirojeva Xiromon Asliddinovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Tursunova Shoira Bohodirovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich'
    ]),
    '9V': createTeachers([
        'Xolikulova Shohista Xolmirzayevna',
        'Ismatova Nozanin Ixtiyorovna',
        'Yuldasheva Surayo Ismatovna',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich',
        'Amediyeva Yelena Aleksandrovna'
    ]),
    '9G': createTeachers([
        'Xolikulova Shohista Xolmirzayevna',
        'Musurmonova Zulxumor Uzakovna',
        'Yuldasheva Surayo Ismatovna',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich'
    ]),
    '9D': createTeachers([
        'Xolikulova Shohista Xolmirzayevna',
        'Musurmonova Zulxumor Uzakovna',
        'Yuldasheva Surayo Ismatovna',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Hamzayeva Xurshida Rayimkulovna',
        'Miliyev Azam Aktamovich',
        'Olimova Gulnora Rozikovna',
        'Amediyev Edib Nadimovich',
        'Amediyeva Yelena Aleksandrovna'
    ]),
    '10A': createTeachers([
        'Meliyeva Sevinch Iskandarovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Sirojeva Xiromon Asliddinovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Fazliddinova Gulnihol Alisherovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich',
        'Saydullayev Baxtiyor Sobirovich'
    ]),
    '10B': createTeachers([
        'Meliyeva Sevinch Iskandarovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Sirojeva Xiromon Asliddinovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Fazliddinova Gulnihol Alisherovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich',
        'Saydullayev Baxtiyor Sobirovich'
    ]),
    '10V': createTeachers([
        'Meliyeva Sevinch Iskandarovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Sirojeva Xiromon Asliddinovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Fazliddinova Gulnihol Alisherovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich',
        'Saydullayev Baxtiyor Sobirovich'
    ]),
    '10G': createTeachers([
        'Xolikulova Shohista Xolmirzayevna',
        'Ismatova Nozanin Ixtiyorovna',
        'Yuldasheva Surayo Ismatovna',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Amediyev Edib Nadimovich',
        'Amediyeva Yelena Aleksandrovna',
        'Saydullayev Baxtiyor Sobirovich'
    ]),
    '10D': createTeachers([
        'Xolikulova Shohista Xolmirzayevna',
        'Ismatova Nozanin Ixtiyorovna',
        'Yuldasheva Surayo Ismatovna',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Amediyev Edib Nadimovich',
        'Amediyeva Yelena Aleksandrovna',
        'Saydullayev Baxtiyor Sobirovich'
    ]),
    '11A': createTeachers([
        'Meliyeva Sevinch Iskandarovna',
        'Ishankulova Gulchexra Gafurovna',
        'Madaliyeva Muazzam Raximovna',
        'Xolmonova Xurshida Ibadullayevna',
        'Xayrullayev Ikromjon Mirkomilovich',
        'Fazliddinova Gulnihol Alisherovna',
        'Muhamajonova Mohina',
        'Kaxxorova Iroda Dilmurodovna',
        'Amediyeva Yelena Aleksandrovna',
        'Xamrakulova Shaxboz Baxtiyorovich',
        'Saydullayev Baxtiyor Sobirovich'
    ]),
    '11B': createTeachers([
        'Xolikulova Shohista Xolmirzayevna',
        'Ismatova Nozanin Ixtiyorovna',
        'Yuldasheva Surayo Ismatovna',
        'Ibadullayev Rashid Maxmudovich',
        'Kodirova Gulmira Furkatovna',
        'Xamidullayeva Shaxzoda Furkatovna',
        'Amediyev Edib Nadimovich',
        'Amediyeva Yelena Aleksandrovna',
        'Saydullayev Baxtiyor Sobirovich'
    ])
};

export interface Rating {
    id: string;
    teacherId: string;
    studentName?: string;
    className: ClassName;
    score: number; // 1-5
    comment?: string;
    timestamp: number;
}

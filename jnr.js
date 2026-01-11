const STORAGE_KEY = 'mwjruti_motorcycles';

/* DEFAULT DATA */
const defaultMotorcycles = [
    {
        id: 1,
        name: 'SkyGo 150cc',
        price: 'KSh 180,000',
        description: 'Powerful and fuel-efficient motorcycle.',
        year: '2021',
        mileage: '8,500 km',
        location: 'Embu',
        image: null
    },
    {
        id: 2,
        name: 'Boxer 150cc',
        price: 'KSh 165,000',
        description: 'Reliable and economical daily commuter.',
        year: '2020',
        mileage: '12,000 km',
        location: 'Embu',
        image: null
    },
    {
        id: 3,
        name: 'Suzuki DR 200',
        price: 'KSh 190,000',
        description: 'Excellent for both road and off-road.',
        year: '2019',
        mileage: '10,000 km',
        location: 'Mombasa',
        image: null
    }
];

/* LOAD DATA */
let motorcycles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultMotorcycles;

/* SAVE DATA */
function saveMotorcycles() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(motorcycles));
}

/* UPDATE FIELD */
function updateMotorcycle(id, field, value) {
    const bike = motorcycles.find(b => b.id === id);
    if (!bike) return;
    bike[field] = value;
    saveMotorcycles();
}

/* RENDER MOTORCYCLES */
function renderMotorcycles() {
    const grid = document.getElementById('motorcycleGrid');
    grid.innerHTML = motorcycles.map(bike => `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="h-48 bg-gray-200 flex items-center justify-center relative">
                ${
                    bike.image
                    ? `<img src="${bike.image}" class="w-full h-full object-cover">`
                    : `<i data-feather="camera" class="w-12 h-12 text-gray-400"></i>`
                }
                <input type="file"
                       class="absolute inset-0 opacity-0 cursor-pointer"
                       accept="image/*"
                       onchange="uploadImage(event, ${bike.id})">
            </div>

            <div class="p-5 space-y-2">
                <input class="w-full font-bold text-lg border-b"
                       value="${bike.name}"
                       onchange="updateMotorcycle(${bike.id}, 'name', this.value)">

                <input class="w-full text-orange-600 font-semibold border-b"
                       value="${bike.price}"
                       onchange="updateMotorcycle(${bike.id}, 'price', this.value)">

                <textarea class="w-full text-sm text-gray-600 border p-1 rounded"
                          onchange="updateMotorcycle(${bike.id}, 'description', this.value)">${bike.description}</textarea>

                <p class="text-sm text-gray-500">
                    Year:
                    <input class="border-b w-20"
                           value="${bike.year}"
                           onchange="updateMotorcycle(${bike.id}, 'year', this.value)">
                    | Mileage:
                    <input class="border-b w-24"
                           value="${bike.mileage}"
                           onchange="updateMotorcycle(${bike.id}, 'mileage', this.value)">
                </p>

                <p class="text-sm text-gray-500">
                    Location:
                    <input class="border-b w-32"
                           value="${bike.location}"
                           onchange="updateMotorcycle(${bike.id}, 'location', this.value)">
                </p>
            </div>
        </div>
    `).join('');

    feather.replace();
}

/* IMAGE UPLOAD */
function uploadImage(event, id) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        const bike = motorcycles.find(b => b.id === id);
        if (!bike) return;
        bike.image = e.target.result;
        saveMotorcycles();
        renderMotorcycles();
    };
    reader.readAsDataURL(file);
}

/* INIT */
document.addEventListener('DOMContentLoaded', renderMotorcycles);

import sidNoAdmin from "../components/sidNoAdmin.js";
export default {
  template: `<button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div
          class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-medium"
        >
          <ul class="space-y-10">
            <li class="flex items-center">
              <img src="./img/Naryn_coa.svg.png" class="w-14 h-14" />
              <h1
                class="flex items-center p-2 text-blue-700 rounded-lg ms-3 font-bold"
              >
                Нарынская карта
              </h1>
            </li>
              <sidNoAdmin :select="select"></sidNoAdmin>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64 h-screen" id="map"></div>`,

  components: {
    sidNoAdmin, //
  },
  data() {
    return {
      select: [
        { value: "", name: "Все" },
        { value: "power", name: "Электростанции" },
        { value: "minerals", name: "Минералы" },
        { value: "future_power", name: "Строящиеся Электростанции" },
        { value: "return_energy", name: "ВИЭ" },
        { value: "other", name: "Прочее" },
      ],
    };
  },
  methods: {
    async getData(name) {
      const response = await fetch(
        `https://narynmap-35e43-default-rtdb.firebaseio.com/${name}.json`
      );
      const ress = await response.json();
      return await ress;
    },
    initt() {
      const self = this;
      async function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 41.433678, lng: 75.983283 },
          zoom: 8,
        });
        const naryn = await self.getData("map");
        map.data.addGeoJson(naryn);
        map.data.setStyle({
          fillColor: "blue",
          strokeColor: "red",
          strokeWeight: 2,
          fillOpacity: 0.2,
        });

        renderMarker();

        async function renderMarker() {
          const markers = await self.getData("markers");

          await markers.data.forEach((m) => {
            console.log(m);

            const marker = new google.maps.Marker({
              position: { lat: m.lat, lng: m.lng },
              map: map,
            });
            const infoWindow = new google.maps.InfoWindow({
              content: `
              <div class="p-2">
                 <div class="mb-5">
                  <h3 class="mb-2 text-center text-blue-700 font-bold text-xl">${m.title}</h3>
                                 <ul class="mb-5">
      <li>
        <span class="text-base font-bold">Адрес:</span>
        <span class="text-sm font-medium">Ул. Самансур Ата 45</span>
      </li>
        <li>
        <span class="text-base font-bold">Тип:</span>
        <span class="text-sm font-medium">Электростанция </span>
      </li>
    </ul>
                  <p class="text-base">${m.description}</p>
                  </div>
      
                  <img class="w-full  h-68 " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUEATVBgNVr7ri-sJMGwdrzd5QwDE9rZOEA&s" alt="">
              </div>`,
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });
          });
        }
      }

      if (window.google && window.google.maps) {
        initMap();
      } else {
        const interval = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(interval);
            initMap();
          }
        }, 100);
      }
    },
  },
  mounted() {
    this.initt();
  },
};

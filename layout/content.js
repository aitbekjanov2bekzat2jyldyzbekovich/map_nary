import sidNoAdmin from "../components/sidNoAdmin.js";
import windowImg from "../components/windowImg.js";
import appAlert from "../components/alerts.js";

export default {
  template: `
  <windowImg :info="imgMoadal" @close="imgMoadal =[]" />
  <appAlert :alertOp="alertMessage" @clearalert="alertMessage = {}"/>
  <button
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
            <sidNoAdmin :select="select" @eventMessage="filterMessage"></sidNoAdmin>
          </ul>
        </div>
      </aside>
        <div>
     
           <div class="p-4 sm:ml-64 h-screen" id="map" />
  
        </div>
   `,
  components: {
    sidNoAdmin,
    windowImg,
    appAlert,
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
      markers: [],
      markersList: [], // для хранения google.maps.Marker объектов
      map: null,
      imgMoadal: [],
      alertMessage: {},
    };
  },
  methods: {
    filterMessage(n) {
      this.alertMessage = {};
      switch (n) {
        case "power":
          this.sendMessage(
            "Успешно!",
            `Электростанции: ${Object.values(this.markers).length}`,
            "blue"
          );
          break;
        case "minerals":
          this.sendMessage(
            "Успешно!",
            `Минералы: ${Object.values(this.markers).length}`,
            "blue"
          );
          break;
        case "future_power":
          this.sendMessage(
            "Успешно!",
            `Строящиеся Электростанции: ${Object.values(this.markers).length}`,
            "blue"
          );
          break;
        case "return_energy":
          this.sendMessage(
            "Успешно!",
            `ВИЭ: ${Object.values(this.markers).length}`,
            "blue"
          );
          break;
        case "other":
          this.sendMessage(
            "Успешно!",
            `Прочее: ${Object.values(this.markers).length}`,
            "blue"
          );
          break;
      }
    },
    openImageModal(imageList) {
      this.imgMoadal = imageList;
    },
    sendMessage(title, message, color) {
      this.alertMessage = {
        status: true,
        title: title,
        color: color,
        message: message,
      };
    },
    async getData(name, option = "") {
      const url = `https://narynmap-35e43-default-rtdb.firebaseio.com/${name}.json${option}`;

      const response = await fetch(url);
      const data = await response.json();
      return data;
    },

    async initt() {
      const self = this;
      const option =
        this.$route.name == "category"
          ? `?orderBy="${this.$route.name}"&equalTo="${this.$route.params.name}"`
          : "";

      async function initMap() {
        self.map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 41.433678, lng: 75.983283 },
          zoom: 8,
        });
        const naryn = await self.getData("map");
        self.markers = await self.getData("markers", option);

        self.map.data.addGeoJson(naryn);
        self.map.data.setStyle({
          fillColor: "blue",
          strokeColor: "red",
          strokeWeight: 2,
          fillOpacity: 0.2,
        });

        await self.renderMarker(self.markers);
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

    async renderMarker(markers) {
      const arr = Object.values(markers);
      const icons = {
        power:
          "https://img.icons8.com/?size=100&id=Ext6HcYgPkyd&format=png&color=000000",
        minerals:
          "https://img.icons8.com/?size=100&id=YJNwhvDRJXes&format=png&color=000000",
        future_power:
          "https://img.icons8.com/?size=100&id=Ext6HcYgPkyd&format=png&color=000000",
        return_energy:
          "https://img.icons8.com/?size=100&id=DlaHJjjCFSFQ&format=png&color=000000",
        other: "",
      };
      this.markersList.forEach((marker) => marker.setMap(null));
      this.markersList = [];

      arr.forEach((m) => {
        const marker = new google.maps.Marker({
          position: { lat: m.lat, lng: m.lng },
          map: this.map,
          icon: {
            url: icons[m.category], // путь к картинке
            scaledSize: new google.maps.Size(40, 40), // задаем ширину и высоту
            origin: new google.maps.Point(0, 0), // точка начала изображения
            anchor: new google.maps.Point(20, 40), // якорная точка (смещение)
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
              <div class="p-2">
                <div class="mb-5">
                  <h3 class="mb-2 text-center text-blue-700 font-bold text-xl">${
                    m.title
                  }</h3>
                </div>
                <div class="mb-5">
                    <p class="text-sm ">${
                      m.description || "Нету данных ..."
                    } </p>
                </div>
                <div class="mb-5">
                <ul>
                <h3 class="font-bold text-lg mb-5">Более подробная информация о ${
                  m.title
                }</h3>
                <li class="mb-2">
                  <span class="text-base font-bold">Расположение: </span>
                  <span class="text-sm">${m.place || "Нету данных ..."}</span>
                </li>
                  <li class="mb-2">
                  <span class="text-base font-bold">Статус: </span>
                  <span class="text-sm">${m.status || "Нету данных ..."}</span>
                </li>
                  <li class="mb-2">
                  <span class="text-base font-bold">Цель проекта: </span>
                  <span  class="text-sm">${
                    m.Purpose_of_construction || "Нету данных ..."
                  }</span>
                </li>
                
            
                  <li class="mb-2">
                  <span class="text-base font-bold"> Партнеры: </span>
                  <span class="text-sm">${
                    m.partners || "Нету данных ..."
                  }</span>
                </li>
                </ul>
                </div>
                <div class="bg-indigo-300 cursor-pointer">
             <img id="marker-img-${m.lat}-${
            m.lng
          }" class="object-cover w-full h-48" src="${
            m.images[0] ||
            "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1"
          }" alt="">
                </div>
              </div>
            `,
        });

        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);

          google.maps.event.addListenerOnce(infoWindow, "domready", () => {
            const img = document.getElementById(`marker-img-${m.lat}-${m.lng}`);
            if (img) {
              img.addEventListener("click", () => {
                this.openImageModal(m.images);
              });
            }
          });
        });
      });
    },
  },
  mounted() {
    this.initt();
  },
  watch: {
    "$route.params.name"(newCategory) {
      this.initt();
    },
  },
};

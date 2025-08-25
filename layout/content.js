import sidNoAdmin from "../components/sidNoAdmin.js";
import windowImg from "../components/windowImg.js";
import appAlert from "../components/alerts.js";
import adminSide from "../components/adminSide.js";
import loginAdmin from "../components/loginAdmin.js";

export default {
  template: `
    <loginAdmin @login="login" :loader="loader" :status="statusLogin"/>
    <windowImg :info="imgModal" @close="imgModal = []" />
    <appAlert :alertOp="alertMessage" @clearalert="alertMessage = {}"/>

    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500
             rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none
             focus:ring-2 focus:ring-gray-200 dark:text-gray-400
             dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform
             -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-medium space-y-10">
        <ul>
          <li class="flex items-center">
            <img src="./img/Naryn_coa.svg.png" class="w-14 h-14" />
            <h1 class="flex items-center p-2 text-blue-700 rounded-lg ms-3 font-bold">
              Нарынская карта
            </h1>
          </li>
        </ul>

        <adminSide
          v-if="$route.name === 'admin'"
          @closeAdmin="closeAdmin"
          @clearMarker="clearMarker"
          @deleteMarker="deletMarker"
          @editMarker="aditMarker"
          @getValue="addMarker"
          @imgMessage="getImgMessage"
          :acrdionName="acrdionName"
          :statusMarker="statusMarker"
          :formValue="formValue"
          :time="time"
          :category="select"
          :cardinats="cardinats"
        />

        <sidNoAdmin
          v-else
          @searchMarkers="searchMarkers"
          :select="select"
          @eventMessage="filterMessage"
        ></sidNoAdmin>
      </div>
    </aside>

    <div>
      <div class="p-4 sm:ml-64 h-screen" id="map"></div>
    </div>
  `,

  components: {
    sidNoAdmin,
    windowImg,
    appAlert,
    adminSide,
    loginAdmin,
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
      time: "0 : 0 : 0",
      markers: [],
      markersList: [],
      map: null,
      imgModal: [],
      alertMessage: {},
      API_KEY: "AIzaSyDWNlcEM0stBIPMDdVTgXYwKPSkaDmSzsI",
      loader: false,
      statusLogin: false,
      cardinats: [],
      statusMarker: true,
      URL: "https://narynmap-35e43-default-rtdb.firebaseio.com/",
      marker: null,
      acrdionName: "Добавить место",
      currentInfoWindow: null,
      searchQuery: "",
      formValue: {
        Purpose_of_construction: null,
        category: null,
        description: null,
        lat: null,
        lng: null,
        images: [],
        partners: null,
        statusEb: [],
        place: null,
        title: null,
        id: null,
      },
    };
  },

  methods: {
    // ---------- Методы поиска и фильтра ----------
    async searchMarkers(q) {
      if (q.trim() === "") return this.initt();
      const query = encodeURIComponent(q);
      await this.initt(`?orderBy="title"&startAt="${query}"&endAt="${query}\uf8ff"`);
    },

    filterMessage(n) {
      const names = {
        power: "Электростанции",
        minerals: "Минералы",
        future_power: "Строящиеся Электростанции",
        return_energy: "ВИЭ",
        other: "Прочее",
      };
      this.sendMessage("Система:", `${names[n]}: ${Object.values(this.markers).length}`, "blue");
    },

    // ---------- Методы админки ----------
    closeAdmin() {
      if (!confirm("Вы хотите выйти из админ аккаунта ?")) return;
      this.$router.push("/");
      this.clearForm();
      this.logout();
    },

    async clearMarker() {
      if (!confirm("Вы хотите очистить ?")) return;

      try {
        const response = await fetch(`${this.URL}markers.json`, { method: "DELETE" });
        if (response.ok) {
          this.sendMessage("Сервер:", "маркеры удалены !", "green");
          this.clearForm();
          this.statusMarker = true;
          await this.initt();
        } else {
          this.sendMessage("Сервер:", `Ошибка ${response.status}`, "red");
        }
      } catch (err) {
        this.sendMessage("Ошибка:", err.message || err, "red");
      }
    },

    clearForm() {
      this.formValue = {
        Purpose_of_construction: null,
        category: null,
        description: null,
        lat: null,
        lng: null,
        images: [],
        partners: null,
        statusEb: [],
        place: null,
        title: null,
        id: null,
      };
      this.cardinats = [];
      this.acrdionName = "Добавить место";
      this.statusMarker = true;
    },

    async deletMarker() {
      if (!confirm(`Вы хотите удалить маркер: ${this.marker.id}?`)) return;

      try {
        const response = await fetch(`${this.URL}markers/${this.marker.id}.json`, { method: "DELETE" });
        if (response.ok) {
          this.sendMessage("Сервер:", "Маркер успешно удалён!", "green");
          this.clearForm();
          await this.initt();
        } else {
          this.sendMessage("Сервер:", `Ошибка ${response.status}`, "red");
        }
      } catch (err) {
        this.sendMessage("Ошибка:", err.message || err, "red");
      }
    },

    async aditMarker() {
      try {
        if (this.marker && this.marker.id) {
          const response = await fetch(`${this.URL}markers/${this.marker.id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.formValue),
          });

          if (response.ok) {
            this.initt();
            this.sendMessage("Сервер:", `${this.marker.id} - маркер изменён !`, "green");
          }
        }
      } catch (err) {
        this.sendMessage("Ошибка:", `${err}`, "red");
      } finally {
        this.clearForm();
      }
    },

    async addMarker(marker) {
      try {
        if (!marker) return;
        const response = await fetch(`${this.URL}markers.json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(marker),
        });

        if (response.ok) {
          const data = await response.json();
          await fetch(`${this.URL}markers/${data.name}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: data.name }),
          });
          this.initt();
        }
      } catch (err) {
        this.sendMessage("Ошибка:", `${err}`, "red");
      } finally {
        this.clearForm();
        this.sendMessage("Сервер:", "успешно добавлено !", "green");
      }
    },

    getImgMessage(e) {
      this.sendMessage(e.title, e.message, e.color);
    },

    openImageModal(imageList) {
      this.imgModal = imageList || [];
    },

    sendMessage(title, message, color) {
      this.alertMessage = { status: true, title, color, message };
    },

    // ---------- Методы авторизации ----------
    async login(userData) {
      this.loader = true;
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userData.email, password: userData.password, returnSecureToken: true }),
        });

        const result = await response.json();

        if (response.ok) {
          const expiresAt = Date.now() + result.expiresIn * 1000;
          localStorage.setItem("refreshToken", result.refreshToken);
          localStorage.setItem("expiresIn", expiresAt);
          this.statusLogin = false;
          this.sendMessage("Сервер:", "Вы вошли в аккаунт", "green");
        } else {
          this.sendMessage("Сервер:", result.error.message, "red");
        }
      } catch (error) {
        this.sendMessage("Сервер:", error.message || error, "red");
      } finally {
        this.loader = false;
      }
    },

    logout() {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiresIn");
      this.statusLogin = this.$route.name === "admin";
      if (this.$route.name === "admin") this.sendMessage("Система:", "Вы вышли из аккаунта !", "blue");
    },

    async checkRefreshToken() {
      const refreshToken = localStorage.getItem("refreshToken");
      const expiresAt = localStorage.getItem("expiresIn");

      if (!refreshToken || !expiresAt) {
        this.logout();
        return false;
      }

      const timeLeft = Math.floor((expiresAt - Date.now()) / 1000);

      if (timeLeft <= 0) {
        this.logout();
        return false;
      }

      if (timeLeft < 300 && this.$route.name === "admin") {
        this.sendMessage(
          "Система:",
          `Система выйдет из аккауна через ${timeLeft} сек.  \nвам нужно снова войти в аккаунт !`,
          "yellow"
        );
      }

      return true;
    },

    // ---------- Методы работы с картой ----------
    async getData(name, option = "") {
      const url = `${this.URL}${name}.json${option}`;
      const response = await fetch(url);
      return response.json();
    },

    async initt(search) {
      const self = this;
      const option = this.$route.name === "category"
        ? `?orderBy="category"&equalTo="${this.$route.params.name}"`
        : "";

      async function initMap() {
        self.map = new google.maps.Map(document.getElementById("map"), { center: { lat: 41.433678, lng: 75.983283 }, zoom: 8 });
        const naryn = await self.getData("map");
        self.markers = await self.getData("markers", option || search);
        self.map.data.addGeoJson(naryn);
        self.map.data.setStyle({ fillColor: "blue", strokeColor: "red", strokeWeight: 2, fillOpacity: 0.2 });

        self.map.data.addListener("click", (event) => {
          if (self.$route.name === "admin" && self.statusMarker) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            self.cardinats = [lat, lng];
            self.sendMessage("Система:", `Кардинаты: X= ${lat}, Y= ${lng}`, "blue");
          }
        });

        await self.renderMarker(self.markers);
      }

      if (window.google && window.google.maps) initMap();
      else {
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
        power: "https://img.icons8.com/?size=100&id=Ext6HcYgPkyd&format=png&color=000000",
        minerals: "https://img.icons8.com/?size=100&id=YJNwhvDRJXes&format=png&color=000000",
        future_power: "https://img.icons8.com/?size=100&id=Ext6HcYgPkyd&format=png&color=000000",
        return_energy: "https://img.icons8.com/?size=100&id=DlaHJjjCFSFQ&format=png&color=000000",
      };

      this.markersList.forEach((marker) => marker.setMap(null));
      this.markersList = [];

      arr.forEach((m) => {
        const marker = new google.maps.Marker({
          position: { lat: m.lat, lng: m.lng },
          map: this.map,
          icon: { url: icons[m.category], scaledSize: new google.maps.Size(40, 40), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(20, 40) },
        });

        this.markersList.push(marker);

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <div class="mb-5">
                <h3 class="mb-2 text-center text-blue-700 font-bold text-xl">${m.title}</h3>
              </div>
              <div class="mb-5"><p class="text-sm">${m.description || "Нету данных ..."}</p></div>
              <div class="mb-5">
                <ul>
                  <h3 class="font-bold text-lg mb-5">Более подробная информация о ${m.title}</h3>
                  <li class="mb-2"><span class="text-base font-bold">Расположение: </span><span class="text-sm">${m.place || "Нету данных ..."}</span></li>
                  <li class="mb-2"><span class="text-base font-bold">Статус: </span><span class="text-sm">${m.statusEb || "Нету данных ..."}</span></li>
                  <li class="mb-2"><span class="text-base font-bold">Цель проекта: </span><span class="text-sm">${m.Purpose_of_construction || "Нету данных ..."}</span></li>
                  <li class="mb-2"><span class="text-base font-bold">Партнеры: </span><span class="text-sm">${m.partners || "Нету данных ..."}</span></li>
                </ul>
              </div>
              <div class="bg-indigo-300 cursor-pointer">
                <img id="marker-img-${m.lat}-${m.lng}" class="object-cover w-full h-48" src="${(m.images && m.images[0]) || 'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1'}" alt="">
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);
          google.maps.event.addListenerOnce(infoWindow, "domready", () => {
            const img = document.getElementById(`marker-img-${m.lat}-${m.lng}`);
            if (img) img.addEventListener("click", () => this.openImageModal(m.images || []));
          });
        });

        marker.addListener("click", () => {
          if (this.currentInfoWindow) this.currentInfoWindow.close();

          this.currentInfoWindow = infoWindow;

          if (this.$route.name === "admin") {
            this.statusMarker = false;
            const gotMarker = Object.values(this.markers).filter((i) => i.id === m.id);
            this.marker = gotMarker[0];
            this.formValue = this.marker;
            this.cardinats = [this.marker.lat, this.marker.lng];
            this.sendMessage("Система:", `Вы получили маркер ${this.marker.id},`, "blue");
            this.acrdionName = "Изменить маркер";
          }
        });

        infoWindow.addListener("closeclick", () => {
          this.statusMarker = true;
          this.marker = null;
          this.clearForm();
          this.currentInfoWindow = null;
        });
      });
    },

    admintime() {
      setInterval(() => {
        const expiresAt = localStorage.getItem("expiresIn");
        if (!expiresAt) return;

        const totalSeconds = Math.floor((expiresAt - Date.now()) / 1000);
        if (totalSeconds <= 0) {
          this.time = "0 : 0 : 0";
          this.logout();
          return;
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        this.time = `${hours} : ${minutes} : ${seconds}`;
      }, 1000);
    },
  },

  mounted() {
    this.initt();
    this.checkRefreshToken();
    this.admintime();
    setInterval(() => this.checkRefreshToken(), 5 * 60 * 1000);
  },

  watch: {
    "$route.params.name": {
      handler() {
        this.initt();
      },
      immediate: true,
    },
  },
};

const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    // model
    const select = [
      { value: "", name: "Все" },
      { value: "power", name: "Электростанции" },
      { value: "minerals", name: "Минералы" },
      { value: "future_power", name: "Строящиеся Электростанции" },
      { value: "return_energy", name: "ВИЭ" },
      { value: "other", name: "Прочее" },
    ];

    // methodsData
    const windowWidth = ref(window.innerWidth);
    const statusSidebar = ref(true);

    // methods
    const updateWidth = () => {
      windowWidth.value = window.innerWidth;
      statusSidebar.value = windowWidth <= 768 ? false : true;
    };
    const opens = () => {
      statusSidebar.value = true;
      console.log(statusSidebar.value);
      
    };
    // init
    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.433678, lng: 75.983283 },
        zoom: 10,
      });
    };

    onMounted(() => {
      window.addEventListener("resize", updateWidth);
      initMap();
      window.initMap = initMap;
    });

    return {
      select,
      windowWidth,
      statusSidebar,
      opens,
    };
  },
}).mount("#app");

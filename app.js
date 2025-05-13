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

    // init
    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.433678, lng: 75.983283 },
        zoom: 10,
      });
    };

    onMounted(() => {
      initMap();
      window.initMap = initMap;
    });

    return {
      select,
    };
  },
}).mount("#app");

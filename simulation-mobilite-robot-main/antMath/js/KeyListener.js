window.addEventListener("keydown", function (event) {
    // console.log(event);

    switch (event.key) {

      case "space":
        console.log("space");
        pauseDraw();
        // Faire quelque chose pour la touche "esc" pressée.
        break;
      default:
        return; // Quitter lorsque cela ne gère pas l'événement touche.
    }
  
  }, true);
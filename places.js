window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [

       {
           name: 'Da biste osvojili nagradu uslikajte oznaku na drvetu',
           location: {
               lat: 44.06426,
               lng: 20.47667,
           }
        
       },
    
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       let name2 = place.name;
       

       const model = document.createElement('a-image');
                   model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                   model.setAttribute('name', name2);
                   model.setAttribute('src', 'logo7_17_171341.png');
                   model.setAttribute('width', '1'); 
                   model.setAttribute('height', '1'); 




                   // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                   model.setAttribute('scale', '20, 20');

                   

    

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });
       
       const clickListener = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        const name = ev.target.getAttribute('name');
        
        const el = ev.detail.intersection && ev.detail.intersection.object.el;

        

        if (el && el === ev.target) {

            const distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');

            const label = document.createElement('span');
            const msg = document.createElement('p');
            const container = document.createElement('div');
            const btn = document.createElement('button');
            container.setAttribute('id', 'place-label');
            label.innerText = name;
            msg.innerText = distanceMsg;
            btn.innerText = 'Close';
            container.appendChild(label);
            container.appendChild(msg);
            container.appendChild(btn);
            document.body.appendChild(container);

            btn.addEventListener("click", function() {
                container.parentElement.removeChild(container);
              });

           // setTimeout(() => {
             //   container.parentElement.removeChild(container);
            //}, 1500);
        }
    };

    model.addEventListener('click', clickListener);
       scene.appendChild(model);
   });
}
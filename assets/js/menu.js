$(document).ready(function () {


  //document.onload('DOMContentLoaded', () => {
  const cartaContainer = document.querySelector('#tabla-container');

  // Generar HTML para cada tabla
  function generateTableCard(tabla, index) {
    return `
          <div class="col">
              <div class="card shadow-sm" data-aos="${index % 2 === 0 ? 'flip-up' : 'flip-left'}">
                  <img src="${tabla.imagePath}" class="rounded" alt="${tabla.tabla}">
                  <div class="card-body">
                      <h5 class="card-title">${tabla.tabla}</h5>
                      <p class="card-text">
                          <p class="wampus negrita acme-regular h3">${tabla.bocados}</p>
                          <br>
                          <small>
                              <ul>
                                  ${tabla.ingrediente.split('\n').map(item => {
      const cleanItem = item.replace(/^\s*\*\s*/, ''); // Eliminar el asterisco y espacios al inicio
      const match = cleanItem.match(/^(.*?)($begin:math:text$(.*?)$end:math:text$)?$/);
      return match
        ? `<li>${match[1].trim()}${match[3] ? ` <sub>(${match[3]})</sub>` : ''}</li>`
        : `<li>${cleanItem}</li>`;
    }).join('')}
                              </ul>
                          </small>
                      </p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="${tabla.tabla}" id="check-${index}">
                              <label class="form-check-label acme-regular h2" for="check-${index}">
                                  ${tabla.precio}
                              </label>
                          </div>
                          <small class="text-body-secondary">
                              <i class="bi bi-alarm fs-5 text-body-secondary"></i> 30 mins
                          </small>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }

  // Generar HTML para cada item de la carta
  function generateCartaCard(item, index) {
    return `
        <div class="col">
            <div class="card shadow-sm" data-aos="${index % 2 === 0 ? 'flip-up' : 'flip-left'}">
                <img src="${item.imgPath}" class="rounded" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">
                        <small>
                            <ul>
                                ${item.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>
                        </small>
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="${item.name}" id="check-carta-${index}">
                            <label class="form-check-label acme-regular h2" for="check-carta-${index}">
                                ${item.price}
                            </label>
                        </div>
                        <small class="text-body-secondary">
                            <i class="bi bi-alarm fs-5 text-body-secondary"></i> 30 mins
                        </small>
                    </div>
                </div>
            </div>
        </div>
    `;
  }

  console.log('hola');

  // Cargar JSON y generar contenido dinámico
  fetch('./assets/data/tablas.json')
    .then(response => response.json())
    .then(data => {
      const cardsHTML = data.map(generateTableCard).join('');
      cartaContainer.innerHTML = cardsHTML;
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

  // Cargar JSON y generar contenido dinámico para carta
  fetch('./assets/data/carta.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const categoryHTML = category.items.map(generateCartaCard).join('');
        cartaContainer.innerHTML += categoryHTML;
      });
    })
    .catch(error => console.error('Error al cargar el JSON de carta:', error));

});
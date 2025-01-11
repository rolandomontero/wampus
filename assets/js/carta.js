document.addEventListener('DOMContentLoaded', () => {
  const cartaContainer = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-3.g-3');

  // Generar HTML para cada tabla
  function generateTableCard(tabla, index) {
      return `
          <div class="col">
              <div class="card shadow-sm" data-aos="${index % 2 === 0 ? 'flip-up' : 'flip-left'}">
                  <img src="${tabla.imagePath}" class="rounded" alt="${tabla.tabla}">
                  <div class="card-body">
                      <h5 class="card-title">${tabla.tabla}</h5>
                      <p class="card-text">
                          <p class="wampus negrita">${tabla.bocados}</p>
                          <br>
                          <small>
                              <ul>
                                  ${tabla.ingrediente.split('\n').map(item => {
                                      const match = item.match(/^(.*?)($begin:math:text$(.*?)$end:math:text$)?$/);
                                      return match
                                          ? `<li>${match[1].trim()}${match[3] ? ` <sub>(${match[3]})</sub>` : ''}</li>`
                                          : `<li>${item}</li>`;
                                  }).join('')}
                              </ul>
                          </small>
                      </p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="${tabla.tabla}" id="check-${index}">
                              <label class="form-check-label" for="check-${index}">
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

  // Cargar JSON y generar contenido dinámico
  fetch('tabla.json')
      .then(response => response.json())
      .then(data => {
          const cardsHTML = data.map(generateTableCard).join('');
          cartaContainer.innerHTML = cardsHTML;
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
});
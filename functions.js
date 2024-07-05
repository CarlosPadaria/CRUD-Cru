const BTN_EDITAR = (id) => `<button class='btn btn-warning' onclick='editar(${id})'>Editar</button>`
const BTN_EXCLUIR = "<button class='btn btn-danger'>Excluir</button>"

start();

u('form').on("submit", function (e) {
  e.preventDefault();
})

u('form').handle('submit', async e => {
  const body = new FormData(e.target);
  const data = await fetch('/contact', {
    method: 'POST', body
  }).then(res => res.json());
  console.log('Response data:', data);
});

function novo() {
  const modal = new bootstrap.Modal(document.getElementById('modal-contatos'))
  modal.show();
}

function editar(id) {
  //document.getElementById('toast').show()
  // u().toast("show")
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl)
  })
  toastList.forEach(toast => toast.show())
}

function start() {
  var options = {
    valueNames: ['id', 'contato', 'opcoes'],
    item: '<tr><th scope="row" class="id"></th><td class="contato"></td><td class="opcoes text-center"></td></tr>',
    page: 5,
    pagination: {
      listClass: 'paginacao pagination',
      item: function (values) {
        return `<li class="page-item"><a class='page-link' href="#">${values.page}</a></li>`
      }
    }
  };

  var list = new List('table', options, []);

  for (let i = 2; i < 50; i++) {
    list.add({ id: i, contato: "Chrys", opcoes: BTN_EDITAR(i) + " " + BTN_EXCLUIR })
  }
}
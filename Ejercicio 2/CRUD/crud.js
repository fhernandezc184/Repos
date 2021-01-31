(function(){
    var libros = [
        {
            ISBN: 1,
            Nombre:'Biologia 1',
            Ano:2006,
            Genero: 'Ciencia',
            Disponible:true
        },
        {
            ISBN: 2,
            Nombre:'Matematicas  Discretas',
            Ano:2016,
            Genero: 'Informatica',
            Disponible:false
        },
        {
            ISBN: 3,
            Nombre:'Java  Orientado a Objetos',
            Ano:2010,
            Genero: 'Informatica',
            Disponible:true
        },
        {
            ISBN: 4,
            Nombre:'Las isla de los hombres solos',
            Ano:1970,
            Genero: 'Novela',
            Disponible:false
        },
        {
            ISBN: 5,
            Nombre:'La Biblbia',
            Ano:1,
            Genero: 'Religioso',
            Disponible:false
        }
    ];
    var libro = {
        ISBN: 0,
        Nombre: '',
        Ano: 0,
        Genero: '',
        Disponible:false
    }

    let ISBN = {};
    let Nombre = {};
    let Ano = {};
    let Genero = {};
    let Disponible = {};
    let btnAceptar = {};
    let btnCancelar = {};


    const inicializar = function () {
        MostrasLibros();
        AgregarChecked();
        ISBN = document.getElementById('ISBN');
        Nombre = document.getElementById('nombre');
        Ano = document.getElementById('ano');
        Genero = document.getElementById('genero');
        Disponible = document.getElementById('disponible');
        btnAceptar = document.getElementById('btnAceptar');
        btnCancelar = document.getElementById('btnCancelar');
        asociarBotones();
    }

    const asociarBotones = function() 
    {
        btnAceptar.onclick = ejecutarAccion;
        btnCancelar. onclick = cancelarAccion;
    }


    function MostrasLibros() {
        let html = '';
        libros.forEach(libro => {
            let htmlSegment =
                `<tr id="row${libro.ISBN}" class="td-row">
                <th id="Id${libro.ISBN}">${libro.ISBN}</th>
                <th id="nombre${libro.ISBN}">${libro.Nombre}</th>
                <th id="ano${libro.ISBN}">${libro.Ano}</th>
                <th id="genero${libro.ISBN}">${libro.Genero}</th>
                <th ><input class="form-check-input" type="checkbox" value="${libro.Disponible}" id="disponible${libro.ISBN}" disabled></th>
                <th>
                    <button class="material-icons btn-primary btn edit" id="edit_button${libro.ISBN}" onclick="edit_row(${libro.ISBN})">Edit</button>
                    <button class="material-icons btn-success btn save" id="save_button${libro.ISBN}"  style="display:none" onclick="save_row(${libro.ISBN})">save</button>
                </th>
                <th><button class="material-icons btn-danger btn remove" id="delete_button${libro.ISBN}" onclick="delete_row(${libro.ISBN})">delete</button></th>
            </tr>`;
            html += htmlSegment;
        });
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = html;
    }

    function AgregarChecked() {
        let html = '';
        libros.forEach(libro => {
            if(libro.Disponible){
                var checkbox = document.getElementById("disponible"+libro.ISBN);
                checkbox.checked = true;
            }
        });
    }

    function AgregarNuevoLibro()
    {
        let resultado = document.getElementById('resultado');
        var selection = Genero;
        var textSelected = selection.options[selection.selectedIndex].text;
        libro.ISBN = parseInt(ISBN.value);
        libro.Nombre = Nombre.value
        libro.Ano = Ano.value;
        libro.Genero = textSelected;
        libro.Disponible = Disponible.checked;
        libros.push(libro);
         resultado.innerHTML +=
            `<tr id="row${libro.ISBN}" class="td-row">
            <th id="Id${libro.ISBN}">${libro.ISBN}</th>
            <th id="nombre${libro.ISBN}">${Nombre.value}</th>
            <th id="ano${libro.ISBN}">${Ano.value}</th>
            <th id="genero${libro.ISBN}">${textSelected}</th>
            <th ><input class="form-check-input" type="checkbox" value="${libro.Disponible}" id="disponible${libro.ISBN}" disabled></th>
            <th>
                <button class="material-icons btn-primary btn edit" id="edit_button${libro.ISBN}" onclick="edit_row(${libro.ISBN})">Edit</button>
                <button class="material-icons btn-success btn save" id="save_button${libro.ISBN}"  style="display:none" onclick="save_row(${libro.ISBN})">save</button>
            </th>
            <th><button class="material-icons btn-danger btn remove" id="delete_button${libro.ISBN}" onclick="delete_row(${libro.ISBN})">delete</button></th>
        </tr>`;
    }

    var ejecutarAccion = function(e) {
        e.preventDefault();
        AgregarNuevoLibro();
        AgregarChecked();
        limpiarDatos();
    }

    const limpiarDatos = function()
    {
        document.getElementById('frmDatos').reset();
        libro = {
            ISBN: '',
            Nombre: '',
            Ano: 0,
            Genero: '',
            Disponible:false
        }
    }
    

    var cancelarAccion = function(e)
    {
        e.preventDefault();
        console.log("Cancelado");
    }
    inicializar();




})()

function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";

 var isbn = document.getElementById("Id"+no)
 var nombre = document.getElementById("nombre"+no);
 var ano = document.getElementById("ano"+no);
 var genero = document.getElementById("genero"+no);
 var disponible = document.getElementById("disponible"+no);
	
 var isbn_data=isbn.innerHTML;
 var nombre_data=nombre.innerHTML;
 var ano_data=ano.innerHTML;
 var genero_data=genero.innerHTML;
	
 isbn.innerHTML="<input type='number' id='isbn_text"+no+"' value='"+isbn_data+"'>";
 nombre.innerHTML="<input type='text' id='nombre_text"+no+"' value='"+nombre_data+"'>";
 ano.innerHTML="<input type='number' id='ano_text"+no+"' value='"+ano_data+"'>";
 genero.innerHTML = 
    `<select class="form-select" aria-label="Default select example" id="genero_text${no}">
        <option selected>${genero_data}</option>
        <option value="Fantasia">Fantasia</option>
        <option value="Ciencia">Ciencia</option>
        <option value="Informatica">Informatica</option>
    </select>`;
  disponible.disabled = false;  
    
}

const save_row = function(no)
{
 var isbn_val=parseInt(document.getElementById("isbn_text"+no).value);
 var nombre_val=document.getElementById("nombre_text"+no).value;
 var ano_val=parseInt(document.getElementById("ano_text"+no).value);
 var genero_val = document.getElementById("genero_text"+no).value;
 var disponible = document.getElementById("disponible"+no);


 document.getElementById("Id"+no).innerHTML=isbn_val;
 document.getElementById("nombre"+no).innerHTML=nombre_val;
 document.getElementById("ano"+no).innerHTML=ano_val;
 document.getElementById("genero"+no).innerHTML=genero_val;

 disponible.disabled = true;  
 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}


async function delete_row(no)
{
 document.getElementById('row'+no).outerHTML="";
}



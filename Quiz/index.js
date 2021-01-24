(function () {
    var persona = {
        identificacion: {},
        nombre: {},
        apellidos: {},
        email: {},
        direccion: {},
        btnAceptar: {},
        btnCancelar: {},
        init: function () {
            this.identificacion = document.getElementById('identificacion');
            this.nombre = document.getElementById('nombre');
            this.apellidos = document.getElementById('apellidos');
            this.email = document.getElementById('email');
            this.direccion = document.getElementById('direccion');
            this.btnAceptar = document.getElementById('btnAceptar');
            this.btnCancelar = document.getElementById('btnCancelar');
            this.bind();
        },
        bind: function () {
            this.btnAceptar.onclick = ejecutarAccion;
            this.btnCancelar.onclick = cancelarAccion;
        }
    }

    var ejecutarAccion = function (e) {
        e.preventDefault();
        let resultado = document.getElementById('resultado');
        resultado.innerHTML +=
            `<tr>
            <th>${persona.identificacion.value}</th>
            <th>${persona.nombre.value + " " + persona.apellidos.value}</th>
            <th>${persona.email.value}</th>
            <th>${persona.direccion.value}</th>
        </tr>`;
        sendData()
    }
    var cancelarAccion = function (e) {
        e.preventDefault();
        document.getElementById('frmDatos').reset();
    }

    async function getData() {
        let url = 'https://jsonplaceholder.typicode.com/users';
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function MostraUsuarios() {
        let users = await getData();
        let html = '';
        users.forEach(user => {
            let htmlSegment =
                `<tr id="row${user.id}" class="td-row">
                <th id="row${user.id}">${user.id}</th>
                <th id="name${user.id}">${user.name}</th>
                <th id="email${user.id}">${user.email}</th>
                <th id="address${user.id}">${user.address.street}</th>
                <th>
                    <button class="material-icons btn-primary btn edit" id="edit_button${user.id}" onclick="edit_row(${user.id})">create</button>
                    <button class="material-icons btn-success btn save" id="save_button${user.id}"  style="display:none" onclick="save_row(${user.id})">save</button>
                </th>
                <th><button class="material-icons btn-danger btn remove" id="delete_button${user.id}" onclick="delete_row(${user.id})">delete</button></th>
            </tr>`;
            html += htmlSegment;
        });
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = html;
    }
    async function sendData() {
        let url = 'https://jsonplaceholder.typicode.com/posts';
        const Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona = {
                "identificacion": document.getElementById('identificacion').value,
                "nombre": document.getElementById('nombre').value + " " + document.getElementById('apellidos').value,
                "email": document.getElementById('email').value,
                "direccion": document.getElementById('direccion').value
            })
        });
        const content = await Response.json();
        console.log(content);
    }

    persona.init();
    MostraUsuarios();
})()

function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var name=document.getElementById("name"+no);
 var email=document.getElementById("email"+no);
 var address=document.getElementById("address"+no);
	
 var name_data=name.innerHTML;
 var email_data=email.innerHTML;
 var address_data=address.innerHTML;
	
 name.innerHTML="<input type='text' id='name_text"+no+"' value='"+name_data+"'>";
 email.innerHTML="<input type='text' id='country_text"+no+"' value='"+email_data+"'>";
 address.innerHTML="<input type='text' id='age_text"+no+"' value='"+address_data+"'>";
}


async function save_row(no)
{
 var name_val=document.getElementById("name_text"+no).value;
 var email_val=document.getElementById("country_text"+no).value;
 var address_val=document.getElementById("age_text"+no).value;


 let url = 'https://jsonplaceholder.typicode.com/posts/'+no;
 const Response = await fetch(url, {
     method: 'PUT',
     headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(persona = {
         "identificacion": document.getElementById('row'+no).value,
         "nombre": name_val,
         "email": email_val,
         "direccion": address_val
     })
 });
 const content = await Response.json();
 console.log(content);

 document.getElementById("name"+no).innerHTML=name_val;
 document.getElementById("email"+no).innerHTML=email_val;
 document.getElementById("address"+no).innerHTML=address_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}


async function delete_row(no)
{
 document.getElementById('row'+no).outerHTML="";

 let url = 'https://jsonplaceholder.typicode.com/posts/'+no;
 const Response = await fetch(url, {
     method: 'DELETE',
     headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
     }
 });
 const content = await Response.json();
 console.log(content);
}
const socket = io()
const form = document.getElementById("producto")

const productsList = document.getElementById('productos')
$(document).ready(function() {
    
     let cart = fetch('/carts', {method:"POST"})
    .then((response) =>  console.log("la rta es"+response)  )
    .catch((error) => console.log(error))
  
    

    $("#filter").change(function(){
        $("#order").css("display", "block")
    /*   const order =  $(this).val()
        const filter = $("#filter").val()
        
        if( filter == null){
            location.href = '/products?limit=4&numPage=1&order='+order
        }else{
            location.href = '/products?limit=4&numPage=1&order='+order+"&filter="+filter
        } */
    }) 

$(".addCart").on("click", function(){
    console.log("ingreso a add")
    $(this).attr('disabled')
    const pid = $(this).attr("id");
   
    /* socket.emit("cart", {
        'pid': pid,
    }) */

        $.ajax({
            url: `/carts/products/${pid}`,
            type: 'POST', // O 'POST' si necesitas enviar datos al servidor
            success: function(response) {
                //console.log(response)
                Swal.fire({
                    title: 'Atencion',
                    text: response.msg,
                    }) 
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    
})

$("#filters").on("click", function(){
    const filter = $("#filter").val()
    const order = $("#order").val()
    if(filter === null){
        Swal.fire({
            title: 'Atencion',
            text: "Debe seleccionar un filtro",
            }) 
    }else{
        if(order == null){
            location.href = '/products?limit=4&numPage=1&filter='+filter
        }else{
            location.href = '/products?limit=4&numPage=1&filter='+filter+"&order="+order
        }
    }
})



//const datos = '';
form.addEventListener("submit", (event) =>{
    const files = document.getElementById("thumbnail").files.length
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const status = document.getElementById("status").value
    const stock = document.getElementById("stock").value
    const code = document.getElementById("code").value
    const category = document.getElementById("category").value
 
    if(files){
        const thumbnails = []
     for (let i = 0; i < files; i++) {
        let url = '/uploads/'+document.getElementById('thumbnail').files[i].name
        thumbnails.push(url)
    }    
    }
    const thumbs = files? JSON.stringify(thumbnails) : []
    
   
    if(title === '' || description === '' || code === '' || price === '' || status === '' || stock === '' || category === '' ){
        Swal.fire({
            title: 'Atencion',
            input: 'text',
            text: 'Todos los campos son obligatorios! ',
            inputValidator: value => {
                return !value && 'Corrobore que todos los campos tengan valores y vuelva a intentar'
            },
            allowOutsideClick: false
        })
        
    }else{
        let productData = {
            "product": {
                'title': title,
                'description': description,
                'price': price,
                'thumbnails': thumbs,
                'code': code,
                'stock': stock,
                'status': status,
                'category': category
            }
        };
        let products = fetch('/products', {method:"POST", body: JSON.stringify(productData)})
        .then((response) =>  console.log("la rta es"+response)  )
        .catch((error) => console.log(error))
      
     
        /* socket.emit("product", {
            'title': title,
            'description': description,
            'price': price,
            'thumbnails': thumbs,
            'code': code,
            'stock': stock,
            'status': status,
            'category': category
        }) */
    }
})

form.reset()

socket.on("messageLogs", data =>{
    
     if(data.length !== 0){
    
            Swal.fire({
            title: 'Atencion',
            text: data.msg,
            }) 
            location.reload()
         
    } 
    
})

socket.on("messageCart", data =>{
    
    if(data.length !== 0){
   
           Swal.fire({
           title: 'Atencion',
           text: data.msg,
           }) 
           $(".addCart").removeAttr('disabled')
   } 
   
})
 
})
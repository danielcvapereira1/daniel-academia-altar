$opinions = [ ];

function Queue(){
    this.data = [];
    this.enqueue = function(element){
        this.data.push(element)
    }
    this.dequeue = function(){
        this.data.splice(0,1);
        return this.data
    }
};

function Library(){                                  //Class created
    this.books = new Queue();  
    this.booksViewed = new Queue();                               
    this.addBook = function(book){                   //Method created   
        //this.books.push(book);
        this.books.enqueue(book);  
    }
    this.index=1;                                   //Attribute or property created
    this.nextBook = function(){
        var book = this.books.data[0]
        this.books.dequeue();
        this.booksViewed.enqueue(book);
        book.render();
        this.index++
    }
    this.addLikes = function(){
        this.booksViewed.data[this.index-1].likes++;
    }
    this.addDislikes = function(){
        this.booksViewed.data[this.index-1].dislikes++;
    }
}


function Book(title,descricao,image,links){
    this.title = title;
    this.descricao = descricao;
    this.image = image;
    this.links = links;
    this.likes = 0;
    this.dislikes = 0;
    this.render = function(){
        $("#title").html(this.title).fadeIn(500);
        $("#descricao").html(this.descricao).fadeIn(500);
        $(".img-thumbnail").attr("src",this.image).fadeIn(500);
        $(".wikipedia").attr("href",this.links.wikipedia);
        $(".foursquare").attr("href",this.links.foursquare);
        $(".zomato").attr("href",this.links.zomato);
        $(".amazon").attr("href",this.links.amazon);
    }
}

var library = new Library(); //Instance calling (begins to exist)

                       
var book1 = new Book("1984","Nineteen Eighty-Four, often published as 1984, is a dystopian novel published in 1949 by English author George Orwell.","imgs/book1.jpeg",{wikipedia:"http://www.wikipedia.pt",foursquare:"http://www.foursquare.com",
            zomato:"http://www.zomato.com/portugal", amazon:"http://www.amazon.com"});

var book2 = new Book("A jangada de pedra","A Jangada de Pedra é um romance de José Saramago. Conta a história ficcional da separação geográfica da Península Ibérica do restante continente europeu.","imgs/book2.jpeg",{wikipedia:"http://www.wikipedia.pt",foursquare:"http://www.foursquare.com",
            zomato:"http://www.zomato.com/portugal", amazon:"http://www.amazon.com"});

var book3 = new Book("Código Da Vinci","The Da Vinci Code is a 2003 mystery-detective novel by Dan Brown.","imgs/book3.jpeg",{wikipedia:"http://www.wikipedia.pt",foursquare:"http://www.foursquare.com",
            zomato:"http://www.zomato.com/portugal", amazon:"http://www.amazon.com"});


library.addBook(book1);
library.addBook(book2);
library.addBook(book3);



$('button.começar').click(function(){
    $startPage = $('.active');
    $startPage.removeClass('active');
    //library.nextBook();
    book1.render();
    library.books.dequeue();
    library.booksViewed.enqueue(book1);
    $('#startOfPage').hide();
    $('.book:first-child').addClass('active');
    $('#buttonDislike').css("display","inline-block");
    $('#buttonLike').css("display","inline-block")
});

// Mudar para o livro seguinte e criar e guardar dentro do campo .opinion "like" ou "dislike"

$('#buttonLike').click(function(){
       
        if (library.books.data.length){
            //library.books[library.index-1].likes++;
            library.addLikes();
            library.nextBook();
        } else {
            //library.books[library.index-1].likes++;
            library.addLikes();
            $('#mainPage').hide();
            $('#endOfPage').show();   
            $('#heading1').hide(); 
            completeTable();
            likesCounter();
        }    
})

$('#buttonDislike').click(function(){
    
        if (library.books.data.length){
            //library.books[library.index-1].dislikes++;
            library.addDislikes();
            library.nextBook();
            
        } else {
            //library.books[library.index-1].dislikes++;
            library.addDislikes();
            $('#mainPage').hide();
            $('#endOfPage').show();   
            $('#heading1').hide(); 
            completeTable();
            likesCounter();
        }    
});
// Função de preenchimento da tabela final

function completeTable(){

        $.each(library.booksViewed.data,function(index,book){
        
        var html = "<tr>";
        html += "<td>";
        html += book.title;
        html += "</td>";
        html += "<td>";
        html += "<img src=\""+book.image+"\" style=\"width:80px;height:120px\"></img>";
        html += "</td>";
        html += "<td>";
        html += book.likes;
        html += "</td>";
        html += "<td>";
        html += book.dislikes;
        html += "</td>";
        html += "</tr>";
        
        $('#tblResults tbody').append(html);
    });
    }

function likesCounter(){
var likes = 0;
var dislikes = 0;
    $.each(library.booksViewed.data,function(index,book){
    
        if(book.likes==1){
            likes++;
        } else {
            dislikes++;
        }
    });
    $("#LikesID2").text(likes);
    $("#DislikesID").text(dislikes);
}

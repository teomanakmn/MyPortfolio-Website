document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Formun varsayılan gönderimini engelle
        alert("Mesajınız gönderildi!"); // Kullanıcıya bir bildirim göster
        form.reset(); // Formu sıfırla
    });
}); 


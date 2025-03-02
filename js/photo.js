 // Fonction pour mettre à jour la photo de profil
 function updateProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profileImage = document.getElementById('profile-image');
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
    
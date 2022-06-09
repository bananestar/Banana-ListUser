#Banana-ListUser
by Simon Vander Linden

Créer une liste d'utilisateur qui contiendra le nom, le prénom et le mail de chaque utilisateur.
Nous devons pouvoir:
    1) Créer un utisateur
    2) Modifier les informations d'un utilisateur
    3) Supprimer un utilisateur
    4) Visionner les informations de l'utilisateur

Si aucun utilisateur existe, il faut rediriger vers l'affichage "création d'utilisateur" pour ne pas devoir afficher une liste vide.
Lors de la création, si il existe des utilisateurs, afficher un bouton 'back' qui permettra de revenir vers la liste.

Utilisation de regex sur le mail qui permettra de vérifier si la valeur est bien valide et surtout unique afin que deux utilisateurs n'utilisent pas le meme. qu'il n'est pas déjà utilisé par un autre utilisateur

Les infos de chaque utilisateur doivent être stocké dans le localStorage.


pour la partie back on va utilise laravel 8 : 
composer create-project --prefer-dist laravel/laravel laravel-backend 
il faut installer le package laravel cors : 
composer require fruitcake/laravel-cors
pour l'authentification on utilise laravel breze  : 
php artisan breeze:install api
php artisan migrate
Laravel Sanctum est une solution simple et légère pour l'authentification des API dans Laravel. 
Nous allons l'utiliser pour gérer les tokens API.
composer require laravel/sanctum
